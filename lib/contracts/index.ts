import { ethers } from 'ethers';
import SQCM_ABI from './abis/SQCM.json';
import STAKING_ABI from './abis/SOQOCOMStaking.json';
import MARKETPLACE_ABI from './abis/SOQOCOMMarketplace.json';
import GOVERNANCE_ABI from './abis/SOQOCOMGovernance.json';
import { getContractAddress } from './config';

export { SQCM_ABI, STAKING_ABI, MARKETPLACE_ABI, GOVERNANCE_ABI };

export function getSQCMContract(
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
  chainId?: number
) {
  const address = getContractAddress('SQCM', chainId);
  return new ethers.Contract(address, SQCM_ABI, signerOrProvider);
}

export function getStakingContract(
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
  chainId?: number
) {
  const address = getContractAddress('STAKING', chainId);
  return new ethers.Contract(address, STAKING_ABI, signerOrProvider);
}

export function getMarketplaceContract(
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
  chainId?: number
) {
  const address = getContractAddress('MARKETPLACE', chainId);
  return new ethers.Contract(address, MARKETPLACE_ABI, signerOrProvider);
}

export function getGovernanceContract(
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
  chainId?: number
) {
  const address = getContractAddress('GOVERNANCE', chainId);
  return new ethers.Contract(address, GOVERNANCE_ABI, signerOrProvider);
}

export function getERC20Contract(
  tokenAddress: string,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) {
  const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  ];
  return new ethers.Contract(tokenAddress, ERC20_ABI, signerOrProvider);
}
