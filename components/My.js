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
    AsyncStorage,
    ScrollView
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {user_status} from "./api"
export default class My extends Component{
    constructor(props){
        super(props)
        this.state={
            disabled:false,
            user:{},
            user_status:{}
        }
        this.disabled=this.disabled.bind(this)
        this.status=this.status.bind(this)
    }
    componentDidMount(){
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        //获取用户状态
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            this.setState({
                user_status:result
            })
        })
        this.setState({
            user:JSON.parse(this.props.user)
        })
    }
    disabled(){
        this.setState({
            disabled:true
        })
        setTimeout(()=>{
            this.setState({disabled:false})
        },500)
    }
    status(){
        //根据用户状态来判断显示的文本
        if(this.state.user_status.status == 1){
            return "怀孕"
        }else if(this.state.user_status.status == 2){
            return "月子"
        }else if(this.state.user_status.status == 3){
            return "育儿"
        }
    }
    render(){
        var img = "http://cdn.ayi800.com/1491981237"
        return(
            <View style={{width:width,flex:1,backgroundColor:"#f5f5f5"}}>
              <ScrollView>
                <View style={{
                    width:width,
                    height:50,
                    position:"relative",
                    backgroundColor:"#fff",
                    flexDirection:"row",
                    alignItems:"center",
                    borderBottomWidth:1,
                    borderBottomColor:"#f2f2f2"
                }}>
                    <View style={{width:width,flexDirection:"row",justifyContent:"center"}}>
                        <Text style={{color:"#000",fontSize:17}}>个人中心</Text>
                    </View>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Message',{
                            user:this.state.user
                        });this.disabled()}}>
                        <View style={{position:"absolute",right:10}}>
                            <FontAwesome name="bell-o" style={{fontSize: 20, color: "#999",marginLeft:10}}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                    disabled={this.state.disabled}
                    onPress={()=>{this.props.navigate('PersonalData',{
                        navigate:this.props.navigate,
                        username:this.state.text,
                        My:this.props.My,
                        head_img:this.state.user.head_img?this.state.user.head_img:img,
                        name:this.state.user.nickname,
                        phone:this.state.user.phone,
                        address:this.state.user.address,
                        user:this.state.user
                    });this.disabled()}}>
                    <View style={{width:width,height:150,backgroundColor:"#fff",justifyContent:"center",alignItems:"center"}}>
                        <View style={{width:width,height:80,paddingLeft:10,paddingRight:10,flexDirection:"row"}}>
                            <View>
                                <Image source={{uri:this.state.user.head_img?this.state.user.head_img:img}} style={{width:80,height:80,borderRadius:40}} />
                            </View>
                            <View style={{marginLeft:20}}>
                                <View>
                                    <Text style={{color:"#333",fontSize:18}}>{this.state.user.nickname?this.state.user.nickname:"未设置"}</Text>
                                </View>
                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Text style={{color:"#999",fontSize:16}}>状态:</Text>
                                    <Text style={{color:"#999",fontSize:16}}>{this.state.user_status.statusCon}</Text>
                                </View>
                            </View>
                            <View style={{height:80,justifyContent:"center",position:"absolute",right:10}}>
                                <FontAwesome name="angle-right" style={{fontSize: 50, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                <View style={{width:width,height:120,backgroundColor:"#fff",flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Questions');this.disabled()}}>
                        <View style={{height:120,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <FontAwesome name="telegram" style={{fontSize: 40, color: "#ff8089"}}/>
                            <Text style={{color:"#000",marginTop:5}}>提问</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Attention',{user:this.state.user});this.disabled()}}>
                        <View style={{height:120,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <FontAwesome name="plus-circle" style={{fontSize: 40, color: "#ff8089"}}/>
                            <Text style={{color:"#000",marginTop:5}}>关注</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Collect',{user:this.state.user});this.disabled()}}>
                        <View style={{height:120,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <FontAwesome name="gittip" style={{fontSize: 40, color: "#ff8089"}}/>
                            <Text style={{color:"#000",marginTop:5}}>收藏</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                <View style={{width:width,backgroundColor:"#fff",}}>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('State',{
                            user:this.state.user
                        });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>我的状态</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{color:"#ff8089"}}>{this.status()}</Text>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Opinion',{
                            user:this.state.user
                        });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>意见反馈</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('About',{
                        navigate:this.props.navigate
                    });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>关于我们</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigate('Setting',{

                        });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>系统设置</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
              </ScrollView>
            </View>
        )
    }
}