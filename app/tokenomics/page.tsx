'use client';

import { PieChart, TrendingUp, Lock, Users, Zap } from 'lucide-react';

export default function Tokenomics() {
  const distribution = [
    { category: 'Public Sale', percentage: 30, amount: '300M SQKM', color: 'from-purple-500 to-purple-600' },
    { category: 'Staking Rewards', percentage: 25, amount: '250M SQKM', color: 'from-blue-500 to-blue-600' },
    { category: 'Team & Advisors', percentage: 15, amount: '150M SQKM', color: 'from-green-500 to-green-600' },
    { category: 'Liquidity Pool', percentage: 15, amount: '150M SQKM', color: 'from-yellow-500 to-yellow-600' },
    { category: 'Treasury', percentage: 10, amount: '100M SQKM', color: 'from-red-500 to-red-600' },
    { category: 'Marketing', percentage: 5, amount: '50M SQKM', color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <PieChart className="h-20 w-20 mx-auto mb-6 text-purple-400" />
            <h1 className="text-5xl font-bold mb-4 silver-gradient">Tokenomics</h1>
            <p className="text-gray-400 text-lg">SQKM Token Distribution & Economics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="tech-card p-6 rounded-xl text-center">
              <Zap className="h-10 w-10 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-purple-300 mb-2">1B</div>
              <div className="text-sm text-gray-400">Total Supply</div>
            </div>
            <div className="tech-card p-6 rounded-xl text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-purple-300 mb-2">$5.00</div>
              <div className="text-sm text-gray-400">Initial Price</div>
            </div>
            <div className="tech-card p-6 rounded-xl text-center">
              <Lock className="h-10 w-10 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-purple-300 mb-2">2 Years</div>
              <div className="text-sm text-gray-400">Team Lock Period</div>
            </div>
          </div>

          <div className="tech-card p-8 rounded-2xl mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center silver-gradient">Token Distribution</h2>
            <div className="space-y-6">
              {distribution.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      <span className="font-semibold text-gray-100">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-purple-300">{item.percentage}%</span>
                      <span className="text-sm text-gray-400 ml-2">({item.amount})</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="tech-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Token Utility</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Governance</div>
                    <p className="text-sm text-gray-400">Vote on platform proposals and decisions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Staking Rewards</div>
                    <p className="text-sm text-gray-400">Earn passive income through staking</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Trading Fees</div>
                    <p className="text-sm text-gray-400">Reduced fees when paying with SQKM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Access Rights</div>
                    <p className="text-sm text-gray-400">Exclusive features for token holders</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="tech-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Vesting Schedule</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Public Sale</div>
                    <p className="text-sm text-gray-400">30% at TGE, rest over 6 months</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Team & Advisors</div>
                    <p className="text-sm text-gray-400">2 year lock, then 2 year vesting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Staking Rewards</div>
                    <p className="text-sm text-gray-400">Released over 5 years</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-100 mb-1">Treasury</div>
                    <p className="text-sm text-gray-400">DAO controlled release</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="tech-card p-12 rounded-2xl text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-2xl font-bold mb-4 silver-gradient">Deflationary Mechanism</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              SQKM implements a token burn mechanism where 10% of all trading fees are permanently removed
              from circulation, creating scarcity and potential value appreciation over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
