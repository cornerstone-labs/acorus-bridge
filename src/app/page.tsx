'use client';
import { eth } from '@/assets/coinAssets/index';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Image from 'next/image';
import { useContext, useState } from 'react';
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useBalance,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import React from 'react';
import { ChainContext } from '@/context';
import { chain, chainL1, chainL1Index, chainL2, chainL2Index } from '@/dtos';
import { CompositeInput } from '@/components/compositeInput';
const options = ['Staking', 'Transfer'];
export default function Home(this: any) {
  const { data: balance } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const result = parseFloat(value) > parseFloat(balance?.displayValue!);
  const { activeChain, setActiveChain } = useContext(ChainContext)!;

  const { contract } = useContract(chainL1[activeChain as chainL1Index]);
  const address = useAddress();
  const { mutateAsync: WithdrawETHtoOfficialBridge } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [item, setItem] = useState<chain[]>(Object.keys(chainL1) as chain[]);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    if (index === 1) {
      setActiveChain(Object.keys(chainL2)[0] as chainL2Index);
      setItem(Object.keys(chainL2) as chain[]);
    } else {
      setActiveChain(Object.keys(chainL1)[0] as chainL1Index);
      setItem(Object.keys(chainL1) as chain[]);
    }
    setAnchorEl(null);
  };

  return (
    <Box mt={8}>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        height={43.73}
      >
        <Typography variant="h1" fontSize={32} color={'#cbcbcb'}>
          Bridge
        </Typography>
        <ConnectWallet
          theme={'dark'}
          modalTitleIconUrl={''}
          hideTestnetFaucet={true}
        />
      </Stack>

      <Box position={'relative'}>
        <List component="nav" sx={{ width: 'fit-content' }}>
          <ListItemButton
            onClick={handleClickListItem}
            sx={{
              marginTop: 2,
              color: '#cbcbcb',
              borderWidth: 2,
            }}
          >
            <ListItemText primary={options[selectedIndex]} />
            <ArrowDropDownIcon />
          </ListItemButton>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              <Typography color={'#cbcbcb'}>{option}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <CompositeInput
        handleValue={setValue}
        item={item}
        setItem={setItem}
        selectedIndex={selectedIndex}
      />
      {selectedIndex === 1 && (
        <CompositeInput
          direction={'To'}
          handleValue={setValue}
          item={item}
          setItem={setItem}
          selectedIndex={selectedIndex}
        />
      )}
      <Stack alignItems={'center'} mt={4}>
        <Web3Button
          onSuccess={() => {
            console.log('success');
          }}
          style={{ transform: 'unset' }}
          className="web3Button"
          isDisabled={result}
          action={() => {
            WithdrawETHtoOfficialBridge({ args: [address] });
          }}
          contractAddress={chainL1[activeChain as chainL1Index]}
        >
          Continue
        </Web3Button>
      </Stack>
      {!selectedIndex && (
        <>
          <Box
            mt={4}
            sx={{ border: '1.6px solid rgb(64, 66, 78)' }}
            borderRadius={1.2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-around'}
          >
            <Typography color={'#cbcbcb'}>token</Typography>
            <Typography color={'#cbcbcb'}>your Liquidity</Typography>
            <Typography color={'#cbcbcb'}>total</Typography>
          </Box>
          <Box
            bgcolor={'rgb(38, 43, 51)'}
            mt={2}
            sx={{ border: '1.6px solid rgb(64, 66, 78)' }}
            borderRadius={1.2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-around'}
            minHeight={40}
          >
            <Box display={'flex'} gap={1} alignItems={'center'}>
              <Image src={eth} alt="ETH" width={20} height={20} />
              <Typography color={'#cbcbcb'}>ETH</Typography>
            </Box>
            <Typography color={'#cbcbcb'}>130ETH</Typography>
            <Typography color={'#cbcbcb'}>500ETH</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
