import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Content = (props) => {
    const { item } = props.route.params;
    const navigation = useNavigation();

    const press = () => {
        navigation.navigate('Splash')
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <ImageBackground source={require('../assets/Image/bg.gif')}
            style={{height:'100%',width:'100%'}}> */}
            <View
                style={styles.details}>
                <View style={{ height: '12%', flexDirection: 'row' }}>
                    <Image source={require('../assets/Image/aaludra.png')}
                        style={{ height: '80%', width: '20%', marginLeft: '35%', left: "30%" }} />
                    <Text style={{ fontSize: 40, left: '50%', top: '1%', fontWeight: 'bold', color: '#46b7f0' }}>
                        atNews
                    </Text>
                </View>
                <Text
                    style={{ fontSize: 20, top: '3%', color: '#000000', fontWeight: 'bold' }}>
                    {item.title}
                </Text>
                <View style={{ flexDirection: 'row', top: '10%', }}>
                    <Text
                        style={{ fontSize: 16, color: '#000000', }}>
                        By :
                    </Text>
                    <Text
                        style={{ fontSize: 14, color: '#000000', fontWeight: 'bold', top: '0.5%', textDecorationLine: 'underline' }}>
                        {item.author},
                    </Text>
                    <Text></Text>
                </View>
                <Text
                    style={{ fontSize: 15, top: '6%' }}>
                    Date:  {item.publishedAt.substring(0, 10)}    Time : {item.publishedAt.substring(12, 16)} am                </Text>
                <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.image}
                />
                <Text
                    style={{ top: '10%', color: '#000000' }}>
                    {item.content}
                </Text>
                <Text
                    style={{ top: '12%', color: '#000000' }}>
                    {item.description}
                </Text>
                <TouchableOpacity
                    style={{ top: '20%' }}
                    onPress={press}>
                    <Text
                        style={{ top: '20%', fontWeight: 'bold', fontSize: 12, left: '3%', color: 'blue', textAlign: 'center' }}>
                        We will continue on Tomorrow.....
                    </Text>
                </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
        </SafeAreaView>
    );
};

export default Content;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    details: {
        padding: '5%'
    },
    text: {
        // color:'#FFFFFF'
    },
    image: {
        width: '100%',
        height: "45%",
        borderRadius: 8,
        top: '8%',
    },
})
