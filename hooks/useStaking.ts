import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface StakingPool {
  id: string;
  pool_id: number;
  token: string;
  rate_apy: number;
  total_staked: number;
  min_stake: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStake {
  id: string;
  user_id: string;
  pool_id: string;
  amount: number;
  rewards_claimed: number;
  last_reward_calculation: string;
  staked_at: string;
  updated_at: string;
  pool?: StakingPool;
}

interface UseStakingReturn {
  pools: StakingPool[];
  userStakes: UserStake[];
  totalStaked: number;
  totalRewards: number;
  loading: boolean;
  error: string | null;
  stake: (poolId: string, amount: number) => Promise<boolean>;
  unstake: (stakeId: string) => Promise<boolean>;
  claimRewards: (stakeId: string) => Promise<boolean>;
  calculateRewards: (stake: UserStake) => number;
  refreshStakes: () => Promise<void>;
}

export const useStaking = (userId?: string): UseStakingReturn => {
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPools = async () => {
    try {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*')
        .eq('is_active', true)
        .order('rate_apy', { ascending: false });

      if (error) throw error;
      setPools(data || []);
    } catch (err: any) {
      console.error('Error fetching pools:', err);
    }
  };

  const fetchUserStakes = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('user_stakes')
        .select(`
          *,
          pool:staking_pools (*)
        `)
        .eq('user_id', userId)
        .order('staked_at', { ascending: false });

      if (error) throw error;

      const stakes = data || [];
      setUserStakes(stakes);

      const total = stakes.reduce((sum, stake) => sum + Number(stake.amount), 0);
      setTotalStaked(total);

      const rewards = stakes.reduce((sum, stake) => sum + calculateRewards(stake), 0);
      setTotalRewards(rewards);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching user stakes:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateRewards = (stake: UserStake): number => {
    if (!stake.pool) return 0;

    const now = new Date();
    const lastCalc = new Date(stake.last_reward_calculation);
    const daysPassed = (now.getTime() - lastCalc.getTime()) / (1000 * 60 * 60 * 24);

    const apy = Number(stake.pool.rate_apy) / 100;
    const dailyRate = apy / 365;
    const rewards = Number(stake.amount) * dailyRate * daysPassed;

    return rewards;
  };

  const stake = async (poolId: string, amount: number): Promise<boolean> => {
    if (!userId) {
      setError('User not connected');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_stakes')
        .insert([
          {
            user_id: userId,
            pool_id: poolId,
            amount: amount,
            last_reward_calculation: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      await supabase.rpc('increment_pool_staked', {
        p_pool_id: poolId,
        p_amount: amount,
      });

      await refreshStakes();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error staking:', err);
      return false;
    }
  };

  const unstake = async (stakeId: string): Promise<boolean> => {
    try {
      const stake = userStakes.find((s) => s.id === stakeId);
      if (!stake) throw new Error('Stake not found');

      const { error } = await supabase
        .from('user_stakes')
        .delete()
        .eq('id', stakeId);

      if (error) throw error;

      await supabase.rpc('decrement_pool_staked', {
        p_pool_id: stake.pool_id,
        p_amount: stake.amount,
      });

      await refreshStakes();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error unstaking:', err);
      return false;
    }
  };

  const claimRewards = async (stakeId: string): Promise<boolean> => {
    try {
      const stake = userStakes.find((s) => s.id === stakeId);
      if (!stake) throw new Error('Stake not found');

      const rewards = calculateRewards(stake);

      const { error } = await supabase
        .from('user_stakes')
        .update({
          rewards_claimed: Number(stake.rewards_claimed) + rewards,
          last_reward_calculation: new Date().toISOString(),
        })
        .eq('id', stakeId);

      if (error) throw error;

      await refreshStakes();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error claiming rewards:', err);
      return false;
    }
  };

  const refreshStakes = async () => {
    await Promise.all([fetchPools(), fetchUserStakes()]);
  };

  useEffect(() => {
    fetchPools();
  }, []);

  useEffect(() => {
    fetchUserStakes();
  }, [userId]);

  return {
    pools,
    userStakes,
    totalStaked,
    totalRewards,
    loading,
    error,
    stake,
    unstake,
    claimRewards,
    calculateRewards,
    refreshStakes,
  };
};
