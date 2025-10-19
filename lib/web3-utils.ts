export const formatAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const formatTokenAmount = (
  amount: string | number,
  decimals: number = 18,
  displayDecimals: number = 4
): string => {
  try {
    const value = Number(amount) / Math.pow(10, decimals);
    return value.toFixed(displayDecimals);
  } catch (error) {
    console.error('Error formatting token amount:', error);
    return '0.0000';
  }
};

export const parseTokenAmount = (amount: string, decimals: number = 18): string => {
  try {
    const value = parseFloat(amount) * Math.pow(10, decimals);
    return Math.floor(value).toString();
  } catch (error) {
    console.error('Error parsing token amount:', error);
    return '0';
  }
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const checksumAddress = (address: string): string => {
  if (!isValidAddress(address)) return address;
  return address.toLowerCase();
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

export const getExplorerUrl = (chainId: number, type: 'address' | 'tx', hash: string): string => {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    137: 'https://polygonscan.com',
    80001: 'https://mumbai.polygonscan.com',
  };

  const baseUrl = explorers[chainId] || explorers[137];
  return `${baseUrl}/${type}/${hash}`;
};

export const getChainName = (chainId: number): string => {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    137: 'Polygon',
    80001: 'Mumbai',
  };
  return chains[chainId] || 'Unknown';
};

export const waitForTransaction = async (
  txHash: string,
  pollInterval: number = 1000
): Promise<boolean> => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      clearInterval(checkInterval);
      resolve(true);
    }, pollInterval);
  });
};

export const estimateGas = async (
  gasLimit: number = 21000
): Promise<number> => {
  return gasLimit;
};

export const calculateAPY = (
  principal: number,
  rate: number,
  time: number
): number => {
  return principal * (Math.pow(1 + rate / 365, 365 * time) - 1);
};

export const calculateRewards = (
  amount: number,
  apyPercent: number,
  daysStaked: number
): number => {
  const dailyRate = apyPercent / 100 / 365;
  return amount * dailyRate * daysStaked;
};

export const formatTimeRemaining = (timestamp: number | string): string => {
  const now = Date.now();
  const end = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
  const diff = end - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const formatDate = (timestamp: number | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

export const validateStakeAmount = (
  amount: number,
  minStake: number,
  balance: number
): { valid: boolean; error?: string } => {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  if (amount < minStake) {
    return { valid: false, error: `Minimum stake is ${minStake}` };
  }
  if (amount > balance) {
    return { valid: false, error: 'Insufficient balance' };
  }
  return { valid: true };
};
