'use client';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import { eth } from '@/assets/coin/index';
import { arrow } from '@/assets/sign';
import { DynamicWallet } from '@/components/bar';
import { useState } from 'react';
//only be allowed in server component
const metadata: Metadata = {
  title: 'acorus bridge',
};
export default function Home(this: any) {
  const [chainId, setChainId] = useState('10');
  const [token, setToken] = useState('0');
  const handleChange = (type: string, event: SelectChangeEvent) => {
    if (type === 'chain') {
      setChainId(event.target.value);
      return;
    }
    if (type === 'token') {
      setToken(event.target.value);
    }
  };

  return (
    <Box mt={8}>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        height={62}
      >
        <Typography variant="h1" fontSize={32} color={'#cbcbcb'}>
          Bridge
        </Typography>
        <DynamicWallet theme={'light'} modalTitleIconUrl={''} />
      </Stack>
      <Button
        sx={{
          marginTop: 2,
          color: '#cbcbcb',
          borderRadius: 20,
          borderWidth: 2,
          borderStyle: 'solid',
          borderInlineColor: '#cbcbcb',
        }}
      >
        Widthdraw
      </Button>
      <Stack flexDirection={'row'} mt={2} alignItems={'center'} gap={0.5}>
        <Typography fontSize={14} color={'#cbcbcb'}>
          From
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            sx={{ color: '#cbcbcb', borderColor: '#cbcbcb' }}
            size="small"
            value={chainId}
            onChange={handleChange.bind(this, 'chain')}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={'10'}>op</MenuItem>
            <MenuItem value={'20'}>zks</MenuItem>
            <MenuItem value={'30'}>stark</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box bgcolor={'grey.300'} borderRadius={10} py={2}>
        <Stack flexDirection={'row'}>
          <Stack
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            pl={3}
          >
            <Image src={eth} alt="ETH" width={24} height={24} />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                sx={{ color: '#cbcbcb', borderColor: '#cbcbcb' }}
                size="small"
                value={token}
                onChange={handleChange.bind(this, 'token')}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'0'}>ETH</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack pl={3} flexDirection={'row'}>
          <Typography>Balance:</Typography>
          <Typography>{2}</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
