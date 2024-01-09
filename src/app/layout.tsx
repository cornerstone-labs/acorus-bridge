'use client';
import NavBar from '@/components/bar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Container } from '@mui/material';
import {
  ThirdwebProvider,
  metamaskWallet,
  useSupportedChains,
  walletConnect,
} from '@thirdweb-dev/react';
import { ScrollSepoliaTestnet, Sepolia } from '@thirdweb-dev/chains';
import { useState } from 'react';
import { ChainContext } from './context';
import { chainIndex } from '@/dtos';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeChain, setActiveChain] = useState<chainIndex>('Sepolia');
  const assignChain = { Sepolia, ScrollSepoliaTestnet };
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChainContext.Provider value={{ activeChain, setActiveChain }}>
          <ThirdwebProvider
            activeChain={assignChain[activeChain as keyof typeof assignChain]}
            supportedWallets={[metamaskWallet(), walletConnect()]}
            clientId="dcd20a683635565189cb9b0aca8105de"
          >
            <Container maxWidth="sm">
              <NavBar />
              {children}
            </Container>
          </ThirdwebProvider>
        </ChainContext.Provider>
      </body>
    </html>
  );
}
