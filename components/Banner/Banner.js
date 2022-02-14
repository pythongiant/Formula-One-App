import { View } from "react-native";
import Timer from "../Timer/Timer";
import { Text } from 'react-native-elements';
import style from "./BannerStyles"

export default function Banner(props){
        return(
            <View style={[style.Banner,props.style]}>
                <Text style={style.text}>Next Race: <Text style={style.boldText}>{props.RaceName}</Text></Text>
                <Text style={style.text}>Date: <Text style= {style.boldText}> {props.Date}</Text></Text>
                
                <Timer date="2022-02-14" time="18:35:00"/>
            </View>
        )
    
}