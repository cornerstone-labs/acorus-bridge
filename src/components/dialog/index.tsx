import { chain, chainL1, chainL1Index } from '@/dtos';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Item } from '../item';
import L1Pic from '@/assets/chainAssets';


interface ModalProps extends DialogProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  placeholder: string;
  setActiveChain: React.Dispatch<React.SetStateAction<chain>>;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  placeholder,
  setActiveChain,
}) => {
  const [item, setItem] = useState(Object.keys(chainL1));

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const arr = item.filter((v) => {
      return v.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });

    setItem(arr);
    if (!e.target.value) {
      setItem(Object.keys(chainL1));
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
              handleClose={handleClose}
              label={chain}
              key={index}
              handleSwitchChain={setActiveChain}
              source={L1Pic[chain as chainL1Index]}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
