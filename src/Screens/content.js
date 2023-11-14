import React,{useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import themeContext from '../config/themecontext';

const Content = (props) => {
    const { item } = props.route.params;
    const navigation = useNavigation();

    const theme=useContext(themeContext)

    const press = () => {
        navigation.navigate('Home')
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <ImageBackground source={require('../assets/Image/bg.gif')}
            style={{height:'100%',width:'100%'}}> */}
            <View
                style={styles.details}>
                <View style={{ height: '12%', flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.backiconview}
                    onPress={() => { navigation.navigate('Home') }}>
                    <Icon name="arrow-back" size={25} color={theme.color}/>
                </TouchableOpacity>
                    <Image source={require('../assets/Image/aaludra.png')}
                        style={{ height: '70%', width: '18%', marginLeft: '35%', }} />
                    <Text style={{ fontSize: 35, left: '18%', top: '2%', fontWeight: 'bold', color: '#46b7f0' }}>
                        atNews
                    </Text>
                </View>
                <Text
                    style={{ fontSize: 20, top: '2%', color: theme.color, fontWeight: 'bold' }}>
                    {item.title}
                </Text>
                <View style={{ flexDirection: 'row', top: '10%', }}>
                    <Text
                        style={{ fontSize: 16, color: theme.color, }}>    
                        By :
                    </Text>
                    <Text
                        style={{ fontSize: 14,color: theme.color, fontWeight: 'bold', top: '0.5%', textDecorationLine: 'underline' }}>
                        {item.author},
                    </Text>
                </View>
                <Text
                    style={{ fontSize: 15, top: '6%' ,color: theme.color}}>
                    Date:  {item.publishedAt.substring(0, 10)}    Time : {item.publishedAt.substring(12, 16)} am
                </Text>
                <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.image}
                />
                <Text
                    style={{ top: '10%', color: theme.color}}>
                    {item.content}
                </Text>
                <Text
                    style={{ top: '12%', color: theme.color }}>
                    {item.description}
                </Text>
                <TouchableOpacity
                    style={{ top: '20%' }}
                    onPress={press}>
                    <Text
                        style={{ top: '20%', fontWeight: 'bold', fontSize: 12, left: '3%', color: theme.color, textAlign: 'center' }}>
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
