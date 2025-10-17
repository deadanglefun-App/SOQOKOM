'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, Home, Store, Layers, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Navbar = () => {
  const pathname = usePathname();
  const { web3State, connectWallet, disconnectWallet, tokenBalances } = useWeb3();

  const sqkmBalance = tokenBalances.find(t => t.symbol === 'SQKM')?.balanceFormatted || '0.00';

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/marketplace', label: 'Marketplace', icon: Store },
    { href: '/staking', label: 'Staking', icon: Layers },
    { href: '/dao', label: 'DAO', icon: Vote },
  ];

  return (
    <nav className="border-b border-purple-900/30 glass-effect sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-silver-400 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all p-1">
                <Image src="/SQ LOGO.png" alt="SOQOKOM" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-bold text-xl silver-gradient">SOQOKOM</span>
            </Link>

            {web3State.isConnected && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={pathname === link.href ? 'default' : 'ghost'}
                      className={cn(
                        'gap-2 transition-all',
                        pathname === link.href
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/50'
                          : 'text-gray-300 hover:text-white hover:bg-purple-900/30'
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {web3State.isConnected ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border border-purple-500/30">
                  <span className="text-sm font-medium text-purple-300">
                    {sqkmBalance} SQKM
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={disconnectWallet}
                  className="gap-2 border-purple-500/30 hover:bg-purple-900/30 text-gray-300"
                >
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {web3State.account?.slice(0, 6)}...{web3State.account?.slice(-4)}
                  </span>
                  <span className="sm:hidden">Disconnect</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={web3State.isConnecting}
                className="cyber-button gap-2"
              >
                <Wallet className="h-4 w-4" />
                {web3State.isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
