'use client';
import NavBar from '@/components/bar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Container } from '@mui/material';
import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { ScrollSepoliaTestnet, Sepolia } from '@thirdweb-dev/chains';
import { useState } from 'react';
import { ChainContext } from './context';
import { chain } from '@/dtos';
const ScrollSepolia = {
  ...ScrollSepoliaTestnet,
  rpc: [
    'https://rpc.ankr.com/scroll_sepolia_testnet/7f3ae11204e03961b67c557c4996244f0a53222b23c31a7baf9ae91c6bd89702',
  ],
};
const inter = Inter({ subsets: ['latin'] });
export const assignChain = { Sepolia, ScrollSepolia };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeChain, setActiveChain] = useState<chain>('Sepolia');

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
