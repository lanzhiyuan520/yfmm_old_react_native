import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Questions extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "我的提问",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <Text>暂无提问</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})