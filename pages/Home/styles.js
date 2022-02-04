var React = require('react-native'); var { Dimensions } = React; var {width, height} = Dimensions.get('window');
import {StyleSheet} from "react-native"

const vw = width/100
const vh = height/100


export default StyleSheet.create({
    calendarButtonStyles:{backgroundColor:"#F30000" ,marginLeft:20,marginBottom:20,marginRight:20, borderRadius:10,width:"80%"},
    raceButtonStyles:{backgroundColor:"#FFF",borderColor:"#000",borderWidth:0.5,width:"50%"},
    cardStyles:{textAlign:"left", fontWeight:"bold", color:"#000", marginBottom:5},
    podiumW:{
        padding:7,
        flexDirection:"row",
        backgroundColor:'#F30000',
        borderRadius:5
    },
    podium:{
        padding:7,
        flexDirection:"row",
    },
    tableButton:{
        width:"50%",
        textAlign:"center",
        alignContent:"center",
        alignItems:"center",
        padding:15,
        borderColor:"#B0B0B0",
        borderStyle:"solid",
        borderBottomWidth:0.5,
        borderRightWidth:0.5
    },
    selected:{fontFamily:"TitilliumWeb_400Regular",color:"#F30000",borderBottomColor:"#F30000",borderBottomWidth:1},
    unselected:{fontFamily:"TitilliumWeb_400Regular"}
    
})