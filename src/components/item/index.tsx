import { chain } from '@/dtos';
import { Button, Typography } from '@mui/material';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface ItemProps {
  label: chain;
  handleSwitchChain: React.Dispatch<React.SetStateAction<chain>>;
  source?: StaticImport | string;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  direction: 'From' | 'To';
  setTargetChain?: React.Dispatch<React.SetStateAction<chain | undefined>>;
}
export const Item: React.FC<ItemProps> = ({
  direction,
  label,
  handleSwitchChain,
  setTargetChain,
  handleClose,
  source = '',
}) => {
  return (
    <Button
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        gap: 1.6,
        minWidth: 180,
        bgcolor: 'rgb(38, 43, 51)',
        borderRadius: 2,
        color: '#fff',
      }}
      onClick={() => {
        if (direction === 'From') {
          handleSwitchChain(label);
        }
        setTargetChain?.(label);
        handleClose(false);
      }}
    >
      <Image alt="img" src={source} width={36} height={36} />
      <Typography py={2}>{label}</Typography>
    </Button>
  );
};
