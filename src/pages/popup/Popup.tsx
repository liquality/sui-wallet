import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Popup(): JSX.Element {
  const mn = 'test test test';
  return (
    <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <Text>Mnemonic: {mn}</Text>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 800,
    width: 300
  },
});
