import { eth } from '@/assets/coinAssets';
import { ChainContext } from '@/context';
import { Stack, Typography, Button, Skeleton, Box } from '@mui/material';
import {
  NATIVE_TOKEN_ADDRESS,
  useBalance,
  useConnectionStatus,
} from '@thirdweb-dev/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal, selectItem } from '@/components/dialog';
import Image from 'next/image';
import { validate } from '@/utils';
import { chain } from '@/dtos';

interface CompositeInputProps extends selectItem {
  direction?: 'From' | 'To';
  handleValue: React.Dispatch<React.SetStateAction<string>>;
  selectedIndex: number;
  setTargetChain?: React.Dispatch<React.SetStateAction<chain | undefined>>;
  targetChain?: chain;
}
export const CompositeInput: React.FC<CompositeInputProps> = ({
  handleValue,
  setItem,
  item,
  setTargetChain,
  selectedIndex,
  targetChain,
  direction = 'From',
}) => {
  const status = useConnectionStatus();
  const { activeChain, setActiveChain } = useContext(ChainContext)!;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: balance, isLoading: loadingBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);
  const list = useMemo(() => {
    if (direction === 'From') return item;
    return item.filter((v) => v !== activeChain);
  }, [activeChain, direction, item]);

  useEffect(() => {
    setTargetChain?.(list[0]);
  }, [list, setTargetChain]);
  return (
    <Box>
      <Stack flexDirection={'row'} mt={2} alignItems={'center'} gap={0.5}>
        <Typography fontSize={14} color={'#cbcbcb'} minWidth={35}>
          {direction}
        </Typography>
        <Button color="secondary" onClick={() => setModalOpen(true)}>
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
      <Modal
        direction={direction}
        open={modalOpen}
        handleClose={setModalOpen}
        title={'Choose Chain'}
        placeholder="select chain by name"
        setActiveChain={setActiveChain}
        item={list}
        setItem={setItem}
        selectedIndex={selectedIndex}
        setTargetChain={setTargetChain}
      />
    </Box>
  );
};
