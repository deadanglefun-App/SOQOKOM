export const CHAIN_CONFIG = {
  POLYGON_MAINNET: {
    chainId: 137,
    chainIdHex: '0x89',
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  POLYGON_MUMBAI: {
    chainId: 80001,
    chainIdHex: '0x13881',
    name: 'Polygon Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
};

export const CONTRACT_ADDRESSES = {
  137: {
    SQCM: process.env.NEXT_PUBLIC_SQCM_ADDRESS || '',
    STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS || '',
    MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '',
    GOVERNANCE: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || '',
    DHSL: process.env.NEXT_PUBLIC_DHSL_ADDRESS || '',
    ORACLE: process.env.NEXT_PUBLIC_ORACLE_ADDRESS || '',
  },
  80001: {
    SQCM: process.env.NEXT_PUBLIC_SQCM_ADDRESS_MUMBAI || '',
    STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS_MUMBAI || '',
    MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS_MUMBAI || '',
    GOVERNANCE: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS_MUMBAI || '',
    DHSL: process.env.NEXT_PUBLIC_DHSL_ADDRESS_MUMBAI || '',
    ORACLE: process.env.NEXT_PUBLIC_ORACLE_ADDRESS_MUMBAI || '',
  },
};

export const DEFAULT_CHAIN_ID = 137;

export function getContractAddress(
  contractName: keyof typeof CONTRACT_ADDRESSES[137],
  chainId: number = DEFAULT_CHAIN_ID
): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  const address = addresses[contractName];
  if (!address) {
    throw new Error(`Contract ${contractName} not deployed on chain ${chainId}`);
  }
  return address;
}

export function getChainConfig(chainId: number) {
  if (chainId === 137) return CHAIN_CONFIG.POLYGON_MAINNET;
  if (chainId === 80001) return CHAIN_CONFIG.POLYGON_MUMBAI;
  throw new Error(`Unsupported chain ID: ${chainId}`);
}
