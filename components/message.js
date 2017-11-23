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
import {request_noticelist} from "./api"
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><Image source={require("../img/jiantou.png")} style={{width:30,height:30}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            message_list:[]
        }
        this.message_success=this.message_success.bind(this)
        this.getLocalTime=this.getLocalTime.bind(this)
        this.message_img=this.message_img.bind(this)
    }
    componentDidMount(){
        var user = this.props.navigation.state.params.user
        request_noticelist(user.uuid,user.token,this.message_success)
    }
    message_success(responseText){
        this.setState({
            message_list:responseText.data
        })
    }
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
                                    user:JSON.stringify(this.props.navigation.state.params.user)
                                })
                            }}>
                                <View style={{width:width,height:100,marginBottom:15,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",borderTopWidth:1,borderTopColor:"#f2f2f2",paddingRight:10,paddingLeft:10}}>
                                    <View style={{marginRight:10}}>
                                        <Image source={this.message_img(item.content.message_type)} style={{width:80,height:80,borderRadius:40}}/>
                                    </View>
                                    <View style={{width:width}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{color:"#000",fontSize:14}}>小福助手</Text>
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