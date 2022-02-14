import { FlatList, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import Axios from "axios";
import { CarStore } from "../../pages/TokenProvider";
import Loading from "../Loading/loading";

export default function ConsTable(props) {
  const [ConsList, setConsList] = useState([]);
  const [done, setDone] = useState(false);
  const selectedKey = CarStore.useState((s) => s.index);

  useEffect(() => {
    Axios.get("https://ergast.com/api/f1/current/constructorStandings")
      .then((response) => {
        const schedule = new XMLParser().parseFromString(response["data"]);
        const res = schedule.getElementsByTagName("ConstructorStanding");
        if (props.topThree) {
          res.splice(3);
        }
        res.forEach((element) => {
          const position = element["attributes"]["position"];
          const points = element["attributes"]["points"];
          const consId = element["children"][0]["attributes"]["constructorId"];
          const Name = element.getElementsByTagName("Name")[0]["value"];

          const promises = Axios.get(
            "https://ergast.com/api/f1/current/constructors/" +
              consId +
              "/drivers"
          )
            .then((mes) => {
              const scheduleT = new XMLParser().parseFromString(mes["data"]);
              const tes = scheduleT["children"][0]["children"];
              var driver = "";

              tes.forEach((element, i) => {
                driver +=
                  element["children"][1]["value"] +
                  " " +
                  element["children"][2]["value"].toUpperCase() +
                  " ";
              });
              return driver;
            })
            .then((p) => {
              callback([position, points, Name, p]);
            });
        });
      })
      .then(() => {
        setDone(true);
      })
      .catch((error) => {
        setDone(false);
        console.log(error);
      });
    function callback(l) {
      setConsList((ConsList) => [...ConsList, l].sort((a, b) => a[0] - b[0]));
    }
  }, []);

  return (
    <View style={!props.topThree ? { flex: 1 } : {}}>
      {done ? (
        <View>
          <FlatList
            data={ConsList}
            renderItem={({ item }) => (
              <ListItem
                key={item[2]}
                onPress={() => {
                  !props.topThree
                    ? CarStore.update((s) => {
                        s.index = item[2];
                      })
                    : {};
                }}
                containerStyle={[
                  selectedKey == item[2] && !props.topThree
                    ? { backgroundColor: "#F30000" }
                    : {},
                ]}
                bottomDivider
              >
                <Text
                  style={[
                    selectedKey == item[2] && !props.topThree
                      ? { color: "#eee" }
                      : {},
                    { fontFamily: "TitilliumWeb_400Regular" },
                  ]}
                >
                  {item[0]}
                </Text>
                <ListItem.Content>
                  <ListItem.Title
                    style={[
                      selectedKey == item[2] && !props.topThree
                        ? { color: "#eee" }
                        : {},
                      { fontFamily: "TitilliumWeb_700Bold" },
                    ]}
                  >
                    {item[2]}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={[
                      selectedKey == item[2] && !props.topThree
                        ? { color: "#eee" }
                        : {},
                      { fontFamily: "TitilliumWeb_300Light" },
                    ]}
                  >
                    {item[3]}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <Text
                    style={[
                      selectedKey == item[2] && !props.topThree
                        ? { color: "#eee" }
                        : {},
                      { fontFamily: "TitilliumWeb_400Regular" },
                    ]}
                  >
                    {item[1]} PTS
                  </Text>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={(item) => item[2]}
          />
        </View>
      ) : (
        <Loading/>
      )}
    </View>
  );
}
