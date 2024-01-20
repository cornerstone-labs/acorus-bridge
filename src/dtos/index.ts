export enum chainL1 {
  'Sepolia' = '0x78Fef812f489A61aA42824f5d7dD5E907C5a0d80',
}

export enum chainL2 {
  'ScrollSepolia' = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc',
  'ScrollSepolia11' = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc111',
}

export type chainL1Index = keyof typeof chainL1;
export type chainL2Index = keyof typeof chainL2;
export type chain = chainL1Index | chainL2Index;
