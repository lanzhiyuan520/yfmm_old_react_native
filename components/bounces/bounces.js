
import {
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';
export function bounces(msg){
    if (Platform.OS === "android") {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
        AlertIOS.alert(msg);
    }
}