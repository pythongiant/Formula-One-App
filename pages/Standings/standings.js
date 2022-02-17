import Gradient from '../../components/Gradient/gradient';
import {Text,Button,Image,Icon} from 'react-native-elements';
import {useState} from 'react';
import DriversTable from '../../components/DriversTable/Table'; 
import ConsTable from '../../components/ConsTable/Table';
import {View,Pressable} from 'react-native';
import homeStyles from '../Home/styles';
import Sticky from '../../components/StickyHeader/sticky';
import {CarStore} from '../TokenProvider';
import Logo from '../../components/Logo/Logo';

var image = require("../../result.json")


export default function Standings({navigation}){
    
    const [close, showDriver] = useState(true)
    const selected=CarStore.useState(s=>s.index)
    
    return(
      <View style={{width:"100%",height:"100%",backgroundColor:"#fff"}}>
          <Gradient>
          <Sticky><Logo/></Sticky>
      {!close? 
        <View style={{width:"100%",borderRadius:50,alignItems:"center"}}>
            
                <Text style={{fontFamily:"TitilliumWeb_700Bold",color:"#eee",width:"50%",textAlign:"center",fontSize:20,marginTop:20}}>{selected}</Text>
                <Image style={{ height:150 ,width: 200,resizeMode:"contain"} } source={{uri:"https://www.formula1.com"+image.src[image.team.indexOf(selected.replace(" F1 Team",""))]}} placeholderStyle={{backgroundColor:"none"}} PlaceholderContent={<Image source={require("../../assets/placeholder.png")} style={{ height:150 ,width: 200,resizeMode:"contain"} }/>}/>
            
        </View>
          :
          <View>
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
