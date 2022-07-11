import { Text } from "react-native-elements";
import { View,Linking } from "react-native";
import { useEffect, useState } from "react";
import styles from "./TimerStyles";
import { Button } from "react-native-elements/dist/buttons/Button";
import { CarStore } from "../../pages/TokenProvider";
export default function Timer(props) {
  var RaceDateT = CarStore.useState(s=>s.nextRaceDate)
  var RaceTimeT = CarStore.useState(s=>s.nextRaceTime).replace("Z","");
  const RaceDate = new Date(
    RaceDateT + "T" + RaceTimeT.replace("Z", "")
  ).getTime()
  const currentDate = new Date().getTime();
  var offSetSeconds = (RaceDate - currentDate) * 0.001; // Millisecond to second

  const [day, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showLive, setLive] = useState(false);

  useEffect(() => {
    if (offSetSeconds >= 0) {
      const interval = setInterval(() => {
        offSetSeconds -= 1;
        var days = offSetSeconds / (3600 * 24); // Change to Days
        var hour = (days % 1) * 24; // %1 finds the decminals
        var minute = (hour % 1) * 60;
        var second = (minute % 1) * 60;

        setDays(Math.floor(days));
        setHours(Math.floor(hour));
        setMinutes(Math.floor(minute));
        setSeconds(Math.floor(second));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setLive(true);
    }
  }, []);
  return (
    <View>
      {!showLive ? (
        <View style={styles.Timer}>
          <View style={styles.Time}>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]} h2>
              {day}
            </Text>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]}>Days</Text>
          </View>
          <View style={styles.Time}>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]} h2>
              {hours}
            </Text>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]}>Hours</Text>
          </View>

          <View style={styles.Time}>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]} h2>
              {minutes}
            </Text>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]}>Minutes</Text>
          </View>
          <View style={styles.Time}>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]} h2>
              {seconds}
            </Text>
            <Text style={!props.B ? [styles.Text,styles.TextB]:[styles.Text,styles.TextW]}>Seconds</Text>
          </View>
        </View>
      ) : (
        <View>
            <Button onPress={()=>{Linking.openURL("https://www.formula1.com/en/subscribe-to-f1-tv.html#en-IN")}} title="Watch Live " buttonStyle={{
                  backgroundColor: '#eee',
                  width:100,
                  borderRadius: 20,
                }}
                icon={{
                  name: 'tv',
                  type: 'font-awesome',
                  size: 12,
                  color: 'black',
                }}
                titleStyle={{
                  fontSize:12,
                  color:"#000",
                  fontFamily:"TitilliumWeb_400Regular"
                }} />
        </View>
      )}
    </View>
  );
}
