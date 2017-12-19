import React, { Component } from 'react';
import {
    AppRegistry,
    Alert,
    Platform,
    AsyncStorage,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    Button,
    TextInput ,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight,
    Image ,
    StyleSheet,
    Text,
    View ,
    ScrollView,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
var WeChat=require('react-native-wechat');
import DeviceInfo from 'react-native-device-info'

var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import {
    request_code_in_phone,
    request_login_by_phone,
    user_status,
    access_token,
    weixin_user,
    wx_login
} from "../api"
var wx_user_access_token
var openid
var refresh_token
import Toast, {DURATION} from 'react-native-easy-toast'
import {bounces} from "../bounces/bounces"
import Load from "../loading/loading"
export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        header:null,
        gesturesEnabled:false
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
            countText:"S后再次发送",
            liked: true,
            clear: true,
            login: false,
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
        this.wx_access_token = this.wx_access_token.bind(this)
        this.wx_access_token_success = this.wx_access_token_success.bind(this)
        this.wx_user = this.wx_user.bind(this)
        this.wx_user_success = this.wx_user_success.bind(this)
        this.wx_login_success = this.wx_login_success.bind(this)
    }
    componentDidMount(){
        WeChat.registerApp('wx4185c118f9757414')
    }
    //手机号登录
    click(){
        this.disabled(2)
        if(!this.state.text){
            bounces('请输入手机号',this)
            return false
        }else{
            if(!(/^1[34578]\d{9}$/.test(this.state.text))){
                bounces('手机号有误请重新填写',this)
                return false;
            }
            var codeDomain= 0 ;
            var phone_val = this.state.text ;
            var code_val  = this.state.validation
            //判断是否同意服务条款
            if(!this.state.check){
                bounces('请同意服务条款',this)
                return false
            }
            //判断是否输入验证码
            if(!code_val){
                bounces('请输入验证码',this)
                return false
            }
            //手机登录接口
            AsyncStorage.getItem("uuid",(error,result)=>{
                this.setState({
                    loading:true
                })
                var uuid = JSON.parse(result)
                request_login_by_phone(uuid,{phone:phone_val,code:code_val,type:codeDomain},this.user_success)
            })
        }
    }
    //手机登录成功回调
    user_success(responseText){
        if(responseText.code != 0){
            this.setState({
                loading:false
            })
            bounces(responseText.msg,this)
            return false
        }else{
            this.state.user=responseText.data
            if (responseText.data.status != 0){
                //获取用户状态
                user_status(responseText.data.id,responseText.data.uuid,responseText.data.token,this.user_information)
                var user_data = responseText.data
                if(responseText.code==0){
                    //存入用户信息
                    AsyncStorage.setItem("user",JSON.stringify(user_data))
                        .then(()=>{

                        })
                        .catch(()=>{
                            console.log("user存入失败")
                        })
                }
            }else {
                this.setState({
                    loading:false
                })
                this.props.navigation.navigate("Userstate",{
                    user:JSON.stringify(this.state.user),
                    navigate:this.props.navigation.navigate
                })
            }


        }
    }
    //获取用户状态回调
    user_information(responseText){
        //存入用户状态
        AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
            .then(()=>{
                    this.setState({
                        loading:false
                    })
                    this.props.navigation.navigate("App",{selectedTab:"首页",user:JSON.stringify(this.state.user)})
            })
            .catch(()=>{

            })

    }
    service(){
        this.disabled(1)
        bounces('暂时还没有服务条款',this)
    }
    //获取微信access_token
    wx_access_token(code,appid,secret){
        access_token(code,appid,secret,this.wx_access_token_success)
    }
    //获取微信access_token成功回调
    wx_access_token_success(responseText){
        wx_user_access_token = responseText.access_token
        openid = responseText.openid
        refresh_token=responseText.refresh_token
        this.wx_user(wx_user_access_token,openid)
    }
    //获取微信用户信息
    wx_user(wx_user_access_token,openid){
        weixin_user(wx_user_access_token,openid,this.wx_user_success)
    }
    //获取微信用户信息成功回调
    wx_user_success(responseText){
        var responseText = responseText
        responseText.support = 1
        let wx_data = responseText
        AsyncStorage.getItem("uuid",(error,result)=>{
            var uuid = JSON.parse(result)
            wx_login(uuid,wx_data,wx_user_access_token,refresh_token,this.wx_login_success)
        })

    }
    //微信登录成功回调
    wx_login_success(responseText){
        this.user_success(responseText)
    }
    //微信登录
    social(){
        this.disabled(1)
        WeChat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                    WeChat.sendAuthRequest("snsapi_userinfo","123")
                        .then(responseCode => {
                            //返回code码，通过code获取access_token
                            let code = responseCode.code
                            let appid = "wx4185c118f9757414"
                            let secret = "5d046ff2594c09a4b867f8810eb103b6"
                            this.setState({
                                loading:true
                            })
                            this.wx_access_token(code,appid,secret)
                        })
                        .catch(err => {
                            console.log(err)
                            Alert.alert('登录授权发生错误：', err.message, [
                                {text: '确定'}
                            ]);
                        })
                } else {
                        Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                            {text: '确定'}
                        ])
                }
            } )
            .catch((error)=>{
                console.log(error)
            })
    }
    //勾选用户条款
    checked(){
        this.disabled(1)
        let that = this
        that.setState({check:!this.state.check})
    }
    //验证码发送成功回调
    success(responseText){
        if(responseText.code==0 && responseText.msg=="success"){
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
        }else{
            bounces(responseText.msg,this)
        }
    }


    //发送验证码
    send(){
        this.disabled(1)
        var codeDomain= 0 ;
        var phone_val = this.state.text
        if(!(/^1[34578]\d{9}$/.test(this.state.text))){
            bounces('手机号有误请重新填写',this)
            return false;
        }else {
            if(this.state.count==60){
                AsyncStorage.getItem("uuid",(error,result)=>{
                    var uuid = JSON.parse(result)
                    request_code_in_phone({phone:phone_val,type:codeDomain,uuid:uuid},this.success)
                })
            }else{
                bounces('请稍后再次发送',this)
            }
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
                <Toast ref="toast"/>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.loading}
                >
                    <Load loading={this.state.loading} />
                </Modal>
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
                            clearButtonMode={"while-editing"}
                            placeholder="请输入手机号"
                            onChangeText={(text) => {
                                this.setState({text})
                            }}
                            value={this.state.text}
                            underlineColorAndroid={"transparent"}
                            maxLength={11}
                        />

                    </View>
                    <View style={{width:width,justifyContent:"space-between",alignItems:"center"}}>
                        <View style={{
                            flexDirection:"row",
                            justifyContent:"center",
                            width:width*0.9
                        }}>
                            <TextInput
                                style={styles.validation}
                                clearButtonMode={"while-editing"}
                                placeholder="请输入验证码"
                                value={this.state.validation}
                                onChangeText={(validation) => {
                                    this.setState({validation})
                                }}
                                maxLength={6}
                                underlineColorAndroid="transparent"
                            />
                            <TouchableOpacity
                                disabled={this.state.disabled}
                                style={{
                                    flex:1,
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
                    </View>

                    <View style={{
                        marginTop:10,
                        flexDirection:"row",
                        justifyContent:'center',

                    }}>
                        <View style={{width:width*0.9,flexDirection:"row",}}>
                            <TouchableWithoutFeedback
                                disabled={this.state.disabled}
                                onPress={this.checked}>
                                <View ><Image source={check} style={{width:13,height:13}}/></View>
                            </TouchableWithoutFeedback>
                            <View style={{marginLeft:5,marginTop:-4,flexDirection:"row"}}>
                                <TouchableWithoutFeedback
                                    disabled={this.state.disabled}
                                    onPress={this.service}>
                                    <View>
                                        <Text style={{fontSize:15,color:"#262626"}}>阅读并同意</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("Service")}}>
                                    <View>
                                        <Text style={{color:"#ff8089",fontSize:15}}>《用户服务条款》</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        flexDirection:"row",
                        justifyContent:"center",
                        marginTop:20,
                    }}>

                            <TouchableWithoutFeedback
                                disabled={this.state.disabled2}
                                onPress={()=>{
                                this.disabled(2)
                                this.click();
                            }}>
                                <View style={{width:width*0.9,height:45,backgroundColor:"#ff8080",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{color:"#fff",fontSize:17}}>登录</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*<Button
                                    disabled={this.state.disabled2}
                                    title="登录"
                                    color="#ff8080"
                                    onPress={this.click}
                            />*/}


                    </View>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"center",
                        marginTop:20,
                    }}>

                        <TouchableWithoutFeedback onPress={()=>{
                            this.social();
                        }}>
                            <View style={{width:width*0.9,height:45,backgroundColor:"#01b488",justifyContent:"center",alignItems:"center"}}>
                                <Text style={{color:"#fff",fontSize:17}}>微信登录</Text>
                            </View>
                        </TouchableWithoutFeedback>

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
        width:width*0.9,
        backgroundColor:"#f8f8f8",
        padding:0,
        borderRadius:5,
        fontSize:12,
        color:"#999",
        paddingLeft:30
    },
    validation:{
        flex:3,
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