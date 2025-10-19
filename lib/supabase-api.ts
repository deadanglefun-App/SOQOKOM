import { supabase } from './supabase';

export interface User {
  id: string;
  wallet_address: string;
  email: string | null;
  total_sqkm_staked: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  tx_hash: string | null;
  token: string;
  amount: number;
  type: 'buy' | 'sell' | 'stake' | 'unstake' | 'reward' | 'exchange';
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export const supabaseApi = {
  users: {
    async getByWallet(walletAddress: string) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    async create(walletAddress: string, email?: string) {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            wallet_address: walletAddress.toLowerCase(),
            email: email || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async update(userId: string, updates: Partial<User>) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  transactions: {
    async create(transaction: {
      user_id: string;
      token: string;
      amount: number;
      type: Transaction['type'];
      tx_hash?: string;
      status?: Transaction['status'];
    }) {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async getByUser(userId: string, limit = 50) {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },

    async updateStatus(transactionId: string, status: Transaction['status']) {
      const { data, error } = await supabase
        .from('transactions')
        .update({ status })
        .eq('id', transactionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  stakingPools: {
    async getAll() {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*')
        .eq('is_active', true)
        .order('rate_apy', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getById(poolId: string) {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*')
        .eq('id', poolId)
        .single();

      if (error) throw error;
      return data;
    },

    async updateTotalStaked(poolId: string, amount: number) {
      const { data: pool } = await supabase
        .from('staking_pools')
        .select('total_staked')
        .eq('id', poolId)
        .single();

      if (!pool) throw new Error('Pool not found');

      const { data, error } = await supabase
        .from('staking_pools')
        .update({
          total_staked: Number(pool.total_staked) + amount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', poolId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  userStakes: {
    async create(stake: {
      user_id: string;
      pool_id: string;
      amount: number;
    }) {
      const { data, error } = await supabase
        .from('user_stakes')
        .insert([
          {
            ...stake,
            last_reward_calculation: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('user_stakes')
        .select(`
          *,
          pool:staking_pools (*)
        `)
        .eq('user_id', userId)
        .order('staked_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    async claimRewards(stakeId: string, rewardAmount: number) {
      const { data: stake } = await supabase
        .from('user_stakes')
        .select('rewards_claimed')
        .eq('id', stakeId)
        .single();

      if (!stake) throw new Error('Stake not found');

      const { data, error } = await supabase
        .from('user_stakes')
        .update({
          rewards_claimed: Number(stake.rewards_claimed) + rewardAmount,
          last_reward_calculation: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', stakeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async delete(stakeId: string) {
      const { error } = await supabase
        .from('user_stakes')
        .delete()
        .eq('id', stakeId);

      if (error) throw error;
      return true;
    },
  },

  daoProposals: {
    async getAll() {
      const { data, error } = await supabase
        .from('dao_proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getById(proposalId: string) {
      const { data, error } = await supabase
        .from('dao_proposals')
        .select('*')
        .eq('id', proposalId)
        .single();

      if (error) throw error;
      return data;
    },

    async create(proposal: {
      title: string;
      description: string;
      created_by: string;
      voting_ends_at: string;
    }) {
      const { data: latestProposal } = await supabase
        .from('dao_proposals')
        .select('proposal_id')
        .order('proposal_id', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextProposalId = latestProposal ? latestProposal.proposal_id + 1 : 1;

      const { data, error } = await supabase
        .from('dao_proposals')
        .insert([
          {
            proposal_id: nextProposalId,
            ...proposal,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async updateVotes(proposalId: string, voteType: 'yes' | 'no', amount: number) {
      const field = voteType === 'yes' ? 'votes_yes' : 'votes_no';
      const { data: proposal } = await supabase
        .from('dao_proposals')
        .select('votes_yes, votes_no')
        .eq('id', proposalId)
        .single();

      if (!proposal) throw new Error('Proposal not found');

      const currentValue = field === 'votes_yes' ? proposal.votes_yes : proposal.votes_no;
      const { data, error } = await supabase
        .from('dao_proposals')
        .update({
          [field]: Number(currentValue) + amount,
        })
        .eq('id', proposalId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  daoVotes: {
    async create(vote: {
      proposal_id: string;
      user_id: string;
      vote: 'yes' | 'no';
      amount: number;
    }) {
      const { data, error } = await supabase
        .from('dao_votes')
        .insert([vote])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('dao_votes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getByProposal(proposalId: string) {
      const { data, error } = await supabase
        .from('dao_votes')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  },

  supportedTokens: {
    async getAll() {
      const { data, error } = await supabase
        .from('supported_tokens')
        .select(`
          *,
          ethical_scores (*)
        `)
        .eq('is_active', true)
        .order('overall_ethical_score', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getBySymbol(symbol: string) {
      const { data, error } = await supabase
        .from('supported_tokens')
        .select(`
          *,
          ethical_scores (*)
        `)
        .eq('symbol', symbol.toUpperCase())
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    async getByCategory(category: string) {
      const { data, error } = await supabase
        .from('supported_tokens')
        .select(`
          *,
          ethical_scores (*)
        `)
        .eq('category', category)
        .eq('is_active', true)
        .order('overall_ethical_score', { ascending: false });

      if (error) throw error;
      return data;
    },
  },

  ethicalScores: {
    async getAll() {
      const { data, error } = await supabase
        .from('ethical_scores')
        .select('*')
        .order('overall_score', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getByTokenId(tokenId: string) {
      const { data, error } = await supabase
        .from('ethical_scores')
        .select('*')
        .eq('token_id', tokenId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    async create(score: {
      token_id: string;
      environment_score: number;
      social_score: number;
      governance_score: number;
      transparency_score: number;
      compliance_score: number;
    }) {
      const overall_score = Math.round(
        (score.environment_score * 0.25 +
          score.social_score * 0.2 +
          score.governance_score * 0.25 +
          score.transparency_score * 0.15 +
          score.compliance_score * 0.15)
      );

      const { data, error } = await supabase
        .from('ethical_scores')
        .insert([
          {
            ...score,
            overall_score,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  marketplaceListings: {
    async getActive() {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select(`
          *,
          token:supported_tokens (*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    async getBySeller(sellerAddress: string) {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select(`
          *,
          token:supported_tokens (*)
        `)
        .eq('seller_address', sellerAddress.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    async create(listing: {
      token_id: string;
      seller_address: string;
      amount: string;
      price_per_token: string;
    }) {
      const totalPrice = (parseFloat(listing.amount) * parseFloat(listing.price_per_token)).toString();
      const listingId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('marketplace_listings')
        .insert([
          {
            listing_id: listingId,
            ...listing,
            total_price: totalPrice,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async completePurchase(listingId: string, buyerAddress: string) {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .update({
          status: 'completed',
          buyer_address: buyerAddress.toLowerCase(),
          completed_at: new Date().toISOString(),
        })
        .eq('id', listingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async cancel(listingId: string) {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', listingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
};

export default supabaseApi;
