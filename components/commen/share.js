/**
 * Created by Administrator on 2017/11/14.
 */
import React, { Component } from 'react';
import * as WeChat from 'react-native-wechat';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions,
    FlatList,
    AlertIOS,
    ToastAndroid
} from 'react-native';
const {width,height}=Dimensions.get('window');
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    componentDidMount(){
        WeChat.registerApp('wx825ecd9a849eef9d');
        WeChat.addListener(
            'SendMessageToWX.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('分享成功', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('分享成功');
                    }
                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('分享失败', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('分享失败');
                    }
                }
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }
    componentWillUnmount(){
        WeChat.removeAllListeners()
    }

    hideItem(){
        this.setState({
          show:false
        })
    }

    shareCircle(){
        WeChat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                    WeChat.shareToTimeline({
                        title:'微信朋友圈测试链接',
                        description:'分享自:江清清的技术专栏(www.lcode.org)',
                        thumbImage:'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                        type:'news',
                        webpageUrl:'http://www.lcode.org'
                    })

                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('没有安装微信软件，请您安装微信之后再试');
                    }
                }
            } );
    }

    shareFriend(){
        WeChat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                    WeChat.shareToSession(data)({
                        title:'微信朋友圈测试链接',
                        description:'分享自:江清清的技术专栏(www.lcode.org)',
                        thumbImage:'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                        type:'news',
                        webpageUrl:'http://www.lcode.org'
                    })
                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('没有安装微信软件，请您安装微信之后再试');
                    }
                }
            } );
    }

    render(){
        if(this.state.show){
            return(
                <View style={styles.mask}>
                    <View style={{position:'absolute',bottom:0,left:(width-320)/2,height:220}}>
                        <View style={styles.container}>
                            <TouchableWithoutFeedback onPress={()=> this.shareCircle()}>
                                <View style={[styles.item,styles.boders]}>
                                     <Text style={styles.share}>微信朋友圈</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=> this.shareFriend()}>
                            <View style={[styles.item,styles.boders]}>
                                 <Text style={styles.share}>微信好友</Text>
                            </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=> this.shareCircle()}>
                            <View style={styles.item}>
                                <Text style={styles.share}>复制到剪切板</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{width:320,backgroundColor:'#fff',paddingVertical:10, borderRadius:5,}}>
                            <TouchableWithoutFeedback onPress={()=> this.hideItem()}>
                                <View style={{height:20}}>
                                    <Text style={styles.remove}>取消</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }

    }
}
const styles = StyleSheet.create({
    mask:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:40,
        left:0,
        zIndex:1000
    },
    container:{
        width:320,
        backgroundColor:'#fff',
        paddingVertical:10,
        borderRadius:5,
        marginBottom:10
    },
    share:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:20
    },
    boders:{
        borderBottomWidth:0.5,
        borderBottomColor:'#f8f8f8'
    },
    item:{
        height:25
    },
    remove:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:20
    }
})