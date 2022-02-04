import Gradient from '../../components/Gradient/gradient';
import Logo from '../../components/Logo/Logo';
import { Text,Button,Image,Icon} from 'react-native-elements';
import { createContext, useState } from 'react';
import DriversTable from '../../components/DriversTable/Table'; 
import ConsTable from '../../components/ConsTable/Table';
import { View,Pressable,ActivityIndicator  } from 'react-native';
import homeStyles from '../Home/styles';
import Banner from '../../components/Banner/Banner';

var image = require("../../result.json")


export default function Standings({navigation}){
    console.log(image)
    const [close, showDriver] = useState(true)
    const [selected,changeDriver]=useState(0)
    
    return(
      <View style={{width:"100%",height:"100%",backgroundColor:"#fff"}}>
          <Gradient>
          <Pressable  onPress={()=>{navigation.navigate("Home")}}><Text style={{marginTop:30,marginLeft:10,paddingBottom:10,fontFamily:"TitilliumWeb_300Light",color:"#Eee"}}>Back</Text></Pressable>
              
      {!close? 
        <View style={{width:"100%",borderRadius:50,alignItems:"center"}}>
            <Text style={{fontFamily:"TitilliumWeb_700Bold",color:"#eee",width:"50%",textAlign:"center",fontSize:20,marginTop:20}}>{image.team[selected]}</Text>
            <Image style={{ height:150 ,width: 200,resizeMode:"contain"} } source={{uri:"https://www.formula1.com"+image.src[selected]}} PlaceholderContent={<ActivityIndicator />}/>
            
        </View>
          :
          <View>
              <Banner style={{marginTop:10}} RaceName="Gulf Air Baharain Grand Prix" Date="26th January 2022 9:30 PM IST" />
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
          </View>
          }
          </Gradient>
          
          <View style={{flexDirection:"row"}}>
              <Pressable style={homeStyles.tableButton} onPress={()=>{showDriver(false)}}><Text style={[homeStyles.unselected,!close ? homeStyles.selected:homeStyles.unselected]}>CONSTRUCTOR</Text></Pressable>
              <Pressable style={homeStyles.tableButton} onPress={()=>{showDriver(true)}}><Text style={[homeStyles.unselected,close?homeStyles.selected:homeStyles.unselected]}>DRIVERS</Text></Pressable>
          </View>           
          {close ? <DriversTable/>:<ConsTable/> }
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
