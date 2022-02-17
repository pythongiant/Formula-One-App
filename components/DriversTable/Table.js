import {FlatList, View} from "react-native"
import {
    ListItem,Text,
} from 'react-native-elements';
import { useState,useEffect } from 'react';
import XMLParser from "react-xml-parser";
import Axios from "axios";
import Loading from "../Loading/loading";

export default function DriversTable(props){

  const [ ConsList,setConsList] = useState([])
  const [done,setDone] = useState(false)

  useEffect(() => {
    
    Axios.get("https://ergast.com/api/f1/current/driverStandings").then(
      (response)=>{ 
        
        const xml = new XMLParser().parseFromString(response["data"])
        const drivers = xml.getElementsByTagName("DriverStanding");
        const constructors = xml.getElementsByTagName("Constructor")
        if (props.topThree){
          drivers.splice(3)
        }
        drivers.forEach((element,i) => {
            const name = element.getElementsByTagName("GivenName")[0]["value"] +" "+(element.getElementsByTagName("FamilyName")[0]["value"]).toUpperCase()
            const position = element["attributes"]["position"]
            const points = element["attributes"]["points"]
            const constructor = constructors[i].getElementsByTagName("Name")[0]["value"]
            callback([position,points,name,constructor])  
        });
        
      }).then(()=>{
        setDone(true)
      }).catch(error=>{
          setDone(false)
          console.log(error)
      })
      function callback(l){
        setConsList(ConsList=>[...ConsList,l].sort((a,b)=>a[0]-b[0]))
        
      }
    }, [])
  return(
  <View style={!props.topThree ? {flex:1} : {}}>
    {done ? 
    <View >
        <FlatList 
        data = {ConsList}
        
        renderItem={({ item })=>(
        
        <ListItem key={item[0]} bottomDivider>
          <Text style={{fontFamily:'TitilliumWeb_400Regular'}}>{item[0]}</Text>
          <ListItem.Content>
            <ListItem.Title style={{fontFamily:"TitilliumWeb_700Bold"}}>
              {item[2]}
            </ListItem.Title>
            <ListItem.Subtitle style={{fontFamily:'TitilliumWeb_300Light'}}>{item[3]}</ListItem.Subtitle>
            </ListItem.Content>
          <ListItem.Content right>
              <Text style={{fontFamily:'TitilliumWeb_400Regular'}}>{item[1]} PTS</Text>
          </ListItem.Content>
        </ListItem>
        )}
        keyExtractor={item=>item[0]}
      />
      </View>
      :
      <Loading/>
    }
  </View>
  )
}
