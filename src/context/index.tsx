import { chain } from '@/dtos';
import { Dispatch, SetStateAction, createContext } from 'react';



export const ChainContext = createContext<{
  setActiveChain: Dispatch<SetStateAction<chain>>;
  activeChain: chain;
} | null>(null);
