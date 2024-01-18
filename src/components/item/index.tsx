import { Box, Button, Typography } from '@mui/material';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface ItemProps {
  label: string;
  handleClick: Function;
  source?: StaticImport | string;
}
export const Item: React.FC<ItemProps> = ({
  label,
  handleClick,
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
        console.log(2);
        handleClick(label);
      }}
    >
      <Image alt="img" src={source} width={36} height={36} />
      <Typography py={2}>{label}</Typography>
    </Button>
  );
};
