var React = require('react-native'); var { Dimensions } = React; var {width, height} = Dimensions.get('window');
import {StyleSheet} from "react-native"

const vw = width/100
const vh = height/100


export default StyleSheet.create({
    logo:{
        marginTop:30,
        marginLeft:10,
        width:20*vw,
        height:5*vh
    }
})