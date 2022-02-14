import Axios from "axios";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import XMLParser from "react-xml-parser";
import Gradient from "../../components/Gradient/gradient";
import Logo from "../../components/Logo/Logo";
import { useEffect } from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";

export default function Schedule({ navigation }) {
  const year = new Date().getFullYear();
  
  useEffect(() => {
    Axios.get("https://ergast.com/api/f1/2022").then((response)=>{
      const schedule = new XMLParser().parseFromString(response["data"]);
      console.log(schedule)
    })
  }, [])

  return (
    <ParallaxScrollView
    backgroundColor="red"
      parallaxHeaderHeight={1}
      stickyHeaderHeight={70}
      renderStickyHeader={() => (
        <View
          style={{
            height: 70,
            marginTop: 30,
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "#eee",
              fontFamily: "TitilliumWeb_700Bold",
              fontSize: 17,
            }}
          >
            {year} Schedule
          </Text>
        </View>
      )}
    ></ParallaxScrollView>
  );
}
