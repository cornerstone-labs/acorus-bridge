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
import { Gnosis } from '@thirdweb-dev/chains';

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
          supportedWallets={[metamaskWallet(), walletConnect()]}
          clientId="your-client-id"
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
