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
import { ScrollSepoliaTestnet } from '@thirdweb-dev/chains';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          activeChain={ScrollSepoliaTestnet}
          supportedWallets={[metamaskWallet(), walletConnect()]}
          clientId="dcd20a683635565189cb9b0aca8105de"
        >
          <Container maxWidth="sm">
            <NavBar />
            {children}
          </Container>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
