import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface MarketplaceListing {
  id: string;
  listing_id: string;
  token_id: string;
  seller_address: string;
  amount: string;
  price_per_token: string;
  total_price: string;
  status: 'active' | 'completed' | 'cancelled';
  buyer_address: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TokenListing extends MarketplaceListing {
  token?: {
    symbol: string;
    name: string;
    overall_ethical_score: number;
    category: string | null;
  };
}

interface UseMarketplaceReturn {
  listings: TokenListing[];
  userListings: TokenListing[];
  loading: boolean;
  error: string | null;
  createListing: (
    tokenId: string,
    amount: string,
    pricePerToken: string
  ) => Promise<boolean>;
  buyListing: (listingId: string, buyerAddress: string) => Promise<boolean>;
  cancelListing: (listingId: string) => Promise<boolean>;
  filterListings: (filter: {
    category?: string;
    minScore?: number;
    maxPrice?: number;
  }) => TokenListing[];
  refreshListings: () => Promise<void>;
}

export const useMarketplace = (userAddress?: string): UseMarketplaceReturn => {
  const [listings, setListings] = useState<TokenListing[]>([]);
  const [userListings, setUserListings] = useState<TokenListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('marketplace_listings')
        .select(`
          *,
          token:supported_tokens (
            symbol,
            name,
            overall_ethical_score,
            category
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    if (!userAddress) return;

    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select(`
          *,
          token:supported_tokens (
            symbol,
            name,
            overall_ethical_score,
            category
          )
        `)
        .eq('seller_address', userAddress.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserListings(data || []);
    } catch (err: any) {
      console.error('Error fetching user listings:', err);
    }
  };

  const createListing = async (
    tokenId: string,
    amount: string,
    pricePerToken: string
  ): Promise<boolean> => {
    if (!userAddress) {
      setError('User not connected');
      return false;
    }

    try {
      const totalPrice = (parseFloat(amount) * parseFloat(pricePerToken)).toString();
      const listingId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const { error } = await supabase
        .from('marketplace_listings')
        .insert([
          {
            listing_id: listingId,
            token_id: tokenId,
            seller_address: userAddress.toLowerCase(),
            amount,
            price_per_token: pricePerToken,
            total_price: totalPrice,
            status: 'active',
          },
        ]);

      if (error) throw error;

      await refreshListings();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating listing:', err);
      return false;
    }
  };

  const buyListing = async (listingId: string, buyerAddress: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('marketplace_listings')
        .update({
          status: 'completed',
          buyer_address: buyerAddress.toLowerCase(),
          completed_at: new Date().toISOString(),
        })
        .eq('id', listingId);

      if (error) throw error;

      await refreshListings();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error buying listing:', err);
      return false;
    }
  };

  const cancelListing = async (listingId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('marketplace_listings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', listingId);

      if (error) throw error;

      await refreshListings();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error cancelling listing:', err);
      return false;
    }
  };

  const filterListings = (filter: {
    category?: string;
    minScore?: number;
    maxPrice?: number;
  }): TokenListing[] => {
    return listings.filter((listing) => {
      if (filter.category && listing.token?.category !== filter.category) {
        return false;
      }

      if (
        filter.minScore &&
        listing.token &&
        listing.token.overall_ethical_score < filter.minScore
      ) {
        return false;
      }

      if (filter.maxPrice && parseFloat(listing.total_price) > filter.maxPrice) {
        return false;
      }

      return true;
    });
  };

  const refreshListings = async () => {
    await Promise.all([fetchListings(), fetchUserListings()]);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    fetchUserListings();
  }, [userAddress]);

  return {
    listings,
    userListings,
    loading,
    error,
    createListing,
    buyListing,
    cancelListing,
    filterListings,
    refreshListings,
  };
};
