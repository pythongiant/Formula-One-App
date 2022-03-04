import Axios from "axios";
import XMLParser from "react-xml-parser";
import Logo from "../../components/Logo/Logo";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Sticky from "../../components/StickyHeader/sticky";
import LastRace from "../../components/LastRace/lastRace";

export default function Schedule({ navigation }) {
  const [done,setDone] = useState(false)
  const DATA = [{i:-1,"title":"Next Race","link":"https://ergast.com/api/f1/current/next","timer":true}]
  useEffect(() => {
    Axios.get("https://ergast.com/api/f1/current").then((response)=>{
      const schedule = new XMLParser().parseFromString(response["data"]);
      const races = schedule.getElementsByTagName("Race")

      // Through Schedule get the date if the date is greater than today then just do the necessary logic
      races.forEach((element,i) => {
        const date = new Date (element.getElementsByTagName("Date")[0]["value"]).getTime()
        const right_now = new Date().getTime()
        if (date < right_now){
          
          DATA.push({"i":element["attributes"]["round"],"title":"Round "+(i+1),"link":"https://ergast.com/api/f1/current/"+(i+1)+"/results","timer":false})
        }else{
          DATA.push({"i":element["attributes"]["round"],"title":"Round "+(i+1),"link":"https://ergast.com/api/f1/current/"+(i+1),"timer":false})
      }});
    }).finally(()=>{
        console.log("done")
        setDone(true)
    })
  }, [DATA])

  return (
    <View style={{flex: 1}}>
    <Sticky style={{backgroundColor:"#232526"}}><Logo/></Sticky>
     <FlatList 
    initialNumToRender={3} keyExtractor={item=>item.i} data={DATA} renderItem={({item})=>(
      
      <LastRace key={item.i+1000} navigation={navigation} title={item.title} link={item.link} timerT ={item.timer}/>
    )}/>
     
    </View>
  );
}
