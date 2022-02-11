import { Text, ListItem } from "react-native-elements";
export default function Loading(){
    return(
        <ListItem>
        <Text>0</Text>
        <ListItem.Content>
          <ListItem.Title>Loading... </ListItem.Title>
          <ListItem.Subtitle>Loading...</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title>Loading...</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <Text>Loading...</Text>
        </ListItem.Content>
      </ListItem>
    )
}
