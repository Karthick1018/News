import React, { useEffect } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Splash = () => {

    const navigation = useNavigation();
    const isFocused = useFocusEffect

    const Image = () => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 3000)
    }
    useEffect(() => {
        if (isFocused) {
            Image()
        }
    }, [isFocused])

    return (
        <SafeAreaView>
            <ImageBackground
                source={require('../assets/Image/splash.gif')}
                style={{ height: '100%', width: '100%' }}>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default Splash;