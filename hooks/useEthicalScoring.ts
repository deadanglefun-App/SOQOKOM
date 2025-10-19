import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface EthicalScore {
  id: string;
  token_id: string;
  environment_score: number;
  social_score: number;
  governance_score: number;
  transparency_score: number;
  compliance_score: number;
  overall_score: number;
  validator_count: number;
  last_validated_at: string | null;
  data_sources: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TokenWithScore {
  id: string;
  symbol: string;
  name: string;
  overall_ethical_score: number;
  category: string | null;
  description: string | null;
  ethical_scores?: EthicalScore | EthicalScore[];
}

interface UseEthicalScoringReturn {
  scores: EthicalScore[];
  tokensWithScores: TokenWithScore[];
  loading: boolean;
  error: string | null;
  getScoreByTokenId: (tokenId: string) => Promise<EthicalScore | null>;
  getScoreColor: (score: number) => string;
  getScoreBadge: (score: number) => string;
  getScoreLabel: (score: number) => string;
  refreshScores: () => Promise<void>;
}

export const useEthicalScoring = (): UseEthicalScoringReturn => {
  const [scores, setScores] = useState<EthicalScore[]>([]);
  const [tokensWithScores, setTokensWithScores] = useState<TokenWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: scoresData, error: scoresError } = await supabase
        .from('ethical_scores')
        .select('*')
        .order('overall_score', { ascending: false });

      if (scoresError) throw scoresError;

      const { data: tokensData, error: tokensError } = await supabase
        .from('supported_tokens')
        .select(`
          id,
          symbol,
          name,
          overall_ethical_score,
          category,
          description,
          ethical_scores (*)
        `)
        .eq('is_active', true)
        .order('overall_ethical_score', { ascending: false });

      if (tokensError) throw tokensError;

      setScores(scoresData || []);
      setTokensWithScores(tokensData || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching ethical scores:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreByTokenId = async (tokenId: string): Promise<EthicalScore | null> => {
    try {
      const { data, error } = await supabase
        .from('ethical_scores')
        .select('*')
        .eq('token_id', tokenId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching score:', err);
      return null;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number): string => {
    if (score >= 90) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (score >= 75) return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    if (score >= 40) return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Very Poor';
  };

  const refreshScores = async () => {
    await fetchScores();
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return {
    scores,
    tokensWithScores,
    loading,
    error,
    getScoreByTokenId,
    getScoreColor,
    getScoreBadge,
    getScoreLabel,
    refreshScores,
  };
};
