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
    TextInput,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import {username} from "../api"
import {bounces} from "../bounces/bounces"
import Toast, {DURATION} from 'react-native-easy-toast'
var postData = {}
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Username extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "用户名",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.preservation()}}><View style={{marginRight:10}}><Text style={{color:"#ff8089",fontSize:15}}>保存</Text></View></TouchableWithoutFeedback>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            text:"",
            user:null
        }
        this.preservation=this.preservation.bind(this)
        this.username_success=this.username_success.bind(this)
    }
    componentDidMount(){
        this.props.navigation.setParams({preservation:this.preservation})
    }
    preservation(){
        var str = this.state.text.replace(/\s+/g,"");
        if(!str){
            bounces("您还没有输入内容",this)
            return false
        }
        var user = this.props.navigation.state.params.user
        //更改用户名
        username(user,postData,this.username_success)

           }
    username_success(responseText){
        var user = this.props.navigation.state.params.user
        user.nickname = this.state.text
        //从新存入
        AsyncStorage.setItem("user",JSON.stringify(user))
        this.props.navigation.navigate("App",{
            selectedTab:"我的",
            user:JSON.stringify(user)
        })

    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
                <Toast ref="toast"/>
                <TextInput
                    style={{
                        width:width,
                        height:45,
                        backgroundColor:"#fff",
                        marginTop:10,
                        borderTopWidth:1,
                        borderTopColor:"#f2f2f2",
                        borderBottomWidth:1,
                        borderBottomColor:"#f2f2f2"
                    }}
                    underlineColorAndroid={"transparent"}
                    onChangeText={(text) => {
                        /*var postData = {nickname:name};*/
                        postData.nickname=text
                        this.setState({
                            text:text
                        })
                    }}
                />
            </View>
        )
    }
}
