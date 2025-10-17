'use client';

import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="border-t border-purple-900/30 glass-effect mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border border-silver-400 p-1">
                <Image src="/SQ LOGO.png" alt="SOQOKOM" width={24} height={24} className="object-contain" />
              </div>
              <span className="font-bold text-xl silver-gradient">SOQOKOM</span>
            </div>
            <p className="text-sm text-gray-400">
              Halal Web3 platform on Polygon
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-purple-300">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/marketplace" className="text-gray-400 hover:text-purple-400 transition-colors">Marketplace</Link></li>
              <li><Link href="/staking" className="text-gray-400 hover:text-purple-400 transition-colors">Staking</Link></li>
              <li><Link href="/dao" className="text-gray-400 hover:text-purple-400 transition-colors">DAO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-purple-300">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/whitepaper" className="text-gray-400 hover:text-purple-400 transition-colors">Whitepaper</Link></li>
              <li><Link href="/documentation" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</Link></li>
              <li><Link href="/tokenomics" className="text-gray-400 hover:text-purple-400 transition-colors">Tokenomics</Link></li>
              <li><Link href="/roadmap" className="text-gray-400 hover:text-purple-400 transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-purple-300">Community</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com/soqokom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/soqokom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://t.me/soqokom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-900/30 text-center text-sm text-gray-500">
          <p>&copy; 2025 SOQOKOM. All rights reserved. Built on Polygon.</p>
        </div>
      </div>
    </footer>
  );
};
