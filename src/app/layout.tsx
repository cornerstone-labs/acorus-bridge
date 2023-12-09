'use client';
import NavBar from '@/components/bar';
import './globals.scss';
import { Inter } from 'next/font/google';
import { Container } from '@mui/material';
import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

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
          supportedWallets={[
            metamaskWallet(),
            walletConnect({
              projectId: 'YOUR_PROJECT_ID',
            }),
          ]}
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
