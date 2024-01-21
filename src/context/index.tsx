import { Chain } from '@/dtos';
import { Dispatch, SetStateAction, createContext } from 'react';

export const ChainContext = createContext<{
  setActiveChain: Dispatch<SetStateAction<Chain>>;
  activeChain: Chain;
} | null>(null);
