'use client';
import { eth } from '@/assets/coin/index';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import React from 'react';
import { ChainContext } from './context';
import { chain, chainIndex } from '@/dtos';
import { abi } from '@/abi/L2Pool';

export default function Home(this: any) {
  const { data: balance } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [value, setValue] = useState('');
  const result = parseFloat(value) > parseFloat(balance?.displayValue!);
  const { activeChain, setActiveChain } = useContext(ChainContext)!;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { contract, isLoading } = useContract(
    chain[activeChain as chainIndex],
    abi
  );
  const address = useAddress();
  const { mutateAsync: WithdrawETHtoOfficialBridge } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );
  const { data: role } = useContractRead(contract, 'WithdrawToBridge_Role');
  const { mutateAsync: grantRole } = useContractWrite(contract, 'grantRole');
  const grant = useCallback(async () => {
    try {
      const data = await grantRole({ args: [role, address] });
      console.log(data);
      console.info('contract call successs', data);
    } catch (err) {
      console.error('contract call failure', err);
    }
  }, [address, grantRole, role]);
  useEffect(() => {
    grant();
  }, [grant]);
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
          {activeChain}
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

            <Button sx={{ fontSize: 18 }}>{'ETH'}</Button>
          </Stack>
        </Stack>
        <Stack pt={1} flexDirection={'row'} color={'#3d424d'}>
          <Typography fontSize={14}>Balance:</Typography>
          <Typography fontSize={14}>
            {!isLoading ? (
              parseFloat(balance?.displayValue!).toFixed(8)
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
        <Web3Button
          onSuccess={() => {
            console.log('success');
          }}
          style={{ transform: 'unset' }}
          className="web3Button"
          isDisabled={result}
          action={() => {
            WithdrawETHtoOfficialBridge({ args: [address] });
          }}
          contractAddress={chain[activeChain as chainIndex]}
        >
          Continue
        </Web3Button>
      </Stack>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Stack minWidth={300}>
          <List
            sx={{
              flex: '1',
              bgcolor: 'rgb(38, 43, 51)',
              color: 'rgb(203, 203, 203)',
            }}
          >
            {Object.keys(chain).map((v, i) => (
              <ListItem key={i}>
                <ListItemButton onClick={() => setActiveChain(v as chainIndex)}>
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
