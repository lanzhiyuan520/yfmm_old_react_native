import React, { Component } from 'react';
import { AppRegistry,Alert,Platform,AsyncStorage,Dimensions,ActivityIndicator,ToastAndroid, Button,TextInput ,TouchableOpacity,TouchableNativeFeedback,TouchableHighlight,Image , StyleSheet, Text, View ,ScrollView} from 'react-native';
import *as wechat from 'react-native-wechat'
import DeviceInfo from 'react-native-device-info'

var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import {request_code_in_phone,request_login_by_phone,user_status} from "../api"

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        header:null
    });
    constructor(props){
        super(props)
        this.state= {
            text: null,
            check: true,
            validation: null,
            verify: "发送验证码",
            count: 60,
            once: "再试一次",
            liked: true,
            clear: true,
            login: false,
          /*  user: {status:3},*/
            disabled:false,
            disabled2:false,
            loading:false,
            uuid:"3454-e74532d-4c2f292-5d2488e-75c7049",
            user:{}
        }
        this.checked = this.checked.bind(this)
        this.click = this.click.bind(this)
        this.send = this.send.bind(this)
        this.service = this.service.bind(this)
        this.social = this.social.bind(this)
        this.disabled = this.disabled.bind(this)
        this.success = this.success.bind(this)
        this.user_success = this.user_success.bind(this)
        this.user_information = this.user_information.bind(this)
    }
    componentDidMount(){
        wechat.registerApp('wx825ecd9a849eef9d')
    }
    //手机号登录
    click(){
        this.disabled(2)
        if(!this.state.text){
             ToastAndroid.show('请输入手机号', ToastAndroid.SHORT)
            return false
        }else{
            var codeDomain= 0 ;
            var phone_val = this.state.text ;
            var code_val  = this.state.validation
            //判断是否同意服务条款
            if(!this.state.check){
                ToastAndroid.show('请同意服务条款', ToastAndroid.SHORT)
                return false
            }
            //判断是否输入验证码
            if(!code_val){
                ToastAndroid.show('请输入验证码', ToastAndroid.SHORT)
                return false
            }
            request_login_by_phone(this.state.uuid,{phone:phone_val,code:code_val,type:codeDomain},this.user_success)
        }
    }
    //手机登录成功回调
    user_success(responseText){
        this.state.user=responseText.data
        user_status(responseText.data.id,responseText.data.uuid,responseText.data.token,this.user_information)
        AsyncStorage.setItem("isPhoneLogin",JSON.stringify(1))
            .then(()=>{
                /*console.log("isPhoneLogin存入成功")*/
            })
            .catch(()=>{
                /*console.log("isPhoneLogin存入失败")*/
            })
        var user_data = responseText.data
        if(responseText.code==0){
            AsyncStorage.setItem("user",JSON.stringify(user_data))
                .then(()=>{
                    /*console.log("user存入成功")*/
                })
                .catch(()=>{
                    /*console.log("user存入失败")*/
                })
           /* if(responseText.data.user_status != 0){
                /!*this.props.navigation.navigate("App",{selectedTab:"首页",user:JSON.stringify(user_data)})*!/
            }else{
                alert("您还没有登陆过，请填写状态")
            }*/
        }
    }
    //获取用户信息回调
    user_information(responseText){
        AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
            .then(()=>{
                /*console.log("用户信息存入成功")*/
                if(this.state.user_status != 0){
                    this.props.navigation.navigate("App",{selectedTab:"首页",user:JSON.stringify(this.state.user)})
                }else{
                    alert("您还没有登陆过，请填写状态")
                }
            })
            .catch(()=>{
                /*console.log("用户信息存入失败")*/
            })

    }
    service(){
        this.disabled(1)
        ToastAndroid.show('暂时还没有服务条款', ToastAndroid.SHORT)
    }
    //微信登录
    social(){
        this.disabled(1)
        wechat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                    wechat.sendAuthRequest("snsapi_userinfo", "123")
                        .then(responseCode => {
                            //返回code码，通过code获取access_token
                            this.getAccessToken(responseCode.code);
                        })
                        .catch(err => {
                            alert("hello")
                            Alert.alert('登录授权发生错误：', err.message, [
                                {text: '确定'}
                            ]);
                        })
                } else {
                        Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                            {text: '确定'}
                        ])
                }
            } );
    }
    checked(){
        this.disabled(1)
        let that = this
        that.setState({check:!this.state.check})
    }
    //验证码发送成功回调
    success(responseText){
        if(responseText.code==0 && responseText.msg=="success"){
            ToastAndroid.show('验证码已发出', ToastAndroid.SHORT)
            this.setState({clear:false})
            this.time = setInterval(()=>{
                this.setState({verify:this.state.count})
                this.state.count=this.state.count-1
                if(this.state.count<1){
                    this.setState({verify:this.state.once,liked:false,clear:true})
                    clearInterval(this.time)
                }
            },1000)
        }else{
            ToastAndroid.show(responseText.msg, ToastAndroid.SHORT)
        }
    }


    //发送验证码
    send(){
        this.disabled(1)
        var codeDomain= 0 ;
        var phone_val = this.state.text
        if(!(/^1[34578]\d{9}$/.test(this.state.text))){
            ToastAndroid.show('手机号有误请重新填写', ToastAndroid.SHORT)
            return false;
        }else {
                request_code_in_phone({phone:phone_val,type:codeDomain,uuid:"3454-e74532d-4c2f292-5d2488e-75c7049"},this.success)
        }
    }
    disabled(num){
        if(num==1){
            this.setState({disabled:true})
            setTimeout(()=>{
                this.setState({disabled:false})
            },500)
        }else{
            this.setState({disabled2:true})
            setTimeout(()=>{
                this.setState({disabled2:false})
            },500)
        }
    }
    render() {
        let check = !this.state.check?require("../../img/checkbox.png"):require("../../img/checked2.png")
        let once = this.state.liked?styles.once:styles.once1
        return (
            <View style={{backgroundColor:"#fff",paddingBottom:100,flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.title}>快速登录</Text>
                </View>
                <View style={{paddingTop:45}}>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"center",
                        marginBottom:10
                    }}>
                        <TextInput
                            style={styles.phone}
                            placeholder="请输入手机号"
                            onChangeText={(text) => {
                                this.setState({text})
                            }}
                            value={this.state.text}
                            underlineColorAndroid={"transparent"}
                            maxLength={11}
                        />

                    </View>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"center",
                    }}>
                        <TextInput
                            style={styles.validation}
                            placeholder="请输入验证码"
                            value={this.state.validation}
                            onChangeText={(validation) => {
                                this.setState({validation})
                            }}
                        />
                        <TouchableOpacity
                            disabled={this.state.disabled}
                            style={{
                            width:100,
                            height:45,
                            backgroundColor:"#fff",
                            borderRadius:5,
                            flexDirection:"row",
                            justifyContent:"center",
                            alignItems:"center",
                            borderWidth:1,
                            borderColor:"#f2f2f2",
                            marginLeft:10
                        }} onPress={this.send}>
                            <Text style={once}>{this.state.verify}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,
                        flexDirection:"row",
                        justifyContent:'center'
                    }}>
                        <View style={{width:335,flexDirection:"row",}}>
                            <TouchableNativeFeedback
                                disabled={this.state.disabled}
                                onPress={this.checked}>
                                <View ><Image source={check} style={{width:13,height:13}}/></View>
                            </TouchableNativeFeedback>
                            <View style={{marginLeft:5,marginTop:-4,flexDirection:"row"}}>
                                <TouchableHighlight
                                    disabled={this.state.disabled}
                                    onPress={this.service}>
                                    <Text style={{fontSize:15,color:"#262626"}}>阅读并同意</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>{this.props.navigation.navigate("Service")}}>
                                    <Text style={{color:"#ff8089",fontSize:15}}>《用户服务条款》</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        flexDirection:"row",
                        justifyContent:"center",
                        marginTop:20,
                    }}>
                        <View style={{width:335,height:45,}}>
                            <Button
                                    disabled={this.state.disabled2}
                                    title="登录"
                                    color="#ff8080"
                                    onPress={this.click}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:80,marginBottom:40}}>
                        <Text style={{fontSize:16,color:"#7A767A"}}>使用社交账号登录</Text>
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <View style={{width:335,flexDirection:"row",justifyContent:"center"}}>
                            <TouchableNativeFeedback
                                disabled={this.state.disabled}
                                onPress={this.social}><Image source={require("../../img/mm.png")}
                                                                                  style={{width:80,height:80}}
                            /></TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        justifyContent:"center",
        marginTop:50,
        marginBottom:35
    },
    title:{
        color:"#262626",
        fontSize:30,
        textAlign:"center"
    },
    phone:{
        height: 45,
        width:335,
        backgroundColor:"#f8f8f8",
        padding:0,
        borderRadius:5,
        fontSize:12,
        color:"#999",
        paddingLeft:30
    },
    validation:{
        width:225,
        height:45,
        backgroundColor:"#f8f8f8",
        borderRadius:5,
        paddingLeft:30,
        fontSize:12,
        padding:0,
        color:"#999",
    },
    once:{
        fontSize:12,
        color:"#ff8080"
    },
    once1:{
        fontSize:12,
        color:"#999"
    }
});