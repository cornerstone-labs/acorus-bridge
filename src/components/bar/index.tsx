import { Box, Stack, Typography } from '@mui/material';

export default function NavBar() {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      pt={2}
      alignItems={'center'}
    >
      <Box></Box>
      <Stack flexDirection={'row'}>
        <Typography color={'#555'}>Bridge</Typography>
      </Stack>
      <Box bgcolor={'#D7D7D7'} padding={1} borderRadius={2}>
        <Typography color={'#555'}>Connect Wallet</Typography>
      </Box>
    </Stack>
  );
}
