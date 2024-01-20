'use client';
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
      <Stack flexDirection={'row'} gap={2}>
        <Typography color={'rgb(227,57,44)'}>acorus bridge</Typography>
      </Stack>
    </Stack>
  );
}
