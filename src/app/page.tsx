'use client';
import { eth } from '@/assets/coin/index';
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
import Image from 'next/image';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import {
  ConnectWallet,
  Web3Button,
  useBalance,
  useConnectionStatus,
  useContract,
  useContractWrite,
  useSigner,
  useSwitchChain,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS, SmartContract } from '@thirdweb-dev/sdk';
import React from 'react';
import L2pool from '../abi/L2Pool.json';
import { BaseContract } from 'ethers';

export default function Home(this: any) {
  const [chainId, setChainId] = useState<string>('10');
  const [token, setToken] = useState('0');
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const switchChain = useSwitchChain();
  const connectionStatus = useConnectionStatus();
  const [value, setValue] = useState('');
  const result = parseFloat(value) > parseFloat(data?.displayValue!);
  const signer = useSigner();
  const address = '0x1AaAB19C81e25242BaC1E6da13934B5b00Dff4Cc';
  const { contract } = useContract(address, L2pool.abi);

  const { mutateAsync } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );

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
    let zeroCount = 0;

    if (event.currentTarget.value[0] === '.') {
      newValue += '0';
    }

    for (let i = 0; i < event.currentTarget.value.length; i++) {
      let char = event.currentTarget.value[i];

      if (char === '.') {
        if (zeroCount > 0) {
          newValue += '0';
          zeroCount = 0;
        }
        if (decimalCount === 0) {
          newValue += char;
          decimalCount++;
        }
      } else if (char === '0') {
        zeroCount++;
      } else if (pattern.test(char)) {
        if (zeroCount > 0) {
          newValue += '0'.repeat(zeroCount);
          zeroCount = 0;
        }
        newValue += char;
      }
    }

    if (zeroCount > 0) {
      newValue += '0'.repeat(zeroCount);
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
            <MenuItem value={534351}>Scroll</MenuItem>
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
            inputMode={'numeric'}
            width={'200px'}
            type="text"
            maxLength={10}
            component={'input'}
            bgcolor={'grey.500'}
            fontSize={30}
            placeholder="0.0"
            pattern={'[0-9]*'}
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
        {connectionStatus === 'connected' ? (
          <Web3Button
            style={{ transform: 'unset' }}
            className="web3Button"
            isDisabled={result}
            contractAddress={address}
            action={() => mutateAsync()}
          >
            Continue
          </Web3Button>
        ) : null}
      </Stack>
    </Box>
  );
}
