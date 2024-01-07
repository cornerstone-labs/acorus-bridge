'use client';
import { eth } from '@/assets/coin/index';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Key, useContext, useEffect, useState } from 'react';
import { ChainId, useSupportedChains } from '@thirdweb-dev/react';
import {
  ConnectWallet,
  Web3Button,
  useBalance,
  useConnectionStatus,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import React from 'react';
import L2pool from '../abi/L2Pool.json';
import { ChainContext } from './context';

export default function Home(this: any) {
  const [token, setToken] = useState('0');
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const connectionStatus = useConnectionStatus();
  const [value, setValue] = useState('');
  const result = parseFloat(value) > parseFloat(data?.displayValue!);
  const { activeChain, setActiveChain } = useContext(ChainContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [address, setAddress] = useState<string>(
    '0x78376F00F9d61Cd99D62e1B8db34Ffe22e23937d'
  );
  const { contract } = useContract(address, L2pool.abi);

  const { mutateAsync } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );
  const chains = useSupportedChains();
  console.log(chains);

  const handleChange = (type: string, event: SelectChangeEvent) => {
    if (type === 'chain') {
      setActiveChain(event.target.value);
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

        <Button color="secondary" onClick={() => setDrawerOpen(true)}>
          {ChainId[activeChain]}
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
            onSuccess={() => {
              console.log('success');
            }}
            style={{ transform: 'unset' }}
            className="web3Button"
            isDisabled={result}
            contractAddress={address}
            action={() => {
              // switchChain(parseInt(chainId));
              // mutateAsync();
            }}
          >
            Continue
          </Web3Button>
        ) : null}
      </Stack>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Stack minWidth={300} width={'20vw'}>
          <List
            sx={{
              bgcolor: 'rgb(38, 43, 51)',
              color: 'rgb(203, 203, 203)',
              flex: 1,
            }}
          >
            {Object.keys(ChainId)
              .slice(16, -1)
              .map((v, i) => (
                <ListItem
                  key={i}
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  <ListItemButton
                    onClick={() =>
                      setActiveChain(ChainId[v as keyof typeof ChainId])
                    }
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={v} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Stack>
      </Drawer>
    </Box>
  );
}
