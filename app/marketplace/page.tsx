'use client';

import { useWeb3 } from '@/contexts/Web3Context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, Search, TrendingUp, ArrowUpRight, Wallet } from 'lucide-react';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';

export default function Marketplace() {
  const { web3State } = useWeb3();

  if (!web3State.isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="tech-card rounded-2xl p-12 text-center">
          <MetaMaskIcon className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 silver-gradient">Connect MetaMask</h1>
          <p className="text-gray-400 mb-6">Please connect your MetaMask wallet to access the marketplace</p>
          <Button onClick={() => window.location.reload()} className="cyber-button gap-2">
            <MetaMaskIcon className="h-5 w-5" />
            Connect MetaMask
          </Button>
        </div>
      </div>
    );
  }

  const tokens = [
    { symbol: 'SQKM', name: 'Soqokom Token', price: 5.00, change: 12.5, volume: '1.2M' },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00, change: 0.01, volume: '5.8M' },
    { symbol: 'ETH', name: 'Ethereum', price: 3000.00, change: -2.3, volume: '12.5M' },
    { symbol: 'MATIC', name: 'Polygon', price: 0.80, change: 5.7, volume: '2.1M' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 silver-gradient">Marketplace</h1>
          <p className="text-gray-400">Trade halal-compliant tokens</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search tokens..."
              className="pl-12 h-12 glass-effect border-purple-500/30 text-gray-100 placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token) => (
            <div key={token.symbol} className="tech-card p-6 rounded-xl group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                    <span className="text-sm font-bold text-silver-200">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-100">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                </div>
                <Store className="h-5 w-5 text-purple-400" />
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-purple-300 mb-1">
                  ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`flex items-center gap-1 text-sm ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <ArrowUpRight className={`h-4 w-4 ${token.change < 0 ? 'rotate-90' : ''}`} />
                  <span>{token.change >= 0 ? '+' : ''}{token.change}%</span>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                <span>24h Volume</span>
                <span className="font-semibold text-gray-300">${token.volume}</span>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  Buy
                </Button>
                <Button variant="outline" className="flex-1 border-purple-500/30 hover:bg-purple-900/30 text-gray-300">
                  Sell
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 tech-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold silver-gradient">Market Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Total Market Cap</div>
              <div className="text-2xl font-bold text-purple-300">$8.2M</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">24h Trading Volume</div>
              <div className="text-2xl font-bold text-purple-300">$21.6M</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Active Traders</div>
              <div className="text-2xl font-bold text-purple-300">1,250+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
