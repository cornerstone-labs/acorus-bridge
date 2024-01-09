import { chainIndex } from '@/dtos';
import { Dispatch, SetStateAction, createContext } from 'react';

export const ChainContext = createContext<{
  setActiveChain: Dispatch<SetStateAction<chainIndex>>;
  activeChain: chainIndex;
} | null>(null);
