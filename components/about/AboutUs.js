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
var {height} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class PersonalData extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "关于我们",
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
                <View style={{width:width,height:height,alignItems:"center",position:"relative"}}>
                    <View style={{marginTop:30}}>
                        <Image source={require("../../img/share.png")} style={{width:100,height:100,borderRadius:10,marginBottom:10}} />
                        <Text style={{color:"#000",fontSize:19}}>有福妈妈1.0</Text>
                    </View>
                    <View style={{width:width,alignItems:'center',position:"absolute",bottom:120}}>
                        <Text style={{color:"#333"}}>联系我们</Text>
                        <Text style={{color:"#333",marginTop:5}}>微信公众号：yuesaohui</Text>
                        <Text style={{color:"#333",marginTop:5}}>微博：有福妈妈</Text>
                        <Text style={{color:"#333",marginTop:5}}>©北京浩思麦信息技术有限公司</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})