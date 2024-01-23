import { StaticImageData } from 'next/image';
import { Chain, TokenName } from '@/dtos';
import { sepolia, scroll } from './chainAssets';
import { usdc, usdt, eth, weth } from './coinAssets';

const picture: Record<Chain | TokenName, StaticImageData> = {
  Sepolia: sepolia,
  ScrollSepolia: scroll,
  ETH: eth,
  USDC: usdc,
  USDT: usdt,
  WETH: weth,
  DAI: weth,
};
export default picture;
