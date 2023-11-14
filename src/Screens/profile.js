import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Image, TextInput, Text, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import themeContext from '../config/themecontext';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [checked, setChecked] = useState('male');

    const theme = useContext(themeContext)

    const navigation = useNavigation();

    const handleEmailChange = (text) => {
        setEmail(text);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(text)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    }
    const handlePhoneNumberChange = (text) => {
        setPhoneNumber(text);
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(text)) {
            setPhoneNumberError('Invalid phone number');
        } else {
            setPhoneNumberError('');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.backiconview}
                    onPress={() => { navigation.navigate('Home') }}>
                    <Icon name="arrow-back" size={30} color={theme.color} />
                </TouchableOpacity>
                <Text
                    style={{ ...styles.headertext, color: theme.color }}>
                    Complete Your Profile
                </Text>
            </View>
            <View
                style={styles.imageview}>
                <Image
                    source={require('../assets/Image/profile.jpg')}
                    style={styles.profileimage} />
                <TouchableOpacity>
                    <Text
                        style={{ ...styles.changetext, color: theme.color }}>
                        Change Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.nameview}>
                <Text
                    style={{ ...styles.text, color: theme.color }}>
                    Name*
                </Text>
                <TextInput
                    placeholder="Name"
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.color, width: 330, color: theme.color }}
                    placeholderTextColor={theme.color}
                />
            </View>
            <View
                style={styles.emailinput}>
                <Text
                    style={{ ...styles.text, color: theme.color }}>
                    Email*
                </Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.color}
                    style={{ ...styles.inputtext, borderBottomWidth: 1, borderBottomColor: theme.color, width: 330, color: theme.color }}
                    keyboardType="email-address"
                    onChangeText={handleEmailChange}
                />
                <Text
                    style={{ color: theme.color }}>
                    {emailError}
                </Text>
            </View>
            <View
                style={styles.phoneinput}>
                <Text
                    style={{ ...styles.text, color: theme.color }}>
                    Phone Number*
                </Text>
                <TextInput
                    placeholder="+91  Phone Number"
                    placeholderTextColor={theme.color}
                    secureTextEntry={true}
                    style={{ ...styles.inputtext, borderBottomWidth: 1, borderBottomColor: theme.color, width: 330, color: theme.color }}
                    keyboardType="phone-pad"
                    onChangeText={handlePhoneNumberChange}
                />
                <Text
                    style={{ color: theme.color }}>
                    {phoneNumberError}
                </Text>
            </View>
            <View
                style={styles.radioButtonsContainer}>
                <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: theme.color }}>
                    Gender
                </Text>
                <RadioButton
                    value="male"
                    status={checked === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('male')}
                />
                <Text
                    style={{ ...styles.radioText, color: theme.color }}>
                    Male
                </Text>
                <RadioButton
                    value="female"
                    status={checked === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('female')}
                />
                <Text
                    style={{ ...styles.radioText, color: theme.color }}>
                    Female
                </Text>
            </View>
            {/* <View
                style={styles.contactsview}>
                <TouchableOpacity
                    style={{ left: '50%' }}
                    onPress={() => Linking.openURL('https://www.facebook.com')}>
                    <Entypop name="facebook" size={30} color="#1e24d4" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ right: '-7%' }}
                    onPress={() => Linking.openURL('https://www.instagram.com')}>
                    <Entypop name="instagram" size={30} color="#d41e82" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ right: '30%' }}
                    onPress={() => Linking.openURL('https://www.youtube.com')}>
                    <Entypop name="youtube" size={30} color="#f20a29" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ right: '60%' }}
                    onPress={() => Linking.openURL('https://www.gmail.com')}>
                    <Entypop name="mail" size={30} color="#f20a29" />
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}
export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFFF'
    },
    backiconview: {
        marginTop: '5%',
        marginLeft: '5%'
    },
    headertext: {
        marginTop: '6%',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '3%'
    },
    imageview: {
        marginLeft: '35%',
        marginTop: '15%',
        height: '15%'
    },
    profileimage: {
        height: '100%',
        width: '45%',
        borderRadius: 50
    },
    changetext: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        top: '10%'
    },
    nameview: {
        marginLeft: '8%',
        marginTop: '8%'
    },
    emailinput: {
        marginLeft: '8%',
        marginTop: '5%'
    },
    phoneinput: {
        marginLeft: '8%',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    radioButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: '5%',
        left: '4%'
    },
    radioText: {
        marginLeft: 5,
        fontSize: 16
    },
    profileview: {
        backgroundColor: '#6DBC2B',
        height: '6%',
        marginTop: '10%'
    },
    profiletext: {
        textAlign: 'center',
        top: '10%',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF'
    },
    contactsview: {
        height: '11%',
        marginTop: '42%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#ede8e9'
    }
})

