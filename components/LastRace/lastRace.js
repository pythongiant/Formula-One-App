// Race Result Summary Card

import { Text, Button, Card } from "react-native-elements";
import { View } from "react-native";
import lastRaceStyles from "./lastRaceStyles";
import Axios from "axios";
import XMLParser from "react-xml-parser";
import { useEffect, useState,useRef } from "react";
import Timer from "../Timer/Timer";
import { Flag } from "react-native-svg-flagkit";

export default function LastRace({ navigation, link, title, timerT }) {
  const RaceData = useRef({})
  const [done,setDone]=  useState(false)
  // var [winner, setWinner] = useState([]);
  const winners = useRef([])

  function callback(l) {
    console.log("rendered")
    winners.current=[...winners.current,l]
  }
  useEffect(() => {
        let mounted = true;
    Axios.get(link)
      .then((response) => {
        const schedule = new XMLParser().parseFromString(response["data"]);
        const Name = schedule.getElementsByTagName("RaceName")[0]["value"];
        const date = schedule.getElementsByTagName("Date")[0]["value"];
        var Time = schedule.getElementsByTagName("Time")[0]["value"];
        const DateObject = new Date(
          date + "T" + Time.replace("Z", "")
        ).getTime();

        Time = new Date(DateObject);
        if(mounted) {
        const resultObj =  {
          RaceName: Name,
          RaceTime: Time.toLocaleTimeString('en-US'),
          RaceDate: Time.toDateString(),
          RaceDateMonth:
            Time.getFullYear() + "/" + ("0" + (Time.getMonth() + 1)).slice(-2)+ "/" + Time.getDate(),
        }
        RaceData.current = resultObj
        var Result = schedule.getElementsByTagName("Result");
        Result.forEach((element, i) => {
          const points = element["attributes"]["points"];
          const FullName =
            element.getElementsByTagName("GivenName")[0]["value"] +
            " " +
            element.getElementsByTagName("FamilyName")[0]["value"];
          const code = element["children"][0]["attributes"]["code"];
          const time = element.getElementsByTagName("Time");
          const team = element.getElementsByTagName("Name")[0]["value"];
         
          typeof time[0] != "undefined"
            ? callback({ position: i + 1,
              name: FullName,
              time: time[0]["value"],
              code: code,
              points: points,
              team: team,})
            : callback({ position: i + 1,
              name: FullName,
              time: "DNF",
              code: code,
              points: points,
              team: team, });
        });

        //   res.forEach(element => {})
     
      } })
      .finally(() => {
        setDone(true);
        
      })
      .catch((error) => {
        console.log(error);
      });

    return () => mounted = false;
  }, [winners]);

  return (
    <Card>
      <Card.Title style={lastRaceStyles.cardStyles}>{title}</Card.Title>
      <Card.Divider color="#F30000" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <Text style={{ fontFamily: "TitilliumWeb_700Bold", fontSize: 22 }}>
            {RaceData.current.RaceName}
          </Text>

          <Text style={{ fontFamily: "TitilliumWeb_300Light", fontSize: 21 }}>
            {RaceData.current.RaceDate}
          </Text>
          <Text style={{ fontFamily: "TitilliumWeb_300Light", fontSize: 15 }}>
            {RaceData.current.RaceTime}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Flag
            id={"AE"}
            style={{ borderRadius: "30px" }}
            width={70}
            height={40}
          />
        </View>
      </View>

      <View style={{ flexDirection: "column" }}>
        {!done ? <Text>Loading....</Text> : <Text></Text>}

        {winners.current.slice(0,3).map((o, i) => (
          <View
            key={i}
            style={i == 0 ? lastRaceStyles.podiumW : lastRaceStyles.podium}
          >
            <View style={{ width: "70%" }}>
              <Text
                style={
                  !(i == 0) ? lastRaceStyles.podium : lastRaceStyles.podiumW
                }
              >
                <Text
                  style={
                    !(i == 0) ? lastRaceStyles.podium : lastRaceStyles.podiumW
                  }
                >
                  {i + 1}.
                </Text>{" "}
                {o.name}
              </Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text
                style={
                  !(i == 0)
                    ? { fontFamily: "TitilliumWeb_300Light_Italic", padding: 7 }
                    : {
                        fontFamily: "TitilliumWeb_300Light_Italic",
                        padding: 7,
                        color: "#eee",
                      }
                }
              >
                {o.time}
              </Text>
            </View>
          </View>
        ))}
        {winners.current.length == 0 ? (
          (() => {
            if (timerT)  {
              return <Timer B={true}/>
              
            }
          })()
        ) : (
          <View
            style={{ width: "100%", borderRadius: 50, alignItems: "center" }}
          >
            <Button
              onPress={() => {
                navigation.replace("RaceRes", {
                  RaceName: RaceData.current.RaceName,
                  date: RaceData.current.RaceDateMonth,
                  link: winners.current,
                });
              }}
              title={<RaceResult />}
              buttonStyle={lastRaceStyles.raceButtonStyles}
              icon={{
                name: "arrow-right",
                type: "font-awesome",
                size: 10,
                color: "#000",
              }}
              iconRight
            ></Button>
          </View>
        )}
      </View>
    </Card>
  );
}

const RaceResult = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#000",
          fontFamily: "TitilliumWeb_400Regular",
          marginRight: 5,
        }}
      >
        SEE FULL RESULT
      </Text>
    </View>
  );
};
