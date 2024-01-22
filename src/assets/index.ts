import { StaticImageData } from 'next/image';
import { Chain, token } from '@/dtos';
import { sepolia, scroll } from './chainAssets';
import { usdc, usdt, eth, weth } from './coinAssets';

const picture: Record<Chain | token, StaticImageData> = {
  Sepolia: sepolia,
  ScrollSepolia: scroll,
  ETH: eth,
  USDC: usdc,
  USDT: usdt,
  WETH: weth,
};
export default picture;
