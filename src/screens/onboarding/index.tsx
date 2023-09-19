
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Logo from '@/assets/img/logo.svg';

export default function Coins(): JSX.Element {
    return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
          <Box  sx={{ width: 155, height: 95 }} >
          <img src={Logo} alt="Logo"/>
          </Box>
        </Box>
      );
}
