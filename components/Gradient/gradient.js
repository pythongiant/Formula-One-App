import { LinearGradient } from 'expo-linear-gradient';
import gradientStyles from './gradientStyle';
export default function Gradient(props){
    return(
        <LinearGradient  colors={["#232526","#414345"]} style={[gradientStyles.gradient,props.styles]}>
            {props.children}
        </LinearGradient>
    )
}   