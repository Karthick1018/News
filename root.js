import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Splash from "./src/Screens";
import Home from "./src/Screens/home";
import Profile from "./src/Screens/profile";
import Content from "./src/Screens/content";
import Videos from "./src/Screens/video";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Content" component={Content} options={{headerShown:false}}/>
            <Stack.Screen name="Video" component={Videos} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default Navigator;