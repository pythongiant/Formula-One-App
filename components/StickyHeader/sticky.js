import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Sticky(props) {

  return (<View style={[styles.header,props.style]}>{props.children}</View>)
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
