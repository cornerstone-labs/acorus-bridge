import { eth } from '@/assets/coinAssets';
import { ChainContext } from '@/context';
import { Stack, Typography, Button, Skeleton, Box } from '@mui/material';
import {
  NATIVE_TOKEN_ADDRESS,
  useBalance,
  useConnectionStatus,
} from '@thirdweb-dev/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, selectItem } from '@/components/dialog';
import Image from 'next/image';
import { validate } from '@/utils';
import { Chain, TokenName, tokenObj } from '@/dtos';

interface CompositeInputProps extends selectItem {
  direction?: 'From' | 'To';
  handleValue: React.Dispatch<React.SetStateAction<string>>;
  selectedIndex: number;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setTargetChain?: React.Dispatch<React.SetStateAction<Chain | undefined>>;
  targetChain?: Chain;
}
export const CompositeInput: React.FC<CompositeInputProps> = ({
  token,
  setToken,
  handleValue,
  setItem,
  item,
  setTargetChain,
  selectedIndex,
  targetChain,
  direction = 'From',
}) => {
  const status = useConnectionStatus();
  const tokenListRef = useRef<TokenName[]>([]);
  const { activeChain, setActiveChain } = useContext(ChainContext)!;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [tokenList, setTokenList] = useState<TokenName[]>([]);
  const { data: balance, isLoading: loadingBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);
  const list = useMemo(() => {
    if (direction === 'From') {
      return item;
    }
    return item.filter((v) => v !== activeChain);
  }, [activeChain, direction, item]);
  const chainListRef = useRef<Chain[]>(list);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    chainListRef.current = list;
  }, [selectedIndex, activeChain]);
  useEffect(() => {
    console.log('here');
    setTargetChain?.(chainListRef.current[0]);
  }, [list, setTargetChain]);

  return (
    <Box>
      <Stack flexDirection={'row'} mt={2} alignItems={'center'} gap={0.5}>
        <Typography fontSize={14} color={'#cbcbcb'} minWidth={35}>
          {direction}
        </Typography>
        <Button
          color="secondary"
          onClick={() => {
            tokenListRef.current = [];
            setItem(chainListRef.current);

            setTokenList([]);
            setTitle('please choose chain');
            setModalOpen(true);
          }}
        >
          {direction === 'From' ? activeChain : targetChain}
        </Button>
        <Typography />
      </Stack>
      <Box
        borderRadius={6}
        pt={1.5}
        pb={1.5}
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
            onInput={(e) => {
              validate(e);
              handleValue(e.currentTarget.value);
            }}
          />
          <Stack
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image src={eth} alt="img" width={24} height={24} />
            <Button
              sx={{ fontSize: 18 }}
              onClick={() => {
                setTitle('please choose token');
                if (targetChain) {
                  const arr = tokenObj[targetChain].map(
                    (token) => token.tokenName
                  );
                  setTokenList(arr);
                  tokenListRef.current = arr;
                } else {
                  const arr = tokenObj[activeChain].map(
                    (token) => token.tokenName
                  );

                  setTokenList(arr);
                  tokenListRef.current = arr;
                }

                setModalOpen(true);
              }}
            >
              {token}
            </Button>
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
      <Modal
        chainListRef={chainListRef}
        setToken={setToken}
        tokenListRef={tokenListRef}
        setTokenList={setTokenList}
        tokenList={tokenList}
        direction={direction}
        open={modalOpen}
        handleClose={setModalOpen}
        title={title}
        placeholder="select item by its name"
        setActiveChain={setActiveChain}
        item={list}
        setItem={setItem}
        selectedIndex={selectedIndex}
        setTargetChain={setTargetChain}
      />
    </Box>
  );
};
