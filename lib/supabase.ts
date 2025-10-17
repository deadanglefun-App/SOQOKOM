import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  wallet_address: string;
  email?: string;
  total_sqkm_staked: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  tx_hash?: string;
  token: string;
  amount: number;
  type: 'buy' | 'sell' | 'stake' | 'unstake' | 'reward' | 'exchange';
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
};

export type StakingPool = {
  id: string;
  pool_id: number;
  token: string;
  rate_apy: number;
  total_staked: number;
  min_stake: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserStake = {
  id: string;
  user_id: string;
  pool_id: string;
  amount: number;
  rewards_claimed: number;
  last_reward_calculation: string;
  staked_at: string;
  updated_at: string;
};

export type DaoProposal = {
  id: string;
  proposal_id: number;
  title: string;
  description: string;
  created_by: string;
  votes_yes: number;
  votes_no: number;
  status: 'active' | 'passed' | 'rejected' | 'closed';
  voting_ends_at: string;
  created_at: string;
};

export type DaoVote = {
  id: string;
  proposal_id: string;
  user_id: string;
  vote: 'yes' | 'no';
  amount: number;
  created_at: string;
};

export type SupportedToken = {
  id: string;
  symbol: string;
  name: string;
  contract_address?: string;
  decimals: number;
  is_active: boolean;
  icon_url?: string;
  created_at: string;
};
