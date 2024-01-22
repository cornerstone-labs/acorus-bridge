export enum ChainL1 {
  'Sepolia' = '0x78Fef812f489A61aA42824f5d7dD5E907C5a0d80',
}

export enum ChainL2 {
  'ScrollSepolia' = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc',
}

export type ChainL1Index = keyof typeof ChainL1;
export type ChainL2Index = keyof typeof ChainL2;
export type Chain = ChainL1Index | ChainL2Index;

export const tokenObj = {
  Sepolia: [
    { tokenName: 'ETH', tokenAddress: '0xeeeee' },
    { tokenName: 'WETH', tokenAddress: '' },
    { tokenName: 'USDT', tokenAddress: '' },
    { tokenName: 'USDC', tokenAddress: '' },
    { tokenName: 'DAI', tokenAddress: '' },
  ],
  ScrollSepolia: [
    { tokenName: 'ETH', tokenAddress: '0xeeeee' },
    { tokenName: 'WETH', tokenAddress: '' },
    { tokenName: 'USDT', tokenAddress: '' },
    { tokenName: 'USDC', tokenAddress: '' },
    { tokenName: 'DAI', tokenAddress: '' },
  ],
  ScrollSepolia11: [
    { tokenName: 'ETH', tokenAddress: '0xeeeee' },
    { tokenName: 'WETH', tokenAddress: '' },
    { tokenName: 'USDT', tokenAddress: '' },
    { tokenName: 'USDC', tokenAddress: '' },
    { tokenName: 'DAI', tokenAddress: '' },
  ],
} as const;

export type token = string;

export type TokenName = string;
