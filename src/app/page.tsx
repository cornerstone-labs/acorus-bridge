'use client';
import { eth } from '@/assets/coin/index';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useBalance,
  useConnectionStatus,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import React from 'react';
import { ChainContext } from './context';
import { chain, chainIndex } from '@/dtos';
import { Modal } from '@/components/dialog';
import { Item } from '@/components/item';

export default function Home(this: any) {
  const { data: balance, isLoading: loadingBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);
  const [value, setValue] = useState('');
  const result = parseFloat(value) > parseFloat(balance?.displayValue!);
  const { activeChain, setActiveChain } = useContext(ChainContext)!;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const status = useConnectionStatus();
  const { contract } = useContract(chain[activeChain as chainIndex]);
  const address = useAddress();
  const { mutateAsync: WithdrawETHtoOfficialBridge } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );

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
        <Typography minWidth={100} fontSize={14}>
          stake
        </Typography>
      </Button>
      <Stack flexDirection={'row'} mt={2} alignItems={'center'} gap={0.5}>
        <Typography fontSize={14} color={'#cbcbcb'}>
          From
        </Typography>

        <Button color="secondary" onClick={() => setModalOpen(true)}>
          Ethereum
        </Button>
        <Typography />
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
          {status === 'connected' ? (
            <Typography fontSize={14}>
              {!loadingBalance ? (
                parseFloat(balance?.displayValue!).toFixed(8)
              ) : (
                <Skeleton
                  animation="wave"
                  width={40.792}
                  sx={{ bgcolor: 'grey.400' }}
                />
              )}
            </Typography>
          ) : (
            <Typography fontSize={14}>
              Please connect your wallet first
            </Typography>
          )}
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

      <Modal open={modalOpen} handleClose={setModalOpen} title={'Choose Chain'}>
        <Box
          display={'flex'}
          gap={2}
          justifyContent={'center'}
          flexWrap={'wrap'}
        >
          {Object.keys(chain).map((chain, index) => (
            <Item label={chain} key={index} handleClick={setActiveChain} />
          ))}
        </Box>
      </Modal>
    </Box>
  );
}
