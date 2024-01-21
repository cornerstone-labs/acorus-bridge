export enum ChainL1 {
  'Sepolia' = '0x78Fef812f489A61aA42824f5d7dD5E907C5a0d80',
}

export enum ChainL2 {
  'ScrollSepolia' = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc',
  'ScrollSepolia11' = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc111',
}

export type ChainL1Index = keyof typeof ChainL1;
export type ChainL2Index = keyof typeof ChainL2;
export type Chain = ChainL1Index | ChainL2Index;

export const tokenObj: Record<
  Chain,
  Array<{ tokenName: string; tokenAddress: string }>
> = {
  Sepolia: [
    { tokenName: 'eth', tokenAddress: '0xeeeee' },
    { tokenName: 'usdt', tokenAddress: '' },
  ],
  ScrollSepolia: [
    { tokenName: 'FTX', tokenAddress: '0xeeeee' },
    { tokenName: 'USDC', tokenAddress: '' },
  ],
  ScrollSepolia11: [
    { tokenName: '1qq', tokenAddress: '0xeeeee' },
    { tokenName: 'cc', tokenAddress: '' },
  ],
};

export type token = string;

export type TokenName = string;
