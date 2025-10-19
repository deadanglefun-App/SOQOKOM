import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface DAOProposal {
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
}

export interface DAOVote {
  id: string;
  proposal_id: string;
  user_id: string;
  vote: 'yes' | 'no';
  amount: number;
  created_at: string;
}

interface UseDAOReturn {
  proposals: DAOProposal[];
  userVotes: DAOVote[];
  loading: boolean;
  error: string | null;
  createProposal: (title: string, description: string, votingDays: number) => Promise<boolean>;
  vote: (proposalId: string, voteType: 'yes' | 'no', amount: number) => Promise<boolean>;
  hasVoted: (proposalId: string) => boolean;
  getProposalStatus: (proposal: DAOProposal) => {
    isActive: boolean;
    isPassed: boolean;
    isRejected: boolean;
    timeRemaining: string;
    totalVotes: number;
    yesPercentage: number;
    noPercentage: number;
  };
  refreshProposals: () => Promise<void>;
}

export const useDAO = (userId?: string): UseDAOReturn => {
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [userVotes, setUserVotes] = useState<DAOVote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('dao_proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('dao_votes')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setUserVotes(data || []);
    } catch (err: any) {
      console.error('Error fetching user votes:', err);
    }
  };

  const createProposal = async (
    title: string,
    description: string,
    votingDays: number
  ): Promise<boolean> => {
    if (!userId) {
      setError('User not connected');
      return false;
    }

    try {
      const votingEndsAt = new Date();
      votingEndsAt.setDate(votingEndsAt.getDate() + votingDays);

      const { data: existingProposals } = await supabase
        .from('dao_proposals')
        .select('proposal_id')
        .order('proposal_id', { ascending: false })
        .limit(1);

      const nextProposalId = existingProposals && existingProposals.length > 0
        ? existingProposals[0].proposal_id + 1
        : 1;

      const { error } = await supabase
        .from('dao_proposals')
        .insert([
          {
            proposal_id: nextProposalId,
            title,
            description,
            created_by: userId,
            voting_ends_at: votingEndsAt.toISOString(),
          },
        ]);

      if (error) throw error;

      await refreshProposals();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating proposal:', err);
      return false;
    }
  };

  const vote = async (
    proposalId: string,
    voteType: 'yes' | 'no',
    amount: number
  ): Promise<boolean> => {
    if (!userId) {
      setError('User not connected');
      return false;
    }

    try {
      const { data: existingVote } = await supabase
        .from('dao_votes')
        .select('*')
        .eq('proposal_id', proposalId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existingVote) {
        setError('Already voted on this proposal');
        return false;
      }

      const { error: voteError } = await supabase
        .from('dao_votes')
        .insert([
          {
            proposal_id: proposalId,
            user_id: userId,
            vote: voteType,
            amount,
          },
        ]);

      if (voteError) throw voteError;

      const field = voteType === 'yes' ? 'votes_yes' : 'votes_no';
      const { data: proposal } = await supabase
        .from('dao_proposals')
        .select('votes_yes, votes_no')
        .eq('id', proposalId)
        .single();

      if (proposal) {
        const currentValue = field === 'votes_yes' ? proposal.votes_yes : proposal.votes_no;
        const { error: updateError } = await supabase
          .from('dao_proposals')
          .update({
            [field]: Number(currentValue) + amount,
          })
          .eq('id', proposalId);

        if (updateError) throw updateError;
      }

      await Promise.all([refreshProposals(), fetchUserVotes()]);
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error('Error voting:', err);
      return false;
    }
  };

  const hasVoted = (proposalId: string): boolean => {
    return userVotes.some((vote) => vote.proposal_id === proposalId);
  };

  const getProposalStatus = (proposal: DAOProposal) => {
    const now = new Date();
    const endsAt = new Date(proposal.voting_ends_at);
    const isActive = proposal.status === 'active' && now < endsAt;

    const totalVotes = Number(proposal.votes_yes) + Number(proposal.votes_no);
    const yesPercentage = totalVotes > 0 ? (Number(proposal.votes_yes) / totalVotes) * 100 : 0;
    const noPercentage = totalVotes > 0 ? (Number(proposal.votes_no) / totalVotes) * 100 : 0;

    const isPassed = proposal.status === 'passed' || (yesPercentage > 50 && !isActive);
    const isRejected = proposal.status === 'rejected' || (noPercentage >= 50 && !isActive);

    const timeRemaining = isActive
      ? formatTimeRemaining(endsAt.getTime() - now.getTime())
      : 'Ended';

    return {
      isActive,
      isPassed,
      isRejected,
      timeRemaining,
      totalVotes,
      yesPercentage,
      noPercentage,
    };
  };

  const formatTimeRemaining = (ms: number): string => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Less than 1 hour';
  };

  const refreshProposals = async () => {
    await Promise.all([fetchProposals(), fetchUserVotes()]);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  useEffect(() => {
    fetchUserVotes();
  }, [userId]);

  return {
    proposals,
    userVotes,
    loading,
    error,
    createProposal,
    vote,
    hasVoted,
    getProposalStatus,
    refreshProposals,
  };
};
