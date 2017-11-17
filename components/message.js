import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image
} from 'react-native';
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
    render(){
        return(
            <View>
                <Text>消息</Text>
            </View>
        )
    }
}