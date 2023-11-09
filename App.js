import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigator from "./root";

const App=()=>{
  return(
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
    )
}
export default App;