import { StaticImageData } from 'next/image';
import Sepolia from './sepolia.png';
import { Chain } from '@/dtos';

const chainPicture: Record<Chain, StaticImageData> = {
  Sepolia,
  ScrollSepolia: Sepolia,
  ScrollSepolia11: Sepolia,
};
export default chainPicture;
