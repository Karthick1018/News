import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Linking,
    ToastAndroid,
    RefreshControl,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from "react-native-vector-icons//MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Share from 'react-native-share';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypop from "react-native-vector-icons/Entypo";


const Home = () => {
    const [newsData, setNewsData] = useState([]);
    const [activeButton, setActiveButton] = useState("Trending");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [savedItems, setSavedItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Trending");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isIndiaSelected, setIsIndiaSelected] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const fadeIn = () => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start(() => {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }
                ).start();
            });
        };

        const interval = setInterval(fadeIn, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleIndiaClick = () => {
        setIsIndiaSelected(!isIndiaSelected);
    }
    const handleCategoryClick = () => {
        setIsCategorySelected(!isCategorySelected);
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        closeDrawer();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = newsData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const onRefresh = async () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 2000);
    };

    const navigation = useNavigation();

    const handleButtonPress = (buttonText) => {
        if (buttonText === "Menu") {
            setIsDrawerOpen(true);
        } else {
            setActiveButton(buttonText);
            console.log(activeButton);
        }
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    }
    const handleOverlayPress = () => {
        closeDrawer();
    }

    const buttonStyle = (buttonText) => {
        return activeButton === buttonText ? { color: 'blue' } : {};
    }

    const press = () => {
        navigation.navigate('Profile')
    }

    const Settings = () => {
        navigation.navigate('Video')
    }
    const handleShare = async (item) => {
        try {
            const options = {
                title: 'Share WITH',
                message: item.title,
                url: item.url,
                uri: item.urlToImage
            };
            await Share.open(options);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSave = (index) => {
        const updatedSavedItems = [...savedItems];
        updatedSavedItems[index] = !updatedSavedItems[index];
        setSavedItems(updatedSavedItems);

        ToastAndroid.showWithGravityAndOffset(
            updatedSavedItems[index] ? 'Moved to Saved' : 'Removed from Saved',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            25,
            50
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let category = selectedCategory;
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${category}&from=2023-11-02&to=2023-11-02&sortBy=popularity&apiKey=689475ef02644f6cb63ea2bd4b8f2352`
                );
                const data = await response.json();
                setNewsData(data.articles);
                console.log(response, '<<<<<<<<<<<<<<<<<<<<<<<<<<<res>>>>>>>>>>>>>>>>>>>>>>>>');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedCategory, searchQuery]);

    const handleCardPress = (item) => {
        navigation.navigate('Content', { item });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}>
            {/* <LinearGradient
                colors={['#A9F1DF', '#FFBBBB']}
                style={{ borderRadius: 10, flex: 1, padding: '3%' }}> */}
            <Text style={styles.title} numberOfLines={1}>
                {searchQuery ? item.title : item.title}
            </Text>
            <Text
                style={styles.date}>
                Date:  {item.publishedAt.substring(0, 10)}    Time : {item.publishedAt.substring(12, 16)} am
            </Text>
            <Image
                source={{ uri: item.urlToImage }}
                style={styles.image}
            />
            <Text
                style={styles.description} numberOfLines={2}>
                {item.description}
            </Text>
            <TouchableOpacity
                onPress={() => Linking.openURL(item.url)}>
                <Text
                    style={{ color: '#075af2', marginTop: '2%' }}>
                    {item.url}
                </Text>
                <View
                    style={{ flexDirection: 'row', marginTop: '2%', marginLeft: '80%' }}>
                    <TouchableOpacity
                        style={{ right: '80%' }}
                        onPress={() => handleShare(item)}>
                        <Icon name="share" size={20} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            name={savedItems[index] ? "heart" : "heart-o"}
                            size={20}
                            color={savedItems[index] ? "red" : "#000000"}
                            onPress={() => handleSave(index)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ left: '40%' }}>
                        <Entypo name="dots-three-vertical" size={20} color="#000000" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {/* </LinearGradient> */}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            style={styles.container}>
            {isDrawerOpen && (
                <>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={handleOverlayPress} />
                    <View
                        style={styles.drawer}>
                        <View style={{ height: '15%' }}>
                            <View style={{ height: '45%', flexDirection: 'row' }}>
                                <Image source={require('../assets/Image/aaludra.png')}
                                    style={{ height: '80%', width: '20%', left: '5%' }} />
                                <Text
                                    style={{
                                        fontSize: 20,
                                        marginLeft: '20%',
                                        fontWeight: 'bold',
                                        color: '#46b7f0',
                                        top: '3%'
                                    }}>
                                    aaludra
                                </Text>
                            </View>
                            <Searchbar
                                placeholder="Search"
                                onChangeText={handleSearch}
                                value={searchQuery}
                                style={{ top: '8%' ,backgroundColor:'#FFFFFF',borderWidth:1,width:'80%',height:'45%',}}
                            />
                        </View>
                        <ScrollView >
                            <TouchableOpacity
                                style={{ marginTop: '5%' }}>
                                <Text
                                    style={{ fontSize: 15, color: '#FFFFFF', fontWeight: 'bold' }}>
                                    BEYOND ARTICLES :
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: '10%' }}
                                onPress={() => handleCategorySelect("Photos")}>
                                <Icon name="photo" size={15} color="gray" />
                                <Text
                                    style={styles.drawertext}>
                                    Photos
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect("Videos")}
                                style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <Icon name="video-camera" size={15} color="#a819a4" />
                                <Text
                                    style={styles.drawertext}>
                                    Videos
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect("Live")}
                                style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <Feather name="tv" size={15} color="red" />
                                <Text
                                    style={styles.drawertext}>
                                    Live Channel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect("Podcasts")}
                                style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <Icon name="podcast" size={15} color="#e6a653" />
                                <Text
                                    style={styles.drawertext}>
                                    Podcasts
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect("Games")}
                                style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <Icon name="gamepad" size={15} color="#37deca" />
                                <Text
                                    style={styles.drawertext}>
                                    Games
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleCategorySelect("Sports")}
                                style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <MaterialCommunityIcons name="cricket" size={15} color="#ee7df0" />
                                <Text
                                    style={styles.drawertext}>
                                    Sports
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleIndiaClick}
                                style={{ marginTop: '10%', flexDirection: 'row' }}>
                                <Ionicons name="flag" size={15} color="#5ce673" />

                                {/* <LinearGradient colors={['green', 'white', 'orange']}> */}
                                <Text
                                    style={{ color: '#000000', marginLeft: '8%' }}>
                                    India
                                </Text>
                                {/* </LinearGradient> */}
                            </TouchableOpacity>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("TamilNadu")}
                                    style={{ borderWidth: 1, width: '45%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'TamilNadu' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '50%', top: '3%', color: selectedCategory === 'TamilNadu' ? '#FFFFFF' : '#000000' }}>
                                        Tamil Nadu
                                    </Text>
                                </TouchableOpacity>}
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Kerala")}
                                    style={{ borderWidth: 1, width: '30%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'Kerala' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '50%', top: '3%', color: selectedCategory === 'Kerala' ? '#FFFFFF' : '#000000' }}>
                                        Kerala
                                    </Text>
                                </TouchableOpacity>}
                            </View>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Andhra Pradesh")}
                                    style={{ borderWidth: 1, width: '60%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'Andhra Pradesh' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '80%', top: '2%', color: selectedCategory === 'Andhra Pradesh' ? '#FFFFFF' : '#000000' }}>
                                        Andhra Pradesh
                                    </Text>
                                </TouchableOpacity>}
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Delhi")}
                                    style={{ borderWidth: 1, width: '30%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'Delhi' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '85%', top: '3%', color: selectedCategory === 'Delhi' ? '#FFFFFF' : '#000000' }}>
                                        Delhi
                                    </Text>
                                </TouchableOpacity>}
                            </View>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Karnataka")}
                                    style={{ borderWidth: 1, width: '50%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'Karnataka' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '100%', top: '2%', color: selectedCategory === 'Karnataka' ? '#FFFFFF' : '#000000' }}>
                                        Karnataka
                                    </Text>
                                </TouchableOpacity>}
                                {isIndiaSelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Mumbai")}
                                    style={{ borderWidth: 1, width: '30%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'Mumbai' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '30%', top: '3%', color: selectedCategory === 'Mumbai' ? '#FFFFFF' : '#000000' }}>
                                        Mumbai
                                    </Text>
                                </TouchableOpacity>}
                            </View>
                            <TouchableOpacity
                                onPress={handleCategoryClick}
                                style={{ marginTop: '10%', flexDirection: 'row' }}>
                                {/* <LinearGradient colors={['red', 'blue']}> */}
                                <MaterialIcons name='category' size={16} color="#4f75e0" />
                                <Text
                                    style={{ color: '#000000', marginLeft: '7%' }}>
                                    Categories
                                </Text>
                                {/* </LinearGradient> */}
                            </TouchableOpacity>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Technology")}
                                    style={{ borderWidth: 1, width: '45%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'Technology' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '50%', top: '3%', color: selectedCategory === 'Technology' ? '#FFFFFF' : '#000000' }}>
                                        Technology
                                    </Text>
                                </TouchableOpacity>}
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("political")}
                                    style={{ borderWidth: 1, width: '35%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'Political' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '50%', top: '3%', color: selectedCategory === 'Political' ? '#FFFFFF' : '#000000' }}>
                                        Political
                                    </Text>
                                </TouchableOpacity>}
                            </View>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Business")}
                                    style={{ borderWidth: 1, width: '50%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'Business' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '100%', top: '2%', color: selectedCategory === 'Business' ? '#FFFFFF' : '#000000' }}>
                                        Business
                                    </Text>
                                </TouchableOpacity>}
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("World")}
                                    style={{ borderWidth: 1, width: '30%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'World' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '60%', top: '3%', color: selectedCategory === 'World' ? '#FFFFFF' : '#000000' }}>
                                        World
                                    </Text>
                                </TouchableOpacity>}
                            </View>
                            <View
                                style={{ flexDirection: 'row' }}>
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("City")}
                                    style={{ borderWidth: 1, width: '30%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', backgroundColor: selectedCategory === 'City' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '70%', top: '2%', color: selectedCategory === 'City' ? '#FFFFFF' : '#000000' }}>
                                        City
                                    </Text>
                                </TouchableOpacity>}
                                {isCategorySelected && <TouchableOpacity
                                    onPress={() => handleCategorySelect("Web Series")}
                                    style={{ borderWidth: 1, width: '50%', marginTop: '3%', height: 25, borderRadius: 20, flexDirection: 'row', left: '5%', backgroundColor: selectedCategory === 'Web Series' ? '#f58727' : '#FFFFFF' }}>
                                    <Text
                                        style={{ left: '90%', top: '3%', color: selectedCategory === 'Web Series' ? '#FFFFFF' : '#000000' }}>
                                        Web Series
                                    </Text>
                                </TouchableOpacity>}
                            </View>

                        </ScrollView>
                        <View style={{ flexDirection: 'row', height: '5%' }}>
                            <TouchableOpacity
                                style={{ marginLeft: '10%', top: '5%' }}
                                onPress={() => Linking.openURL('https://www.facebook.com')}>
                                <Entypop name="facebook" size={22} color="#1e24d4" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginLeft: '10%', top: '5%' }}
                                onPress={() => Linking.openURL('https://www.instagram.com')}>
                                <Entypop name="instagram" size={22} color="#d41e82" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginLeft: '10%', top: '5%' }}
                                onPress={() => Linking.openURL('https://www.youtube.com')}>
                                <Entypop name="youtube" size={25} color="#f20a29" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginLeft: '10%', top: '5%' }}
                                onPress={() => Linking.openURL('https://www.gmail.com')}>
                                <Entypop name="mail" size={25} color="#f20a29" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
            <View style={{ flexDirection: 'row', height: '10%' }}>
                {/* <TouchableOpacity
                    onPress={() => Linking.openURL('https://aaludra.com/')}>
                    <Animated.Image source={require('../assets/Image/aaludra.png')}
                        style={{ height: '70%', width: '100%', marginLeft: '17%', right: '10%', opacity: fadeAnim, }} />
                </TouchableOpacity> */}
                <Animated.Text
                    style={{
                        fontSize: 35,
                        marginLeft: '37%',
                        top: '3%',
                        fontWeight: 'bold',
                        color: '#46b7f0',
                        opacity: fadeAnim,
                    }}>
                    atNews
                </Animated.Text>

                {/* <Text style={{ marginTop: '12%', right: '60%' }}>
                    powered by
                </Text>
                <TouchableOpacity style={{ marginTop: '16%', right: '80%' }}
                    onPress={() => Linking.openURL('https://www.instagram.com/')} >
                    <Text style={{ fontWeight: 'bold' }}>
                        ATS
                    </Text>
                </TouchableOpacity> */}
            </View>
            <View
                style={{ height: '5%', flexDirection: 'row', borderRadius: 5 }}>
                <TouchableOpacity
                    style={styles.headertextview}
                    onPress={() => handleButtonPress("Menu")}>
                    <MaterialCommunityIcons name="menu" size={20} style={{ top: '30%' }} />
                </TouchableOpacity>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ width: '180%' }}>

                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Trending");
                            handleButtonPress('Trending');
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("Trending")]}>
                            Trending
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Breaking News");
                            handleButtonPress('Breaking News')
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("Breaking News")]}>
                            Breaking News
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Live");
                            handleButtonPress('*Live News')
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("*Live News")]}>
                            Live News
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("cricket");
                            handleButtonPress('#WorldCup');
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("#WorldCup")]}>
                            #World Cup
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Photos");
                            handleButtonPress('Photos');
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("Photos")]}>
                            Photos
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Videos");
                            handleButtonPress('Videos');
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("Videos")]}>
                            Videos
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headertextview}
                        onPress={() => {
                            handleCategorySelect("Movies");
                            handleButtonPress('Movies');
                        }}>
                        <Text
                            style={[styles.headertest, buttonStyle("Movies")]}>
                            Movies
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{ marginTop: '5%', marginBottom: '45%' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={searchQuery ? filteredData : newsData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
            <View
                style={{ flexDirection: 'row', height: '15%' }}>
                <TouchableOpacity
                    style={{ bottom: '42%', marginLeft: '10%' }}>
                    <AntDesign name="home" size={25} color="#1cafed" />
                    <Text
                        style={{ fontSize: 12, fontWeight: 'bold', color: '#000000', right: '5%' }}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ bottom: '42%', marginLeft: '25%' }}
                    onPress={Settings}>
                    <AntDesign name="play" size={24} color="#1cafed" />
                    <Text
                        style={{ fontSize: 12, fontWeight: 'bold', color: '#000000', right: '20%' }}>
                        News
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={press}
                    style={{ bottom: '42%', marginLeft: '25%' }}>
                    <MaterialCommunityIcons name="account" size={25} color="#1cafed" />
                    <Text
                        style={{ fontSize: 12, fontWeight: 'bold', color: '#000000', right: '10%' }}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: '3%',
        padding: '3%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '2%',
        color: '#000000'
    },
    description: {
        fontSize: 16,
        // marginBottom: '4%',
    },
    date: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: '2%',
        opacity: 0.5
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: '4%',
    },
    headertextview: {
        marginLeft: '5%',
    },
    headertest: {
        fontWeight: 'bold',
        color: '#000000',
        top: '30%'
    },
    drawer: {
        position: 'absolute',
        width: '70%',
        height: 822,
        backgroundColor: '#FFFFFF',
        zIndex: 999,
        padding: 16,
        borderRadius: 10,
    },
    closeButton: {
        marginBottom: 16,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 18,
        color: 'blue',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 998,
    },
    drawertext: {
        marginLeft: '7%',
        color: '#000000'
    }
});

