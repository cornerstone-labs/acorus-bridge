import { assignChain } from '@/app/layout';
import { chain } from '@/dtos';
import { Button, Typography } from '@mui/material';
import { useSwitchChain } from '@thirdweb-dev/react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface ItemProps {
  label: string;
  handleSwitchChain: React.Dispatch<React.SetStateAction<chain>>;
  source?: StaticImport | string;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Item: React.FC<ItemProps> = ({
  label,
  handleSwitchChain,
  handleClose,
  source = '',
}) => {
  const switchChain = useSwitchChain();

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
        handleSwitchChain(label as chain);
        switchChain(assignChain[label as keyof typeof assignChain].chainId);
        handleClose(false);
      }}
    >
      <Image alt="img" src={source} width={36} height={36} />
      <Typography py={2}>{label}</Typography>
    </Button>
  );
};
