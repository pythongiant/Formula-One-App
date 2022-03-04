import { View } from "react-native";
import Timer from "../Timer/Timer";
import { Text } from 'react-native-elements';
import style from "./BannerStyles"
import { CarStore } from "../../pages/TokenProvider";

export default function Banner(props){
    const RaceName = CarStore.useState(s=>s.nextRaceName)
    var RaceDateT = CarStore.useState(s=>s.nextRaceDate)
    var RaceTimeT = CarStore.useState(s=>s.nextRaceTime).replace("Z","");
    const DateObject = new Date(new Date(
        RaceDateT + "T" + RaceTimeT.replace("Z", "")
      ).getTime());
    const RaceDate = DateObject.toDateString()
    const RaceTime = DateObject.toLocaleTimeString()
        return(
            <View style={[style.Banner,props.style]}>
                <Text style={style.text}>Next Race: <Text style={style.boldText}>{RaceName}</Text></Text>
                <Text style={style.text}>Date: <Text style= {style.boldText}>{RaceDate} at {RaceTime}</Text></Text>
                
                <Timer/>
            </View>
        )
    
}