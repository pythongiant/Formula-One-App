import Axios from "axios";
import XMLParser from "react-xml-parser";
import Logo from "../../components/Logo/Logo";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import Sticky from "../../components/StickyHeader/sticky";
import LastRace from "../../components/LastRace/lastRace";

export default function Schedule({ navigation }) {
  const year = new Date().getFullYear();
  
  useEffect(() => {
    Axios.get("https://ergast.com/api/f1/2022").then((response)=>{
      const schedule = new XMLParser().parseFromString(response["data"]);
      console.log(schedule)
    })
  }, [])

  return (
    <View style={{flex: 1}}>
    <Sticky style={{backgroundColor:"#232526"}}><Logo/></Sticky>
    <FlatList data={[{},{},{}]} renderItem={()=>( <LastRace navigation={navigation} link="https://ergast.com/api/f1/current/last/results"/>)}/>
     
    </View>
  );
}
