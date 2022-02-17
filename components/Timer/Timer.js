import { Text } from "react-native-elements";
import { View } from "react-native";
import { useEffect, useState } from "react";
import styles from "./TimerStyles";
import { Button } from "react-native-elements/dist/buttons/Button";
export default function Timer(props) {
  const currentDate = new Date().getTime();
  const RaceDate = new Date(props.date + "T" + props.time).getTime();
  var offSetSeconds = (RaceDate - currentDate) * 0.001; // Millisecond to second

  const [day, setDays] = useState(0.1);
  const [hours, setHours] = useState(0.1);
  const [minutes, setMinutes] = useState(0.1);
  const [seconds, setSeconds] = useState(0.1);
  const [showLive, setLive] = useState(false);

  useEffect(() => {
    if (offSetSeconds > 0) {
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
            <Text style={styles.TextB} h2>
              {day}
            </Text>
            <Text style={styles.Text}>Days</Text>
          </View>
          <View style={styles.Time}>
            <Text style={styles.TextB} h2>
              {hours}
            </Text>
            <Text style={styles.Text}>Hours</Text>
          </View>

          <View style={styles.Time}>
            <Text style={styles.TextB} h2>
              {minutes}
            </Text>
            <Text style={styles.Text}>Minutes</Text>
          </View>
          <View style={styles.Time}>
            <Text style={styles.TextB} h2>
              {seconds}
            </Text>
            <Text style={styles.Text}>Seconds</Text>
          </View>
        </View>
      ) : (
        <View>
            <Button>Watch Live</Button>
        </View>
      )}
    </View>
  );
}
