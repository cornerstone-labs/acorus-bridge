import { Box, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import { eth } from '@/assets/coin/index';
import { arrow } from '@/assets/sign';
export const metadata: Metadata = {
  title: 'acorus bridge',
};
export default function Home() {
  return (
    <Box>
      <Stack mt={8} flexDirection={'row'} justifyContent={'center'}>
        <Typography fontSize={'48px'} fontWeight={600}>
          Acorus Bridge
        </Typography>
      </Stack>
      <Stack mt={4} flexDirection={'row'} justifyContent={'center'}>
        <Stack
          borderRadius={3}
          sx={{ opacity: 0.8 }}
          flexDirection={'row'}
          justifyContent={'center'}
          py={2}
          px={1.6}
          bgcolor={'#fff'}
          boxShadow={'rgba(0,0,0,0.04)'}
        >
          <Box display={'flex'} alignItems={'center'} pr={2}>
            <Box
              component={'input'}
              color={'rgb(6,8,40)'}
              fontSize={30}
              placeholder="0.0"
            />
            <Box component={'button'} bgcolor={'#fff'}>
              <Typography fontSize={14}>MAX</Typography>
            </Box>
          </Box>

          <Box component={'button'} bgcolor={'#fff'}>
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              <Image src={eth} alt={'ETH'} width={26} height={26} />
              <Typography>ETH</Typography>
              <Image src={arrow} alt={'arrow'} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack mt={4} flexDirection={'row'} justifyContent={'center'}>
        <Stack
          borderRadius={3}
          sx={{ opacity: 0.8 }}
          flexDirection={'row'}
          justifyContent={'center'}
          py={2}
          px={1.6}
          bgcolor={'#fff'}
          boxShadow={'rgba(0,0,0,0.04)'}
        >
          <Box display={'flex'} alignItems={'center'} pr={2}>
            <Box
              component={'input'}
              color={'rgb(6,8,40)'}
              fontSize={30}
              placeholder="0.0"
            />
            <Box component={'button'} bgcolor={'#fff'}>
              <Typography fontSize={14}>MAX</Typography>
            </Box>
          </Box>

          <Box component={'button'} bgcolor={'#fff'}>
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              <Image src={eth} alt={'ETH'} width={26} height={26} />
              <Typography>ETH</Typography>
              <Image src={arrow} alt={'arrow'} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
