import homeStyles from './styles';
import {Pressable, View} from "react-native"
import Gradient from '../../components/Gradient/gradient';
import Logo from '../../components/Logo/Logo';
import Banner from '../../components/Banner/Banner';
import { Text,Button,Icon,Card} from 'react-native-elements';
import { useState } from 'react';
import DriversTable from '../../components/DriversTable/Table'; 
import ConsTable from '../../components/ConsTable/Table';

export default function Home({navigation}){
    const [close, showDriver] = useState(true)
    var data={
        RaceName:"Sakhir Grand Prix",
        RaceDate:"4th January 2022 9:30AM IST",
    } 
    
   
    return(
        <View style={{width:"100%",height:"100%",backgroundColor:"#FFF"}}>
            
            <Gradient styles={{height:"42%"}}>
                 <Logo/>
                 <Banner RaceName="Gulf Air Baharain Grand Prix" Date="26th January 2022 9:30 PM IST" />
                 <Button 
                    title={<CalendarTitle/>}
                    buttonStyle={homeStyles.calendarButtonStyles}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                      }}
                      iconRight
                    ></Button>     
            </Gradient>

            <View style={{flexDirection:"row"}}>
                <Pressable style={homeStyles.tableButton} onPress={()=>{showDriver(false)}}><Text style={[homeStyles.unselected,!close ? homeStyles.selected:homeStyles.unselected]}>CONSTRUCTOR</Text></Pressable>
                <Pressable style={homeStyles.tableButton} onPress={()=>{showDriver(true)}}><Text style={[homeStyles.unselected,close?homeStyles.selected:homeStyles.unselected]}>DRIVERS</Text></Pressable>
            </View>
            {close ? <DriversTable  topThree={true}/>:<ConsTable topThree={true}/> }
            <View style={{width:"100%",borderRadius:50,alignItems:"center",marginTop:10}}>
                <Button onPress={()=>{navigation.navigate("Standings")}} title={<RaceTitle/>} buttonStyle={homeStyles.raceButtonStyles} icon={{name: 'arrow-right',type: 'font-awesome',size: 10,color: '#000'}} iconRight></Button> 
            </View>
            <Card>
                <Card.Title style={homeStyles.cardStyles}>Last Race</Card.Title>
                <Card.Divider color="#F30000" />
                <Text style={{fontFamily: 'TitilliumWeb_700Bold',fontSize:22}}>{data.RaceName}</Text>
                
                <Text style={{fontFamily:"TitilliumWeb_300Light"}}>{data.RaceDate}</Text>
                <View style={{flexDirection:"column"}}>
                    <View style={{marginTop:20}}>
                        <View style={homeStyles.podiumW}>
                            <View style={{width:"70%"}}>
                                <Text style={{width:"60%",fontFamily: 'TitilliumWeb_700Bold',color:"#eee"}}><Text style={{fontFamily: 'TitilliumWeb_700Bold',color:"#eee"}}>1.</Text> VERSTAPPEN</Text>
                            </View>
                            <View>
                                <Text style={{fontFamily: 'TitilliumWeb_300Light_Italic',color:"#eee"}}>+1:23:22</Text>
                            </View>
                        </View>
                        <View style={homeStyles.podium}>
                            <View style={{width:"70%"}}>
                                <Text style={{width:"60%"}}><Text>2.</Text> HAMILTON</Text>
                            </View>
                            <View>
                                <Text>+1s</Text>
                            </View>
                        </View>
                        <View style={homeStyles.podium}>
                            <View style={{width:"70%"}}>
                                <Text style={{width:"60%"}}><Text>3.</Text> NORRIS</Text>
                            </View>
                            <View>
                                <Text>+2.3s</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}
const CalendarTitle = () =>{
    return(
    <View style={{ flexDirection: 'row',alignContent:"center",alignItems:"center"}}>
        <Icon name='calendar' color="#eee" type='ionicon' style={{paddingRight:10}} />
        <Text style={{color:"#eee", fontFamily: 'TitilliumWeb_700Bold'}}>Check out the Full Race Schedule </Text>
    </View>)
}
const RaceTitle = () =>{
    return(
    <View style={{ flexDirection: 'row',alignContent:"center",alignItems:"center"}}>
        <Text style={{color:"#000", fontFamily: 'TitilliumWeb_400Regular'}}>SEE FULL STANDINGS </Text>
    </View>)
}