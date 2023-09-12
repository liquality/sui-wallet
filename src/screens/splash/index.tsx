
import React from 'react';
import { animated } from '@react-spring/web'
import { StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import logo from '@/assets/img/logo.svg';

export default function Splash(): JSX.Element {
    const AnimatedLinearGradient = animated(LinearGradient);
    return (
        <View style={styles.container}>
            <AnimatedLinearGradient
                colors={['#1ce4c3', '#4866d3', '#302e78']}>
                <Image source={{ uri: logo }} style={styles.logo} />
            </AnimatedLinearGradient>
        </View>

    );
}

const styles = StyleSheet.create({
    logo: {
        width: 155,
        height: 95
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%'
    }
});
