'use client';

import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { Vote, CheckCircle2, XCircle, Clock, Users, Wallet } from 'lucide-react';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';

export default function DAO() {
  const { web3State } = useWeb3();

  if (!web3State.isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="tech-card rounded-2xl p-12 text-center">
          <MetaMaskIcon className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 silver-gradient">Connect MetaMask</h1>
          <p className="text-gray-400 mb-6">Please connect your MetaMask wallet to access DAO governance</p>
          <Button onClick={() => window.location.reload()} className="cyber-button gap-2">
            <MetaMaskIcon className="h-5 w-5" />
            Connect MetaMask
          </Button>
        </div>
      </div>
    );
  }

  const proposals = [
    {
      id: 1,
      title: 'Increase SQCM Staking Rewards by 5%',
      description: 'Proposal to increase staking rewards to attract more long-term holders and increase platform TVL.',
      status: 'active',
      votesYes: 15420,
      votesNo: 3210,
      endsIn: '5 days',
      voters: 142,
    },
    {
      id: 2,
      title: 'Add New Token Pair: SQCM/BTC',
      description: 'Enable trading between SQCM and Bitcoin to expand market opportunities.',
      status: 'active',
      votesYes: 8750,
      votesNo: 1250,
      endsIn: '12 days',
      voters: 98,
    },
    {
      id: 3,
      title: 'Reduce Platform Trading Fees',
      description: 'Lower trading fees from 0.3% to 0.25% to remain competitive.',
      status: 'passed',
      votesYes: 25100,
      votesNo: 2400,
      endsIn: 'Closed',
      voters: 275,
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'text-green-400';
    if (status === 'passed') return 'text-blue-400';
    return 'text-gray-400';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'passed') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 silver-gradient">DAO Governance</h1>
          <p className="text-gray-400">Vote on proposals and shape the future of SOQOCOM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Vote className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Your Voting Power</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">0 SQCM</div>
            <p className="text-xs text-gray-500 mt-2">Based on staked tokens</p>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Voters</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">1,250+</div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Active Proposals</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">2</div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold silver-gradient">Active Proposals</h2>
          <Button className="cyber-button">
            <Vote className="h-4 w-4 mr-2" />
            Create Proposal
          </Button>
        </div>

        <div className="space-y-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="tech-card p-8 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-100">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(proposal.status)}`}>
                      {proposal.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{proposal.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span className="text-sm text-gray-400">Yes</span>
                    </div>
                    <span className="font-semibold text-green-400">{proposal.votesYes.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${(proposal.votesYes / (proposal.votesYes + proposal.votesNo)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-400" />
                      <span className="text-sm text-gray-400">No</span>
                    </div>
                    <span className="font-semibold text-red-400">{proposal.votesNo.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      style={{ width: `${(proposal.votesNo / (proposal.votesYes + proposal.votesNo)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{proposal.voters} voters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{proposal.endsIn}</span>
                  </div>
                </div>

                {proposal.status === 'active' && (
                  <div className="flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Vote Yes
                    </Button>
                    <Button variant="outline" className="border-red-500/30 hover:bg-red-900/30 text-red-400">
                      <XCircle className="h-4 w-4 mr-2" />
                      Vote No
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 tech-card p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 silver-gradient">About DAO Governance</h3>
          <p className="text-gray-400 mb-4">
            SOQOCOM DAO enables token holders to participate in platform governance. Your voting power is determined by the amount of SQCM tokens you have staked.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="glass-effect p-4 rounded-lg">
              <div className="font-semibold text-purple-300 mb-1">Minimum to Vote</div>
              <div className="text-gray-400">100 SQCM staked</div>
            </div>
            <div className="glass-effect p-4 rounded-lg">
              <div className="font-semibold text-purple-300 mb-1">Minimum to Propose</div>
              <div className="text-gray-400">1,000 SQCM staked</div>
            </div>
            <div className="glass-effect p-4 rounded-lg">
              <div className="font-semibold text-purple-300 mb-1">Voting Period</div>
              <div className="text-gray-400">7-14 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
