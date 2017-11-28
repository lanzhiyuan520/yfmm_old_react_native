import {
    ToastAndroid
} from 'react-native';
var WeChat=require('react-native-wechat');
import {bounces} from "../bounces/bounces"
export function Circle(obj){
    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToTimeline(obj)
                    .catch((error) => {
                        ToastAndroid(error.message);
                    });
            } else {
                bounces('没有安装微信软件，请您安装微信之后再试');
            }
        });
}
export function friends(obj){
    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToSession(obj)
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                bounces('没有安装微信软件，请您安装微信之后再试');
            }
        });
}