export type TokenBalance = {
  symbol: string;
  balance: string;
  balanceFormatted: string;
  usdValue?: number;
};

export type Web3State = {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
};

export type ContractAddresses = {
  SQCM: string;
  Staking: string;
  DAO: string;
  TokenRegistry: string;
};

export const POLYGON_CHAIN_ID = 137;
export const POLYGON_TESTNET_CHAIN_ID = 80001;

export const CONTRACT_ADDRESSES: ContractAddresses = {
  SQCM: '0x0000000000000000000000000000000000000000',
  Staking: '0x0000000000000000000000000000000000000000',
  DAO: '0x0000000000000000000000000000000000000000',
  TokenRegistry: '0x0000000000000000000000000000000000000000',
};
