import { Image } from 'react-native-elements';
import {StyleSheet} from "react-native"
import logoStyles from './LogoStyles';


export default function Logo(){

    return(
        <Image source={require("../../assets/f1logo.png")} style={logoStyles.logo}  />
    )
}