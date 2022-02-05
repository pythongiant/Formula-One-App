import homeStyles from './styles';
import {Pressable, View,ScrollView} from "react-native"
import Gradient from '../../components/Gradient/gradient';
import Logo from '../../components/Logo/Logo';
import Banner from '../../components/Banner/Banner';
import { Text,Button,Icon} from 'react-native-elements';
import { useState } from 'react';
import DriversTable from '../../components/DriversTable/Table'; 
import ConsTable from '../../components/ConsTable/Table';
import LastRace from "../../components/LastRace/lastRace"

export default function Home({navigation}){
    const [close, showDriver] = useState(true)
    
   
    return(
    <ScrollView>
        <View style={{backgroundColor:"#FFF"}}>
            
            <Gradient>
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
            
            <LastRace navigation={navigation}/>
        </View>
        </ScrollView>
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
        <Text style={{color:"#000", fontFamily: 'TitilliumWeb_400Regular',marginRight:5}}>SEE FULL STANDINGS </Text>
    </View>)
}
