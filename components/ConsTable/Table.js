import {FlatList, View} from "react-native"
import {
    ListItem,Text,
} from 'react-native-elements';
import { useState,useEffect } from 'react';
import XMLParser from "react-xml-parser";
import Axios from "axios";

export default function ConsTable(props){

  const [ ConsList,setConsList] = useState([])
  const [done,setDone] = useState(false)
  const [selectedKey,selectKey] = useState(1)

  useEffect(() => {
    var t = []
    Axios.get("https://ergast.com/api/f1/current/constructorStandings").then(
      (response)=>{ 
  
        const schedule = new XMLParser().parseFromString(response["data"]);
        const res = schedule["children"][0]["children"][0]["children"]
        
        res.forEach(element => {
          const position = element["attributes"]["position"]
          const points = element["attributes"]["points"]
          const consId = element["children"][0]["attributes"]["constructorId"]
          const Name = element["children"][0]["children"][0]["value"]
          
          const promises = Axios.get("https://ergast.com/api/f1/current/constructors/"+consId+"/drivers").then((mes)=>{
            const scheduleT = new XMLParser().parseFromString(mes["data"]);
            const tes = scheduleT["children"][0]["children"]
            var driver = ""
            tes.forEach((element,i) => {
              
              driver += element["children"][1]["value"]+" "+element["children"][2]["value"].toUpperCase()+" "
              
            })
            return driver
            }).then((p)=>{
              callback([position,points,Name,p])
            })
          
          });
        
      }).then(()=>{
        setDone(true)
      }).catch(error=>{
          setDone(false)
          console.log(error)
      })
      function callback(l){
        setConsList(ConsList=>[...ConsList,l].sort((a,b)=>a[0]-b[0]))
        if (props.topThree){
          setConsList(ConsList=>[...ConsList].slice(0,3))
        }
        console.log(l)
      }
    }, [])
  return(
  <View style={!props.topThree ? {flex:1} : {}}>
    {done ? 
    <View >
        <FlatList 
        data = {ConsList}
        
        renderItem={({ item })=>(
        
        <ListItem key={item[0]} onPress={()=>{selectKey(parseInt(item[0]))}} containerStyle={[(selectedKey==item[0]) ? {backgroundColor:"#F30000"}:{} ]} bottomDivider>
          <Text style={[(selectedKey==item[0]) ?  {color:"#eee"}:{},{fontFamily:'TitilliumWeb_400Regular'}]}>{item[0]}</Text>
          <ListItem.Content>
            <ListItem.Title style={[(selectedKey==item[0]) ? {color:"#eee"}:{},{fontFamily:"TitilliumWeb_700Bold"} ]}>
              {item[2]} 
            </ListItem.Title>
            <ListItem.Subtitle style={[(selectedKey==item[0]) ? {color:"#eee"}:{},{fontFamily:'TitilliumWeb_300Light'}]}>{item[3]}</ListItem.Subtitle>
            </ListItem.Content>
          <ListItem.Content right>
              <Text style={[(selectedKey==item[0]) ?  {color:"#eee"}:{},{fontFamily:'TitilliumWeb_400Regular'}]}>{item[1]} PTS</Text>
          </ListItem.Content>
        </ListItem>
        )}
        keyExtractor={item=>item[0]}
      />
      </View>
      :
      <View>
        <Text>Loading...</Text>
      </View>
    }
  </View>
  )
}