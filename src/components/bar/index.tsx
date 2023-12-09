'use client';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
export const DynamicWallet = dynamic(
  () => import('@thirdweb-dev/react').then((module) => module.ConnectWallet),
  {
    ssr: false,
    loading: (props) => {
      console.log(props);
      return (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={180}
          height={'100%'}
          sx={{ bgcolor: 'grey.900' }}
        />
      );
    },
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
        <Typography color={'rgb(227,57,44)'}>Bridge</Typography>
      </Stack>
    </Stack>
  );
}
