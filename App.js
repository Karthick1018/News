import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import React, { useEffect, useState } from "react";
import Navigator from "./root";
import themeContext from "./src/config/themecontext";
import theme from "./src/config/theme";
import { DefaultTheme } from "react-native-paper";

const App = () => {
  const [mode, setMode] = useState(false)

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener("changeTheme", eventListener);
    }
  })
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <Navigator />
      </NavigationContainer>
    </themeContext.Provider>
  )
}
export default App;