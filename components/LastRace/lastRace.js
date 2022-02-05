import { Text,Button,Card} from 'react-native-elements';
import { View} from "react-native";
import lastRaceStyles from "./lastRaceStyles"
import Axios from 'axios';
import XMLParser from "react-xml-parser";
import {useEffect,useState } from "react"

export default function LastRace({navigation}){
    const [RaceData,setRaceData] = useState({})
    const [done,setDone] = useState(false)

    var [winner,setWinner] =useState([])
    
    
    
    useEffect(() => {
        Axios.get("https://ergast.com/api/f1/current/last/results").then(
            (response)=>{ 
        
              const schedule = new XMLParser().parseFromString(response["data"]);
              const Name = schedule.getElementsByTagName("RaceName")[0]["value"]
              const Date = schedule.getElementsByTagName("Date")[0]["value"]
              const Time = schedule.getElementsByTagName("Race")[0]["children"][3]["value"]
              

              setRaceData({
                  RaceName:Name,
                  RaceDate:Date,
                  RaceTime:Time
              })
              var Result =  schedule.getElementsByTagName("Result")
              Result.splice(3);
              Result.forEach((element,i)=>{
                  
                //   const points = element["attributes"]["points"]
                  const FullName = element.getElementsByTagName("GivenName")[0]["value"]+" "+element.getElementsByTagName("FamilyName")[0]["value"]
                //   const code = element["children"][0]["attributes"]["code"]
                  const time = element.getElementsByTagName("Time")
                 
                  typeof time[0] != "undefined" ? callback({name:FullName,time:time[0]["value"]}) : callback({name:FullName,time:"DNF"})
              })
    
            //   res.forEach(element => {})
            
            }).then(()=>{
                setDone(true)
                
            }).catch(error=>{
                console.log(error)
            })
            function callback(l){
                // console.log(winner)
                  setWinner(winner =>[...winner,l])
            }
    }, [])

    return(
        <Card>
                <Card.Title style={lastRaceStyles.cardStyles}>Last Race</Card.Title>
                <Card.Divider color="#F30000" />
                <Text style={{fontFamily: 'TitilliumWeb_700Bold',fontSize:22}}>{RaceData.RaceName}</Text>
                
                <Text style={{fontFamily:"TitilliumWeb_300Light"}}>{RaceData.RaceDate} {RaceData.RaceTime}</Text>
                <View style={{flexDirection:"column"}}>
                    <View style={{marginTop:20}}>
                    {winner.map((o,i) => 
                    <View key={i} style={(i == 0) ? lastRaceStyles.podiumW:lastRaceStyles.podium}>
                        <View style={{width:"70%"}}>
                            <Text style={!(i == 0) ? lastRaceStyles.podium: lastRaceStyles.podiumW}>
                                <Text style={!(i == 0) ? lastRaceStyles.podium: lastRaceStyles.podiumW}>{i+1}.</Text> {o.name}</Text>
                        </View>
                        <View style={{width:"30%"}}>
                            <Text style={!(i == 0) ? {fontFamily: 'TitilliumWeb_300Light_Italic',padding:7}: {fontFamily: 'TitilliumWeb_300Light_Italic',padding:7,color:"#eee"}}>{o.time}</Text>
                        </View>
                    </View>

                    )}
                    
                        <View style={{width:"100%",borderRadius:50,alignItems:"center",marginTop:10}}>
                            <Button onPress={()=>{navigation.navigate("Standings")}} title={<RaceResult/>} buttonStyle={lastRaceStyles.raceButtonStyles} icon={{name: 'arrow-right',type: 'font-awesome',size: 10,color: '#000'}} iconRight></Button> 
                        </View>
                    </View>
                </View>
        </Card>
            
)}

const RaceResult = () =>{
    return(
    <View style={{ flexDirection: 'row',alignContent:"center",alignItems:"center"}}>
        <Text style={{color:"#000", fontFamily: 'TitilliumWeb_400Regular',marginRight:5}}>SEE FULL RESULT</Text>
    </View>)
}