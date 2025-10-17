'use client';

import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, TrendingUp, Clock, Award, Wallet } from 'lucide-react';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';

export default function Staking() {
  const { web3State } = useWeb3();

  if (!web3State.isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="tech-card rounded-2xl p-12 text-center">
          <MetaMaskIcon className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 silver-gradient">Connect MetaMask</h1>
          <p className="text-gray-400 mb-6">Please connect your MetaMask wallet to access staking</p>
          <Button onClick={() => window.location.reload()} className="cyber-button gap-2">
            <MetaMaskIcon className="h-5 w-5" />
            Connect MetaMask
          </Button>
        </div>
      </div>
    );
  }

  const stakingPools = [
    { id: 1, token: 'SQKM', apy: 15.5, minStake: 100, totalStaked: '2.5M', lockPeriod: '30 days' },
    { id: 2, token: 'SQKM', apy: 22.0, minStake: 500, totalStaked: '1.8M', lockPeriod: '90 days' },
    { id: 3, token: 'SQKM', apy: 30.0, minStake: 1000, totalStaked: '1.2M', lockPeriod: '180 days' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 silver-gradient">Staking Pools</h1>
          <p className="text-gray-400">Stake your SQKM tokens and earn rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Staked</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">$5.5M</div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Your Stake</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">$0.00</div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Rewards</span>
            </div>
            <div className="text-3xl font-bold text-purple-300">$0.00</div>
          </div>
        </div>

        <div className="space-y-6">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="tech-card p-8 rounded-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                      <span className="text-lg font-bold text-silver-200">{pool.token}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100">{pool.token} Pool</h3>
                      <p className="text-gray-400">{pool.lockPeriod} lock period</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">APY</div>
                      <div className="text-xl font-bold text-green-400">{pool.apy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Min Stake</div>
                      <div className="text-xl font-bold text-gray-100">{pool.minStake} SQKM</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Total Staked</div>
                      <div className="text-xl font-bold text-gray-100">${pool.totalStaked}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Lock Period</div>
                      <div className="text-xl font-bold text-gray-100 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pool.lockPeriod}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Amount to Stake</label>
                      <Input
                        type="number"
                        placeholder={`Min ${pool.minStake} SQKM`}
                        className="glass-effect border-purple-500/30 text-gray-100"
                      />
                    </div>
                    <Button className="w-full cyber-button">
                      <Layers className="h-5 w-5 mr-2" />
                      Stake Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 tech-card p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 silver-gradient">How Staking Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-1">Choose a Pool</div>
                <p className="text-sm text-gray-400">Select a staking pool based on APY and lock period</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-1">Stake Tokens</div>
                <p className="text-sm text-gray-400">Lock your SQKM tokens for the specified period</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-1">Earn Rewards</div>
                <p className="text-sm text-gray-400">Receive rewards automatically based on APY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
