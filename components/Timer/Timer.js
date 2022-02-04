import { Text } from 'react-native-elements';
import { View } from 'react-native';
import styles from "./TimerStyles"
import { useFonts, TitilliumWeb_400Regular,TitilliumWeb_700Bold} from "@expo-google-fonts/titillium-web"

export default function Timer(props){
    let [fontsLoaded] = useFonts({ TitilliumWeb_400Regular,TitilliumWeb_700Bold });
    if(!fontsLoaded){
        return null
    }
    else{
        return(
            <View style={styles.Timer}>
                {/* Days */}
                <View style={styles.Time}>
                    <Text style = {styles.TextB} h2 >2</Text>
                    <Text style = {styles.Text}>Days</Text>
                </View>
                {/* Hours */}
                <View style={styles.Time}>
                    <Text style = {styles.TextB} h2 >12</Text>
                    <Text style = {styles.Text}>Hours</Text>
                </View>
                {/* Minutes */}
                <View style={styles.Time}>
                    <Text style = {styles.TextB} h2 >23</Text>
                    <Text style = {styles.Text}>Minutes</Text>
                </View>
                {/* Seconds */}
                <View style={styles.Time}>
                    <Text style = {styles.TextB} h2 >21</Text>
                    <Text style = {styles.Text}>Seconds</Text>
                </View>

            </View>
        )   
    }
}