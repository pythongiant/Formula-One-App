import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./pages/Home/Home";
import standings from "./pages/Standings/standings";
import raceStandings from "./pages/RaceResult/RaceRes";
import Schedule from "./pages/Schedule/schedule";
import { useEffect,useState } from "react";
import Axios from "axios";
import { CarStore } from "./pages/TokenProvider";
import XMLParser from "react-xml-parser";


import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  TitilliumWeb_400Regular,
  TitilliumWeb_700Bold,
  TitilliumWeb_600SemiBold,
  TitilliumWeb_300Light_Italic,
  TitilliumWeb_300Light,
} from "@expo-google-fonts/titillium-web";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  const [done, setdone] = useState(false)
  useEffect(() => {
    
    Axios.get("https://ergast.com/api/f1/current/next").then((response) => {
      const schedule = new XMLParser().parseFromString(response["data"]);
      CarStore.update(s=>{
        s.nextRaceName = schedule.getElementsByTagName("RaceName")[0]["value"];
        s.nextRaceTime=schedule.getElementsByTagName("Time")[0]["value"];
        s.nextRaceDate = schedule.getElementsByTagName("Date")[0]["value"];
      })
    }).finally(()=>{
      setdone(true)
    });
  }, [CarStore]);
  

  let [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_600SemiBold,
    TitilliumWeb_700Bold,
    TitilliumWeb_300Light,
    TitilliumWeb_300Light_Italic,
  });
  if (!fontsLoaded) {
    console.log("loading fonts");
    return null;
  } else {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <StatusBar style="light" />

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home", headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Standings"
              component={standings}
              options={{ title: "Standings", headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="RaceRes"
              component={raceStandings}
              options={{ title: "Race Standings", headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Schedule"
              component={Schedule}
              options={{ title: "Race Schedule", headerShown: false }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
