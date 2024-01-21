import { Chain, TokenName } from '@/dtos';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { Item } from '../item';

export interface selectItem {
  item: Array<Chain>;
  setItem: React.Dispatch<React.SetStateAction<Array<Chain>>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

type composition = DialogProps & selectItem;
interface ModalProps extends composition {
  tokenListRef: React.MutableRefObject<string[]>;
  setTokenList: React.Dispatch<React.SetStateAction<string[]>>;
  tokenList: TokenName[];
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  placeholder: string;
  setActiveChain: React.Dispatch<React.SetStateAction<Chain>>;
  selectedIndex?: number;
  direction: 'From' | 'To';
  setTargetChain?: React.Dispatch<React.SetStateAction<Chain | undefined>>;
  chainListRef: React.MutableRefObject<Chain[]>;
}

export const Modal: React.FC<ModalProps> = ({
  setToken,
  tokenListRef,
  setTokenList,
  tokenList,
  open,
  handleClose,
  title,
  placeholder,
  setActiveChain,
  item: chainList,
  setItem,
  direction,
  setTargetChain,
  chainListRef,
}) => {
  const items: string[] | Chain[] = useMemo(() => {
    if (tokenListRef.current.length !== 0) return tokenList;
    return chainList;
  }, [chainList, tokenList, tokenListRef]);

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const pendingData =
      tokenListRef.current.length !== 0
        ? tokenListRef.current
        : chainListRef.current;
    const arr = pendingData?.filter((v) => {
      return v.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });

    console.log(arr);
    tokenListRef.current.length === 0
      ? setItem(arr as Chain[])
      : setTokenList(arr);
  };
  return (
    <Dialog
      onClose={() => handleClose(false)}
      open={open}
      scroll="paper"
      fullWidth
    >
      <DialogTitle color={'#cbcbcb'} variant="h5">
        {title}
      </DialogTitle>
      <DialogActions>
        <TextField
          autoComplete="off"
          onChange={handleFilter}
          fullWidth
          sx={{
            bgcolor: 'grey.500',
            borderRadius: 2,
          }}
          hiddenLabel
          placeholder={placeholder}
          type="search"
        />
      </DialogActions>
      <DialogContent>
        <Box
          display={'flex'}
          gap={2}
          justifyContent={'center'}
          flexWrap={'wrap'}
        >
          {items?.map((item, index) => (
            <Item
              tokenList={tokenList}
              setToken={setToken}
              setTargetChain={setTargetChain}
              direction={direction}
              handleClose={handleClose}
              label={item}
              key={index}
              handleSwitchChain={setActiveChain}
              source={''}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
