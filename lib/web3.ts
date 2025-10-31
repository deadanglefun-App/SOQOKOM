import { ethers } from 'ethers';
import { getChainConfig, DEFAULT_CHAIN_ID } from './contracts/config';

export async function getWeb3Provider(): Promise<ethers.providers.Web3Provider | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }
  return new ethers.providers.Web3Provider(window.ethereum);
}

export async function getSigner(): Promise<ethers.Signer | null> {
  const provider = await getWeb3Provider();
  if (!provider) return null;
  return provider.getSigner();
}

export async function requestAccounts(): Promise<string[]> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts;
}

export async function getChainId(): Promise<number> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return DEFAULT_CHAIN_ID;
  }
  const provider = await getWeb3Provider();
  if (!provider) return DEFAULT_CHAIN_ID;
  const network = await provider.getNetwork();
  return network.chainId;
}

export async function switchToPolygon(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return false;
  }

  const chainConfig = getChainConfig(DEFAULT_CHAIN_ID);

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainConfig.chainIdHex }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainConfig.chainIdHex,
              chainName: chainConfig.name,
              rpcUrls: [chainConfig.rpcUrl],
              nativeCurrency: chainConfig.nativeCurrency,
              blockExplorerUrls: [chainConfig.blockExplorer],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding chain:', addError);
        return false;
      }
    }
    console.error('Error switching chain:', switchError);
    return false;
  }
}

export function formatEther(value: ethers.BigNumberish): string {
  return ethers.utils.formatEther(value);
}

export function parseEther(value: string): ethers.BigNumber {
  return ethers.utils.parseEther(value);
}

export function formatUnits(value: ethers.BigNumberish, decimals: number): string {
  return ethers.utils.formatUnits(value, decimals);
}

export function parseUnits(value: string, decimals: number): ethers.BigNumber {
  return ethers.utils.parseUnits(value, decimals);
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function isAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}
