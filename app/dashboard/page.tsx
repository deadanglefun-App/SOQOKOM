'use client';

import { useWeb3 } from '@/contexts/Web3Context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';

export default function Dashboard() {
  const { web3State, tokenBalances } = useWeb3();

  if (!web3State.isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="tech-card rounded-2xl p-12 text-center">
          <MetaMaskIcon className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 silver-gradient">Connect MetaMask</h1>
          <p className="text-gray-400 mb-6">Please connect your MetaMask wallet to access the dashboard</p>
          <Button onClick={() => window.location.reload()} className="cyber-button gap-2">
            <MetaMaskIcon className="h-5 w-5" />
            Connect MetaMask
          </Button>
        </div>
      </div>
    );
  }

  const totalValue = tokenBalances.reduce((acc, token) => acc + (token.usdValue || 0), 0);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 silver-gradient">Dashboard</h1>
          <p className="text-gray-400">Welcome back to SOQOKOM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Balance</span>
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-300 mb-2">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5%</span>
            </div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Staked</span>
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-300 mb-2">
              $0.00
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Activity className="h-4 w-4" />
              <span>No active stakes</span>
            </div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Rewards</span>
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-300 mb-2">
              $0.00
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <ArrowDownRight className="h-4 w-4" />
              <span>0% claimed</span>
            </div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Voting Power</span>
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-300 mb-2">
              0
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>SQKM tokens</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="tech-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 silver-gradient">Your Tokens</h2>
            <div className="space-y-4">
              {tokenBalances.map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-4 glass-effect rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                      <span className="text-sm font-bold text-silver-200">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-100">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.balanceFormatted}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-purple-300">
                      ${token.usdValue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </div>
                    <div className="text-sm text-green-400">+2.5%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 silver-gradient">Quick Actions</h2>
            <div className="space-y-4">
              <Button className="w-full cyber-button justify-start text-lg py-6">
                <TrendingUp className="h-5 w-5 mr-3" />
                Stake Tokens
              </Button>
              <Button className="w-full cyber-button justify-start text-lg py-6">
                <DollarSign className="h-5 w-5 mr-3" />
                Trade on Marketplace
              </Button>
              <Button className="w-full cyber-button justify-start text-lg py-6">
                <Activity className="h-5 w-5 mr-3" />
                Vote on Proposals
              </Button>
            </div>

            <div className="mt-8 p-4 glass-effect rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-purple-300">Platform Status</span>
              </div>
              <p className="text-sm text-gray-400">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
