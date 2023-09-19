
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Logo from '@/assets/img/logo.svg';


import { generateMnemonic } from '@/utils/wallet';
import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui.js/faucet';
import { TransactionBlock, Ed25519Keypair as KeyPair } from '@mysten/sui.js';
import { getSuiClient, makeFaucet } from '@/utils/client';
import { createMultisigAccount } from '@/utils/contracts';

export default function Coins(): JSX.Element {
   
  const [address, setAddress] = useState('');
  const [coins, setCoins] = useState('');

  const [moveResult, setMoveResult] = useState('');
  const mnemonic = 'nuclear empty clerk strong fiction act ship tunnel top stove hat goose' //generateMnemonic();

  const getCoins = async (address: string) => {
    const result = await getSuiClient().getCoins({
      owner: address
    });
    setCoins(JSON.stringify(result));
  }

  useEffect(() => {
    async function createAccount() {
      const keypair = KeyPair.deriveKeypair(mnemonic);
      const _address = keypair.getPublicKey().toSuiAddress();
      setAddress(_address);
      const faucet = await makeFaucet(_address);
      console.log('faucet', faucet);
      const account = await createMultisigAccount(keypair, 3);
      console.log('account', account);
    }

    if(!address) {
      createAccount();
    }
  })
  
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', }}>
      <CircularProgress />
    </Box>
      );
}
