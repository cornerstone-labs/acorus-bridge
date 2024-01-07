import { Dispatch, SetStateAction, createContext } from 'react';

export const ChainContext = createContext<
  Dispatch<SetStateAction<string | undefined>> | any
>(null);
