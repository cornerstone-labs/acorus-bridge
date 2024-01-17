import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  children,
  title,
}) => {
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
          fullWidth
          sx={{
            bgcolor: 'grey.500',
            borderRadius: 2,
          }}
          hiddenLabel
          placeholder="Symbol or Address"
          type="search"
        />
      </DialogActions>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
