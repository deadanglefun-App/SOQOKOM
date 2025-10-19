'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, Vote, Shield, Zap, Lock } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Ethical & Transparent',
      description: 'Interest-free Web3 platform built on Polygon',
    },
    {
      icon: TrendingUp,
      title: 'Staking Rewards',
      description: 'Earn up to 15% APY on staked tokens',
    },
    {
      icon: Vote,
      title: 'DAO Governance',
      description: 'Vote on proposals and shape the platform',
    },
    {
      icon: Wallet,
      title: 'Multi-Token Support',
      description: 'Support for SQCM, USDC, ETH, MATIC, and more',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-30"></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-purple-400 animate-pulse" />
            <Lock className="h-6 w-6 text-silver-400" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 silver-gradient neon-glow">
            SOQOCOM
          </h1>

          <div className="h-1 w-32 mx-auto mb-6 purple-gradient rounded-full"></div>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            The first <span className="text-purple-400 font-semibold">ethical Web3 platform</span> on Polygon.
            <br />
            Transparent, interest-free finance with <span className="text-silver-400">decentralized governance</span>.
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="cyber-button gap-3 text-lg px-10 py-7 font-semibold"
            >
              <Wallet className="h-6 w-6" />
              Enter Platform
              <Zap className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="tech-card p-6 rounded-xl group">
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <feature.icon className="h-12 w-12 text-purple-400 relative z-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="tech-card rounded-2xl p-10 md:p-14">
          <h2 className="text-4xl font-bold mb-10 text-center silver-gradient">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 relative z-10">
                  $2.5M+
                </div>
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Value Locked</div>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-silver-400 to-silver-200 relative z-10">
                  1,250+
                </div>
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Active Users</div>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 relative z-10">
                  12.5%
                </div>
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Average APY</div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <span>Secured by Polygon Network</span>
            <div className="h-1 w-1 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
