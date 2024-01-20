import { StaticImageData } from 'next/image';
import Sepolia from './sepolia.png';
import { chain } from '@/dtos';

const L1Pic: Record<chain, StaticImageData> = {
  Sepolia,
  ScrollSepolia: Sepolia,
};
export default L1Pic;
