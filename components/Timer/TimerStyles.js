import { StyleSheet } from "react-native";
import { useFonts, TitilliumWeb_400Regular,TitilliumWeb_700Bold} from "@expo-google-fonts/titillium-web"

export default StyleSheet.create({
    Timer:{
        flexDirection:"row",
    },
    Time:{
        paddingRight:20,
        alignItems:"center",
        flexDirection:"column"
    },
    TextB:{
        color:"#fff",
    },
    TextW:{
        color:"#000"
    },
    Text:{
        color:"#fff",
        fontFamily: "TitilliumWeb_400Regular",
        fontSize:12,
    }
})