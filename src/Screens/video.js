// import React from "react";
// import { FlatList, View, Text,SafeAreaView } from "react-native";
// import { Card } from "react-native-paper";
// import Video from 'react-native-video';
// import AntDesign from "react-native-vector-icons/AntDesign";


// const Videos = () => {
//     const data = [
//         {
//             id: 1,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//             time: 4
//         },
//         {
//             id: 2,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//             time: 4
//         },
//         {
//             id: 3,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//             time: 4
//         },
//         {
//             id: 4,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//             time: 4
//         },
//         {
//             id: 5,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//             time: 4
//         },
//         {
//             id: 6,
//             url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//             time: 4
//         },
//     ];

//     const renderItem = ({ item }) => {
//         return (
//             <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
//             <View style={{padding:20, backgroundColor:'#FFFFFF',marginTop:'5%'}}>
//             <Card contentStyle={{padding:20,backgroundColor:'#FFFFFF',}}>
//                 <Text>Video ID: {item.id}</Text>

//                 <Video
//                     source={{uri: item.url}}
//                     style={{width: '100%', height: 200,}}
//                     controls={true}
//                     // paused={true}

//                 />
//                 <Text>Time: {item.time} minutes</Text>
//             </Card>
//             </View>
//             </SafeAreaView>
//         );
//     };

//     return (
//         <FlatList
//             data={data}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderItem}
//         />
//     );
// };

// export default Videos;




import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text, ToastAndroid } from "react-native";
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import Share from 'react-native-share';



const Videos = (item, index) => {

    const [savedItems, setSavedItems] = useState([]);

    const videosData = [
        { imageSource: require('../assets/Image/news1.gif') },
        { imageSource: require('../assets/Image/news6.gif') },
        { imageSource: require('../assets/Image/news3.gif') },
        { imageSource: require('../assets/Image/news4.gif'), },
        { imageSource: require('../assets/Image/news2.gif') },
        { imageSource: require('../assets/Image/news5.gif') },
    ];

    const handleShare = async (item) => {
        try {
            const options = {
                title: 'Share WITH',
                message: 'Hi ',
                url: item.imageSource.uri,
                type: 'image/gif',
            };
            await Share.open(options);
        } catch (error) {
            if (error.message === 'User did not share') {
                console.log('User cancelled the sharing action');
            } else {
                console.error('Error sharing:', error);
            }
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
    return (
        <SafeAreaView
            style={{ flex: 1 }}>
            <ScrollView>
                <View
                    style={{ marginTop: '10%', padding: '5%' }}>
                    {videosData.map((item, index) => (
                        <Card
                            key={index}
                            contentStyle={{ padding: '3%' }}
                            style={{ marginBottom: '8%', borderRadius: 15 }}>
                            <Image
                                source={item.imageSource}
                                style={{ width: '99%' }} />
                            <TouchableOpacity>
                                <View
                                    style={{ flexDirection: 'row', marginTop: '2%', marginLeft: '80%' }}>
                                    <TouchableOpacity
                                        style={{ right: '80%' }}
                                        onPress={() => handleShare(item)}>
                                        <Icon name="share" size={20} color="#000000" />
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
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Videos;