import { generateMnemonic } from '@/utils/wallet';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
// import { config, GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { GluestackUIProvider, Text, Box, config, Button, ButtonText } from '@gluestack-ui/themed';

import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui.js/faucet';
import { Ed25519Keypair as KeyPair } from '@mysten/sui.js';
import { TransactionBlock } from '@mysten/sui.js';

const network = 'devnet';
let keypair: KeyPair;

const client = new SuiClient({ url: getFullnodeUrl(network) });
export default function App(): JSX.Element {

  const [mnemonic, setMnemonic] = useState('');
  const [address, setAddress] = useState('');
  const [coins, setCoins] = useState('');
  const [faucet, setFaucet] = useState('');
  const [moveResult, setMoveResult] = useState('');
  const createMnemonic = () => {
    const mn = 'nuclear empty clerk strong fiction act ship tunnel top stove hat goose' //generateMnemonic();
    setMnemonic(mn);
  };

  const makeFaucet = async (address: string) => {
    const result = await requestSuiFromFaucetV0({
      host: getFaucetHost(network),
      recipient: address,
    });
    setFaucet(JSON.stringify(result));
  }
  const getCoins = async (address: string) => {
    const result = await client.getCoins({
      owner: address
    });
    setCoins(JSON.stringify(result));
  }

  const createAccount = (mnemonic: string) => {
    keypair = KeyPair.deriveKeypair(mnemonic);
    const _address = keypair.getPublicKey().toSuiAddress();
    setAddress(_address);
  }
  async function createMultisigAccount(): Promise<void> {
    const packageObjectId = '0xa67043c277b23ec7b770ae049d18176aa7a8ed66b90a314117aeea10dd271b6c';
    const tx = new TransactionBlock();

    tx.moveCall({
      target: `${packageObjectId}::multisig::create_multisig_account`,
      arguments: [tx.pure(3)],
    });

    const accountCreationFilter = {
      MoveModule: { package: packageObjectId, module: 'multisig' },

    };

    const unsubscribe = await client.subscribeEvent({
      filter: accountCreationFilter,
      onMessage(event) {
        console.log('accountCreationEvent', event)
      },
    });


    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    });

    const txn = await client.getTransactionBlock({
      digest: result.digest,
      // only fetch the effects field
      options: {
        showEffects: true,
        showInput: false,
        showEvents: true,
        showObjectChanges: true,
        showBalanceChanges: false,
      },
    });


    setMoveResult(JSON.stringify({ result, txn }))
  }

  return (
    <GluestackUIProvider config={config.theme}>
      <Box width="100%" 
          justifyContent="center" 
          alignItems="center" 
          style={styles.container}>
        <Text>Multi Sig Test</Text>
        <Button style={styles.button}
          onPress={createMnemonic}>
          <Text style={styles.buttonText}>Generate Mnemonic</Text>
        </Button>
        <Text style={styles.mnemonic}>{mnemonic}</Text>
        <Button style={styles.button}
          onPress={() => createAccount(mnemonic)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Button>
        <Text style={styles.mnemonic}>{address}</Text>
        <Button style={styles.button}
          onPress={() => makeFaucet(address)}>
          <ButtonText style={styles.buttonText}>Make Faucet</ButtonText>
        </Button>
        <ButtonText style={styles.mnemonic}>Result: {faucet}</ButtonText>
        <Button style={styles.button}
          onPress={() => getCoins(address)}>
          <ButtonText style={styles.buttonText}>Get Coins</ButtonText>
        </Button>
        <Text style={styles.mnemonic}>Coins: {coins}</Text>
        <Button style={styles.button}
          onPress={createMultisigAccount}>
          <ButtonText style={styles.buttonText}>Create Multisig account</ButtonText>
        </Button>
        <Text style={styles.mnemonic}>Move all result: {moveResult}</Text>
      </Box>
    </GluestackUIProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 600,
    width: 360
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingBlock: 5,
    paddingInline: 10,
    marginTop: 15
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  mnemonic: {
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 15,
    maxWidth: 1000,
    flexWrap: 'wrap'
  }
});

