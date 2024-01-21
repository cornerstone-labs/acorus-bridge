import { Chain, TokenName } from '@/dtos';
import { Button, Typography } from '@mui/material';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface ItemProps {
  tokenList: TokenName[];
  label: Chain | TokenName;
  handleSwitchChain: React.Dispatch<React.SetStateAction<Chain>>;
  source: StaticImport | string;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  direction: 'From' | 'To';
  setTargetChain?: React.Dispatch<React.SetStateAction<Chain | undefined>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
export const Item: React.FC<ItemProps> = ({
  tokenList,
  setToken,
  direction,
  label,
  handleSwitchChain,
  setTargetChain,
  handleClose,
  source,
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
        if (tokenList.length !== 0) {
          setToken(label);
          return;
        }
        if (direction === 'From') {
          handleSwitchChain(label as Chain);
        }
        setTargetChain?.(label as Chain);
        handleClose(false);
      }}
    >
      <Image alt="img" src={source} width={36} height={36} />
      <Typography py={2}>{label}</Typography>
    </Button>
  );
};
