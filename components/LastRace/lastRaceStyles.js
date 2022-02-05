var React = require('react-native'); var { Dimensions } = React; var {width, height} = Dimensions.get('window');
import {StyleSheet} from "react-native"

const vw = width/100
const vh = height/100


export default StyleSheet.create({
    raceButtonStyles:{backgroundColor:"#FFF",borderColor:"#000",borderWidth:0.5,width:"50%"},
    cardStyles:{textAlign:"left", fontWeight:"bold", color:"#000", marginBottom:5},
    podiumW:{
        padding:7,
        fontFamily: 'TitilliumWeb_700Bold',
        flexDirection:"row",
        color:"#eee",
        backgroundColor:'#F30000',
        borderRadius:5
    },
    podium:{
        padding:7,
        color:"#000",
        fontFamily: 'TitilliumWeb_400Regular',
        flexDirection:"row",
        
    },
    
})