import Gradient from "../../components/Gradient/gradient";
import { Text, ListItem } from "react-native-elements";
import { useState, useEffect } from "react";
import Axios from "axios";
import XMLParser from "react-xml-parser";
import { View, FlatList } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Loading from "../../components/Loading/loading";

export default function Standings({ route, navigation }) {
  const { RaceName, date } = route.params;
  var [winner, setWinner] = useState([]);
  var [selectedKey, selectKey] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    Axios.get("https://ergast.com/api/f1/current/last/results")
      .then((response) => {
        const schedule = new XMLParser().parseFromString(response["data"]);
        const Name = schedule.getElementsByTagName("RaceName")[0]["value"];
        const date = schedule.getElementsByTagName("Date")[0]["value"];

        var Time =
          schedule.getElementsByTagName("Race")[0]["children"][3]["value"];
        const DateObject = new Date(
          date + "T" + Time.replace("Z", "")
        ).getTime();

        Time = new Date(DateObject);

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
            ? callback({
                position: i + 1,
                name: FullName,
                time: time[0]["value"],
                code: code,
                points: points,
                team: team,
              })
            : callback({
                position: i + 1,
                name: FullName,
                time: "DNF",
                code: code,
                points: points,
                team: team,
              });
        });

        //   res.forEach(element => {})
      })
      .then(() => {
        setDone(true);
      })
      .catch((error) => {
        console.log(error);
      });

    function callback(l) {
      // console.log(winner)
      setWinner((winner) => [...winner, l]);
    }
  }, []);
  return (
    <ParallaxScrollView
      backgroundColor="#414345"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={70}
      renderStickyHeader={() => (
        <View
          style={{
            height: 70,
            marginTop: 30,
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "#eee",
              fontFamily: "TitilliumWeb_700Bold",
              fontSize: 17,
            }}
          >
            {RaceName} Results
          </Text>
        </View>
      )}
      renderForeground={() => (
        <Gradient>
          <View style={{ height: 100, marginTop: 30 }}>
            <Text
              style={{
                color: "#eee",
                textAlign: "center",
                fontFamily: "TitilliumWeb_700Bold",
                fontSize: 22,
              }}
            >
              {RaceName}
            </Text>
            <Text
              style={{
                color: "#eee",
                textAlign: "center",
                fontFamily: "TitilliumWeb_400Regular",
                fontSize: 15,
              }}
            >
              {date}
            </Text>
          </View>
        </Gradient>
      )}
    >
      {!done ? (
        <Loading />
      ) : (
        <View>
          <FlatList
            keyExtractor={item=>item.position}
            data={winner}
            renderItem={({ item: element }) => (
              <ListItem
                containerStyle={[
                  selectedKey == element.position
                    ? { backgroundColor: "#F30000" }
                    : {},
                ]}
                onPress={() => {
                  selectKey(element.position);
                }}
                key={element.position + 100}
                bottomDivider
              >
                <Text
                  style={[
                    selectedKey == element.position ? { color: "#eee" } : {},
                    { fontFamily: "TitilliumWeb_400Regular" },
                  ]}
                >
                  {element.position}
                </Text>
                <ListItem.Content>
                  <ListItem.Title>
                    {selectedKey == element.position ? (
                      <Text
                        style={{
                          fontFamily: "TitilliumWeb_700Bold",
                          color: "#eee",
                        }}
                      >
                        {element.name}
                      </Text>
                    ) : (
                      <Text style={{ fontFamily: "TitilliumWeb_700Bold" }}>
                        {element.code}
                      </Text>
                    )}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={[
                      selectedKey == element.position ? { color: "#eee" } : {},
                      { fontFamily: "TitilliumWeb_300Light" },
                    ]}
                  >
                    {element.team}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title
                    style={[
                      selectedKey == element.position ? { color: "#eee" } : {},
                      { fontFamily: "TitilliumWeb_300Light" },
                    ]}
                  >
                    {element.time}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                  <Text
                    style={[
                      selectedKey == element.position ? { color: "#eee" } : {},
                      { fontFamily: "TitilliumWeb_300Light" },
                    ]}
                  >
                    +{element.points} PTS
                  </Text>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </View>
      )}
    </ParallaxScrollView>
  );
}
