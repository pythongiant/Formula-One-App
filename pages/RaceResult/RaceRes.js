import Gradient from "../../components/Gradient/gradient";
import { Text, ListItem } from "react-native-elements";
import { useState, useEffect } from "react";
import { View, FlatList,BackHandler } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Loading from "../../components/Loading/loading";
import Logo from "../../components/Logo/Logo";
import Sticky from "../../components/StickyHeader/sticky";

export default function Standings({ route, navigation }) {
  const { RaceName, date, link } = route.params;
  var [selectedKey, selectKey] = useState(0);
  const [done,setDone] =useState(true)
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home")
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <ParallaxScrollView
      backgroundColor="#232526"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={200}
      stickyHeaderHeight={70}
      renderStickyHeader={() => (
        <Sticky style={{marginTop:30}}>
          <Text
            style={{
              color: "#eee",
              fontFamily: "TitilliumWeb_700Bold",
              fontSize: 17,
            }}
          >
            {RaceName} Results
          </Text>
        </Sticky>
      )}
      renderForeground={() => (
        <Gradient>
          <Logo />
          <View style={{ height: 200, marginTop: 30 }}>
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
            keyExtractor={(item) => link.position}
            data={link}
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
