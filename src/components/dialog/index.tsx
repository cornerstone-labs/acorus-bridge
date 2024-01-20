import { chain, chainL1, chainL1Index, chainL2 } from '@/dtos';
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
import L1Pic from '@/assets/chainAssets';

export interface selectItem {
  item: Array<chain>;
  setItem: React.Dispatch<React.SetStateAction<Array<chain>>>;
}

type composition = DialogProps & selectItem;
interface ModalProps extends composition {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  placeholder: string;
  setActiveChain: React.Dispatch<React.SetStateAction<chain>>;
  selectedIndex: number;
  direction: 'From' | 'To';
}

export const Modal: React.FC<ModalProps> = ({
  selectedIndex,
  open,
  handleClose,
  title,
  placeholder,
  setActiveChain,
  item,
  setItem,
  direction,
}) => {
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const arr = item.filter((v) => {
      return v.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });

    setItem(arr);
    if (!e.target.value) {
      if (selectedIndex === 0) {
        setItem(Object.keys(chainL1) as chain[]);

        return;
      }
      setItem(Object.keys(chainL2) as chain[]);
    }
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
          {item.map((chain, index) => (
            <Item
              direction={direction}
              handleClose={handleClose}
              label={chain}
              key={index}
              handleSwitchChain={setActiveChain}
              source={L1Pic[chain]}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
