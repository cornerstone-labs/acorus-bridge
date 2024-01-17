import { Box, Typography } from '@mui/material';
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
    <Box
      sx={{ '&:hover': { cursor: 'pointer' } }}
      onClick={() => {
        console.log(2);
        handleClick(label);
      }}
      alignItems={'center'}
      minWidth={180}
      flex={1}
      gap={2}
      color={'#fff'}
      display={'flex'}
      bgcolor={'rgb(38, 43, 51)'}
      borderRadius={2}
    >
      <Image alt="img" src={source} />
      <Typography py={2}>{label}</Typography>
    </Box>
  );
};
