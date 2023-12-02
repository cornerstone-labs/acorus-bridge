'use client';
import { Box, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const DynamicWallet = dynamic(
  () => import('@thirdweb-dev/react').then((module) => module.ConnectWallet),
  {
    ssr: false,
  }
);
export default function NavBar() {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      pt={2}
      alignItems={'center'}
    >
      <Box></Box>
      <Stack flexDirection={'row'}>
        <Typography color={'#555'}>Bridge</Typography>
      </Stack>

      <DynamicWallet theme={'light'} modalTitleIconUrl={''} />
    </Stack>
  );
}
