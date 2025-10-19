export const CHAINS = {
  POLYGON_MAINNET: {
    chainId: 137,
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
    name: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
} as const;

export const CONTRACT_ADDRESSES = {
  SQCM: process.env.NEXT_PUBLIC_SQCM_ADDRESS || '',
  DHSL: process.env.NEXT_PUBLIC_DHSL_ADDRESS || '',
  STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS || '',
  GOVERNANCE: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || '',
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '',
  ORACLE: process.env.NEXT_PUBLIC_ORACLE_ADDRESS || '',
} as const;

export const TOKEN_CATEGORIES = {
  GREEN_ENERGY: 'Green Energy',
  SOCIAL_IMPACT: 'Social Impact',
  FAIR_TRADE: 'Fair Trade',
  ETHICAL_FINANCE: 'Ethical Finance',
  GOVERNANCE: 'Governance',
  UTILITY: 'Utility',
} as const;

export const TRANSACTION_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  REWARD: 'reward',
  EXCHANGE: 'exchange',
} as const;

export const STAKING_POOLS = {
  FLEXIBLE: {
    name: 'Flexible',
    duration: 0,
    apy: 8,
    minStake: 0,
  },
  BRONZE: {
    name: 'Bronze',
    duration: 90,
    apy: 10,
    minStake: 100,
  },
  SILVER: {
    name: 'Silver',
    duration: 180,
    apy: 12,
    minStake: 500,
  },
  GOLD: {
    name: 'Gold',
    duration: 365,
    apy: 15,
    minStake: 1000,
  },
} as const;

export const ETHICAL_SCORE_WEIGHTS = {
  ENVIRONMENT: 0.25,
  SOCIAL: 0.2,
  GOVERNANCE: 0.25,
  TRANSPARENCY: 0.15,
  COMPLIANCE: 0.15,
} as const;

export const DAO_CONFIG = {
  VOTING_PERIOD_DAYS: 7,
  MIN_VOTES_FOR_QUORUM: 100,
  PASS_THRESHOLD_PERCENTAGE: 50,
  MIN_SQCM_TO_PROPOSE: 1000,
} as const;

export const MARKETPLACE_CONFIG = {
  FEE_PERCENTAGE: 2.5,
  FEE_PERCENTAGE_WITH_SQCM: 1.75,
  MIN_ETHICAL_SCORE: 70,
  SQCM_DISCOUNT_REQUIREMENT: 100,
} as const;

export const SUPPORTED_TOKENS = [
  { symbol: 'SQCM', name: 'SOQOCOM Token', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', decimals: 6 },
  { symbol: 'USDT', name: 'Tether', decimals: 6 },
  { symbol: 'ETH', name: 'Ethereum', decimals: 18 },
  { symbol: 'MATIC', name: 'Polygon', decimals: 18 },
  { symbol: 'LINK', name: 'Chainlink', decimals: 18 },
  { symbol: 'UNI', name: 'Uniswap', decimals: 18 },
  { symbol: 'SAND', name: 'The Sandbox', decimals: 18 },
  { symbol: 'MANA', name: 'Decentraland', decimals: 18 },
] as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MARKETPLACE: '/marketplace',
  STAKING: '/staking',
  DAO: '/dao',
  TOKENOMICS: '/tokenomics',
  ROADMAP: '/roadmap',
  WHITEPAPER: '/whitepaper',
  DOCUMENTATION: '/documentation',
} as const;

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/SOQOCOM_Official',
  DISCORD: 'https://discord.gg/soqocom',
  GITHUB: 'https://github.com/soqocom',
  TELEGRAM: 'https://t.me/soqocom',
  MEDIUM: 'https://medium.com/@soqocom',
} as const;

export const IMPACT_ALLOCATION = {
  STAKING_REWARDS_TO_CHARITY: 0.2,
  MARKETPLACE_FEES_TO_CHARITY: 0.1,
} as const;
