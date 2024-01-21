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

import { useContext, useRef, useState } from 'react';
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
import { Chain, ChainL1, ChainL1Index, ChainL2, ChainL2Index } from '@/dtos';
import { CompositeInput } from '@/components/compositeInput';
const options = ['Staking', 'Transfer'];
export default function Home(this: any) {
  const { data: balance } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const result = parseFloat(value) > parseFloat(balance?.displayValue!);
  const { activeChain, setActiveChain } = useContext(ChainContext)!;
  const [token, setToken] = useState<string>('ETH');
  const { contract } = useContract({ ...ChainL1, ...ChainL2 }[activeChain]);
  const address = useAddress();
  const { mutateAsync: WithdrawETHtoOfficialBridge } = useContractWrite(
    contract,
    'WithdrawETHtoOfficialBridge'
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [item, setItem] = useState<Chain[]>(Object.keys(ChainL1) as Chain[]);
  const [targetChain, setTargetChain] = useState<Chain>();
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
      setActiveChain(Object.keys(ChainL2)[0] as ChainL2Index);
      setItem(Object.keys(ChainL2) as Chain[]);
    } else {
      setActiveChain(Object.keys(ChainL1)[0] as ChainL1Index);
      setItem(Object.keys(ChainL1) as Chain[]);
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
        token={token}
        setToken={setToken}
        handleValue={setValue}
        item={item}
        setItem={setItem}
        selectedIndex={selectedIndex}
      />
      {selectedIndex === 1 && (
        <CompositeInput
          token={token}
          setToken={setToken}
          setTargetChain={setTargetChain}
          direction={'To'}
          handleValue={setValue}
          item={item}
          setItem={setItem}
          selectedIndex={selectedIndex}
          targetChain={targetChain}
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
          contractAddress={ChainL1[activeChain as ChainL1Index]}
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
