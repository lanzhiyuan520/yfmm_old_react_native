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
    ToastAndroid,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {send_code,bind_phone} from "../api"
import {bounces} from "../bounces/bounces"
import Toast, {DURATION} from 'react-native-easy-toast'
var user
var bindDomain = 1;
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
            phone:null,
            code:null,
            verify: "发送验证码",
            count: 60,
            once: "再试一次",
            countText:"S后再次发送",
            liked:true,
            clear:true,
            disabled:false
        }
        this.login=this.login.bind(this)
        this.send=this.send.bind(this)
        this.user_send_code=this.user_send_code.bind(this)
    }
    componentDidMount(){
        user=this.props.navigation.state.params.user
        console.log(user)
    }
    //发送验证码
    send(){
        var phone_val = this.state.phone
        var code = this.state.code
        var uuid = user.uuid
        if(!this.state.count == 60){
            bounces('请稍后再次发送',this)
            return false
        }else{
            if(!(/^1[34578]\d{9}$/.test(phone_val))){
                bounces('手机号有误请重新填写',this)
                return false;
            }else{
                send_code({
                    phone:phone_val,
                    type:bindDomain,
                    uuid:uuid
                },this.user_send_code)
            }
        }


    }
    //验证码发送成功回调
    user_send_code(responseText){
        if(responseText.code !=0 ){
            bounces(responseText.msg)
            return false
        }else{
            bounces('验证码已发出',this)
            this.setState({clear:false,liked:true})
            this.time = setInterval(()=>{
                this.setState({verify:`${this.state.count}${this.state.countText}`})
                this.state.count=this.state.count-1
                if(this.state.count<1){
                    this.setState({verify:this.state.once,liked:false,clear:true,count:60})
                    clearInterval(this.time)
                }
            },1000)
        }

    }
    //登录
    login(){
        if(!this.state.code){
            return false
        }else{
            if(!(/^1[34578]\d{9}$/.test(this.state.phone))){
                bounces('手机号有误请重新填写',this)
                return false;
            }else {
                var phone_data = {
                    type:bindDomain,
                    phone:this.state.phone,
                    id:user.id,
                    code:this.state.code,
                    uuid:user.uuid
                }
                bind_phone(phone_data,this.user_bind_phone)
            }

        }
    }
    //绑定手机成功回调
    user_bind_phone(responseText){
        if(responseText.code != 0){
            bounces(responseText.msg)
        }else{
            bounces("绑定成功")
            user.phone = this.state.phone
            AsyncStorage.setItem("user",JSON.stringify(user))
            this.props.navigation.navigate("App",{
                selectedTab:"我的",
                user:JSON.stringify(user)
            })
        }
    }
    disabled(){
            this.setState({disabled:true})
            setTimeout(()=>{
                this.setState({disabled:false})
            },500)
    }
    render(){
        let once = this.state.liked?styles.once:styles.once1
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <Toast ref="toast"/>
                <View>
                    <View style={{width:width,alignItems:"center",marginTop:10}}>
                        <TextInput
                            onChangeText={(text) => {
                                this.setState({
                                    phone:text
                                })
                            }}
                            style={{
                                width:width*0.9,
                                height:45,
                                backgroundColor:"#f2f2f2",
                                paddingLeft:10
                            }}
                            placeholder="请输入手机号"
                            underlineColorAndroid={"transparent"}
                            maxLength={11}
                        />
                    </View>
                    <View style={{width:width,alignItems:"center",marginTop:10}}>
                        <View style={{width:width*0.9,flexDirection:"row"}}>
                            <TextInput
                                onChangeText={(text) => {
                                    this.setState({
                                        code:text
                                    })
                                }}
                                style={{
                                    flex:2,
                                    height:45,
                                    backgroundColor:"#f2f2f2",
                                    paddingLeft:10
                                }}
                                placeholder="请输入验证码"
                                underlineColorAndroid={"transparent"}
                            />
                            <TouchableWithoutFeedback
                                disabled={this.state.disabled}
                                onPress={()=>{this.send();this.disabled()}}>
                                <View style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:"center",
                                    borderColor:"#f2f2f2",
                                    borderWidth:1,
                                    borderRadius:5,
                                    marginLeft:10
                                }}>
                                    <Text style={once}>{this.state.verify}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={{width:width,alignItems:'center',marginTop:10}}>
                        <TouchableWithoutFeedback onPress={()=>{this.login()}}>
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
const styles = StyleSheet.create({
    once:{
        fontSize:12,
        color:"#ff8080"
    },
    once1:{
        fontSize:12,
        color:"#999"
    }
});
