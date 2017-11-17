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
    TextInput
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Phone extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "手机号关联",
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
    constructor(props){
        super(props)
        this.state={

        }

    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View>
                    <View style={{width:width,alignItems:"center",marginTop:10}}>
                        <TextInput
                            style={{
                                width:width*0.9,
                                height:45,
                                backgroundColor:"#f2f2f2",
                                paddingLeft:10
                            }}
                            placeholder="请输入手机号"
                            underlineColorAndroid={"transparent"}
                        />
                    </View>
                    <View style={{width:width,alignItems:"center",marginTop:10}}>
                        <View style={{width:width*0.9,flexDirection:"row"}}>
                            <TextInput
                                style={{
                                    flex:2,
                                    height:45,
                                    backgroundColor:"#f2f2f2",
                                    paddingLeft:10
                                }}
                                placeholder="请输入验证码"
                                underlineColorAndroid={"transparent"}
                            />
                            <TouchableWithoutFeedback>
                                <View style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:"center",
                                    borderColor:"#f2f2f2",
                                    borderWidth:1,
                                    borderRadius:5,
                                    marginLeft:10
                                }}>
                                    <Text style={{color:'#ff8089'}}>发送验证码</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={{width:width,alignItems:'center',marginTop:10}}>
                        <TouchableWithoutFeedback>
                            <View style={{width:width*0.9,borderRadius:5,height:45,backgroundColor:"#ff8089",justifyContent:"center",alignItems:'center'}}>
                                <Text style={{color:"#fff"}}>登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    }
}
