import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
var {width} = Dimensions.get('window')
import {request_noticelist,message} from "./api"
import Getui from 'react-native-getui'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var LIKE = 1 ;
var COLLECTION = 2 ;
var CARE = 3 ;
var REPLY= 4 ;
var MARKTING= 5 ;
var SYSTEM  = 6 ;
var UPDATE  = 7 ;
var TODAY = 8 ;
var user
export default class Message extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "消息列表",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>
    });
    constructor(props){
        super(props)
        this.state={
            message_list:[],
            title:""
        }
        this.message_success=this.message_success.bind(this)
        this.getLocalTime=this.getLocalTime.bind(this)
        this.message_img=this.message_img.bind(this)
        this.title=this.title.bind(this)
        this.list=this.list.bind(this)
    }
    componentWillUnMount() {
        //记得在此处移除监听
        receiveRemoteNotificationSub.remove()
        clickRemoteNotificationSub.remove()
        resigsteClientIdSub.remove()
    }
    componentDidMount(){
         this.list()
        /*this.props.navigation.state.params.message_list()*/
    }
    //获取消息列表
    list(){
        user = this.props.navigation.state.params.user
        request_noticelist(user.uuid,user.token,this.message_success)
    }
    message_success(responseText){
        this.setState({
            message_list:responseText.data
        })
    }
    //格式化日期格式
    getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
    message_img(message_type){
        if(message_type==8){
            return require("../img/baobao.jpg")
        }else if(message_type==7){
            return require("../img/share.png")
        }
    }
    //判断消息类型，显示文本
    title(item){
        if(item.content.message_type == 7){
            return "更新提醒"
        }else if(item.content.message_type == 6){
            return "小福助手"
        }else if(item.content.message_type == 5){
            return "小福助手"
        }else if (item.content.message_type == 4) {
            return "有问必答"
        }else if(item.content.message_type == 8){
            return "小福助手"
        }
    }
    render(){
        return(
            <View style={{width:width,backgroundColor:"#f2f2f2"}}>
                <FlatList
                    data={this.state.message_list}
                    renderItem={({item})=>{
                        return (
                            <TouchableWithoutFeedback onPress={()=>{
                                this.props.navigation.navigate("Xfdetailed",{
                                    id:item.content.page_param,
                                    user:JSON.stringify(this.props.navigation.state.params.user),
                                    list:this.list
                                })
                                message(user,{time:item.time})
                            }}>
                                <View style={{width:width,height:100,marginBottom:15,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",borderTopWidth:1,borderTopColor:"#f2f2f2",paddingRight:10,paddingLeft:10}}>
                                    <View style={{marginRight:10}}>
                                        <Image source={this.message_img(item.content.message_type)} style={{width:80,height:80,borderRadius:40}}/>
                                    </View>
                                    <View style={{width:width}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{color:"#000",fontSize:14}}>{this.title(item)}</Text>
                                            <Text style={{color:"#999",fontSize:12,position:"absolute",right:120}}>{this.getLocalTime(item.time)}</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:"#999",fontSize:13}}>{item.title}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />

            </View>
        )
    }
}
//订阅消息通知
/*
var { NativeAppEventEmitter } = require('react-native');

var receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
    'receiveRemoteNotification',
    (msg) => {
        //Android的消息类型为payload 透传消息 或者 cmd消息
        var param   = JSON.parse( msg.payload.payload ) ;
        var content = param.content ;
        var message_type = content.message_type ;
        switch (message_type) {
            case SYSTEM:

                break;
            case 'payload':
                /!*message(user,{
                    time : msg.payload,
                })*!/
                Alert.alert('payload 消息通知',JSON.stringify(msg),[
                    {text:'取消',onPress:()=>{}},
                    {text:'确定',onPress:()=>{

                    }}
                ])
                console.log(msg)
                break
            case MARKTING:
                console.log(msg)
                break
            case REPLY:
                console.log(msg)
                break
            case UPDATE:
                console.log(msg)
                break
            case TODAY:
                console.log(msg)
                break
            default:
        }
    }
);

var clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
    'clickRemoteNotification',
    (msg) => {
        Alert.alert('点击通知',JSON.stringify(msg))
    }
);*/
