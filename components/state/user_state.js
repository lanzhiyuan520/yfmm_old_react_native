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
    DatePickerAndroid,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import {request_user_status,user_status} from "../api"
var selectTableWarp = {}
var user
export default class UserState extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "状态选择",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight:<View></View>,
        headerLeft: <View></View>
    });
    constructor(props){
        super(props)
        this.state={
            production:"http://cdn.ayi800.com/image/jpg/app_yuchan2yuchanl.png",
            birth:"http://cdn.ayi800.com/image/jpg/app_chushengchusheng2.png",
            Sta:false,
            state:null,
            state_text:"已育儿",
            text_color:true
        }
        this.production=this.production.bind(this)
        this.birth=this.birth.bind(this)
    }
    componentDidMount(){
        //隐藏键盘
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        user = JSON.parse(this.props.navigation.state.params.user)
    }
    production(){
        this.setState({
            production:"http://cdn.ayi800.com/image/jpg/app_yuchanyuchan2.png",
            birth:"http://cdn.ayi800.com/image/jpg/app_chusheng2chusheng.png",
            Sta:true,
            state_text:"怀孕中",
            text_color:false
        })
        this.state.state=true
    }
    birth(){
        this.setState({
            production:"http://cdn.ayi800.com/image/jpg/app_yuchan2yuchanl.png",
            birth:"http://cdn.ayi800.com/image/jpg/app_chushengchusheng2.png",
            Sta:false,
            state_text:"已育儿",
            text_color:true
        })
        this.state.state=false
    }
    render(){
        let text = this.state.Sta?styles.text:styles.pinkText;
        let statetext = this.state.text_color?styles.text:styles.pinkText;
        return (
            <View style={{
                width:width,
                backgroundColor:"#fff",
                borderTopColor:"#f2f2f2",
                borderTopWidth:1,
                flex:1
            }}>
                <View style={{marginTop:100,
                    justifyContent:"center",
                    alignItems:"center",
                    marginBottom:60
                }}>
                    <Text style={{color:"#000",fontSize:16}}>当前状态</Text>
                    <Text style={{color:"#ff8089",fontSize:30}}>{this.state.state_text}</Text>
                </View>
                <View style={{width:width,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:width*0.9,flexDirection:"row",justifyContent:"space-around"}}>
                        <TouchableWithoutFeedback onPress={this.production}>
                            <View style={{alignItems:"center"}}>
                                <Image source={{uri:this.state.production}} style={{width:150,height:150}} />
                                <Text style={statetext}>我怀孕了</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.birth}>
                            <View style={{alignItems:"center"}}>
                                <Image source={{uri:this.state.birth}} style={{width:150,height:150}}/>
                                <Text style={text}>宝宝已出生</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={()=>{
                    this.props.navigation.navigate("Usertime",{
                        state:this.state.state,
                        user:this.props.navigation.state.params.user
                    });
                }}>
                    <View style={{width:width,justifyContent:"center",alignItems:"center",marginTop:60}}>
                        <View style={{backgroundColor:"#ff8089",width:width*0.9,height:50,justifyContent:"center",alignItems:'center'}}>
                            <Text style={{color:"#fff",fontSize:15}}>下一步</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        color:"#999"
    },
    pinkText:{
        color:"#ff8089"
    }
})