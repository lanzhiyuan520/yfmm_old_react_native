
import {
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
export function bounces(msg,that){
    if (Platform.OS === "android") {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
        if (that){
            that.refs.toast.show(msg);
        }else{
            AlertIOS.alert(msg)
        }

    }
}