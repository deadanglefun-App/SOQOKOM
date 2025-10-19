'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, User } from '@/lib/supabase';
import { Web3State, TokenBalance } from '@/lib/web3-types';

type Web3ContextType = {
  web3State: Web3State;
  user: User | null;
  tokenBalances: TokenBalance[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalances: () => Promise<void>;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

type Web3ProviderProps = {
  children: ReactNode;
};

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [web3State, setWeb3State] = useState<Web3State>({
    account: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });
  const [user, setUser] = useState<User | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

  const connectWallet = async () => {
    try {
      setWeb3State(prev => ({ ...prev, isConnecting: true, error: null }));

      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask not installed');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      const account = accounts[0];

      setWeb3State({
        account,
        chainId: parseInt(chainId, 16),
        isConnected: true,
        isConnecting: false,
        error: null,
      });

      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', account.toLowerCase())
        .maybeSingle();

      if (existingUser) {
        setUser(existingUser);
      } else {
        const { data: newUser, error } = await supabase
          .from('users')
          .insert([{ wallet_address: account.toLowerCase() }])
          .select()
          .single();

        if (error) throw error;
        setUser(newUser);
      }

      await refreshBalances();
    } catch (error: any) {
      setWeb3State(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message,
      }));
    }
  };

  const disconnectWallet = () => {
    setWeb3State({
      account: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
    setUser(null);
    setTokenBalances([]);
  };

  const refreshBalances = async () => {
    if (!web3State.account) return;

    const mockBalances: TokenBalance[] = [
      { symbol: 'SQCM', balance: '1000000000000000000000', balanceFormatted: '1000.00', usdValue: 5000 },
      { symbol: 'USDC', balance: '500000000', balanceFormatted: '500.00', usdValue: 500 },
      { symbol: 'ETH', balance: '2000000000000000000', balanceFormatted: '2.00', usdValue: 6000 },
      { symbol: 'MATIC', balance: '100000000000000000000', balanceFormatted: '100.00', usdValue: 80 },
    ];

    setTokenBalances(mockBalances);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3State,
        user,
        tokenBalances,
        connectWallet,
        disconnectWallet,
        refreshBalances,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
