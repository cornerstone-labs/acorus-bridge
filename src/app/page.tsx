'use client';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import { eth } from '@/assets/coin/index';
import { useRef, useState } from 'react';
import {
  ConnectWallet,
  Web3Button,
  useBalance,
  useConnectionStatus,
  useSetConnectionStatus,
  useSwitchChain,
  useWalletConfig,
  useWalletConnect,
} from '@thirdweb-dev/react';

import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import SendIcon from '@mui/icons-material/Send';
import { ChainId } from '@thirdweb-dev/sdk';
import React from 'react';
import { useConnect, metamaskWallet } from '@thirdweb-dev/react';

//only be allowed in server component
const metadata: Metadata = {
  title: 'acorus bridge',
};
export default function Home(this: any) {
  const [chainId, setChainId] = useState<string>('10');
  const [token, setToken] = useState('0');
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const switchChain = useSwitchChain();
  const connectionStatus = useConnectionStatus();
  const [value, setValue] = useState('');
  const result = value.localeCompare(data?.displayValue!);

  const handleChange = (type: string, event: SelectChangeEvent) => {
    if (type === 'chain') {
      setChainId(event.target.value);
      return;
    }
    if (type === 'token') {
      setToken(event.target.value);
    }
  };
  function validate(event: React.FormEvent<HTMLInputElement>) {
    let pattern = /^[0-9.]+$/;
    let newValue = '';
    let decimalCount = 0;

    if (event.currentTarget.value[0] === '.') {
      newValue += '0';
    }

    for (let i = 0; i < event.currentTarget.value.length; i++) {
      let char = event.currentTarget.value[i];

      if (char === '.') {
        if (decimalCount === 0) {
          newValue += char;
          decimalCount++;
        }
      } else if (pattern.test(char)) {
        newValue += char;
      }
    }
    event.currentTarget.value = newValue;
    setValue(newValue);
  }
  return (
    <Box mt={8}>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        height={43.73}
      >
        <Typography variant="h1" fontSize={32} color={'#cbcbcb'}>
          Bridge
        </Typography>
        <ConnectWallet theme={'dark'} modalTitleIconUrl={''} />
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
            <MenuItem value={10}>Optimism</MenuItem>
            <MenuItem value={42161}>Arbitrum</MenuItem>
          </Select>
        </FormControl>
        <Button
          color="info"
          endIcon={<SendIcon />}
          onClick={() => {
            switchChain(parseInt(chainId));
          }}
        >
          Confirm
        </Button>
      </Stack>
      <Box
        borderRadius={6}
        pt={2}
        pb={3}
        px={3}
        sx={{
          bgcolor: 'grey.500',
        }}
      >
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            width={'200px'}
            type="text"
            maxLength={10}
            component={'input'}
            bgcolor={'grey.500'}
            fontSize={30}
            placeholder="0.0"
            onInput={(e) => validate(e)}
          />
          <Stack
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
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
        <Stack pt={1} flexDirection={'row'} color={'#3d424d'}>
          <Typography fontSize={14}>Balance:</Typography>
          <Typography fontSize={14}>
            {!isLoading ? (
              parseFloat(data?.displayValue!).toFixed(8)
            ) : (
              <Skeleton
                animation="wave"
                width={40.792}
                sx={{ bgcolor: 'grey.400' }}
              />
            )}
          </Typography>
        </Stack>
      </Box>
      <Stack alignItems={'center'}>
        {connectionStatus === 'connected' && result === -1 ? (
          <Button
            variant="contained"
            sx={{
              mt: 8,
              height: 50,
              borderRadius: 4,
              width: '60%',
              bgcolor: 'rgb(38,43,51)',
              color: 'rgb(203,203,203)',
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            disabled
            onClick={() => {}}
            variant="contained"
            sx={{
              mt: 8,
              height: 50,
              borderRadius: 4,
              width: '60%',
              bgcolor: 'red',
              color: 'rgb(203,203,203)',
            }}
          >
            {connectionStatus !== 'connected'
              ? 'Connect Wallet'
              : 'have not enough balance'}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
