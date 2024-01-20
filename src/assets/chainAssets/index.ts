import { StaticImageData } from 'next/image';
import Sepolia from './sepolia.png';
import { chain } from '@/dtos';

const chainPicture: Record<chain, StaticImageData> = {
  Sepolia,
  ScrollSepolia: Sepolia,
  ScrollSepolia11: Sepolia,
};
export default chainPicture;
