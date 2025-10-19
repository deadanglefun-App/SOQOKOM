'use client';

import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Whitepaper() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-20 w-20 mx-auto mb-6 text-purple-400" />
            <h1 className="text-5xl font-bold mb-4 silver-gradient">Whitepaper</h1>
            <p className="text-gray-400 text-lg">SOQOCOM Technical Documentation</p>
          </div>

          <div className="tech-card p-8 rounded-2xl mb-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">Executive Summary</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              SOQOCOM is the first ethical Web3 platform built on Polygon, designed to provide
              transparent, interest-free financial services including staking, trading, and decentralized governance.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to provide ethical and transparent finance for everyone,
              offering a secure platform with no predatory interest rates and verifiable social impact.
            </p>
          </div>

          <div className="tech-card p-8 rounded-2xl mb-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">Platform Features</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">Ethical Staking</h3>
                <p className="text-gray-400">
                  Earn rewards through transparent, interest-free staking mechanisms with APY ranging from 15% to 30%.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">Decentralized Marketplace</h3>
                <p className="text-gray-400">
                  Trade vetted ethical tokens including SQCM, USDC, ETH, and MATIC.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">DAO Governance</h3>
                <p className="text-gray-400">
                  Participate in platform decisions through decentralized voting with your staked SQCM tokens.
                </p>
              </div>
            </div>
          </div>

          <div className="tech-card p-8 rounded-2xl mb-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">Technology Stack</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <span><strong>Blockchain:</strong> Polygon (Layer 2 scaling solution)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <span><strong>Smart Contracts:</strong> Solidity-based audited contracts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <span><strong>Wallet Integration:</strong> MetaMask and Web3 compatible wallets</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <span><strong>Oracle:</strong> Chainlink for reliable price feeds</span>
              </li>
            </ul>
          </div>

          <div className="tech-card p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 silver-gradient">Full Documentation</h3>
            <p className="text-gray-400 mb-6">
              The complete whitepaper is currently being finalized and will be available soon.
            </p>
            <Button className="cyber-button gap-2" disabled>
              <Download className="h-5 w-5" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
