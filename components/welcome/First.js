import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    View,
    AsyncStorage,
    ActivityIndicator,
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';

var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import DeviceInfo from 'react-native-device-info'
import {user_status} from "../api"
import CryptoJS from "crypto-js"
import {bounces} from "../bounces/bounces"
export default class First extends Component {
    static navigationOptions = {
        title: 'Welcome',
        header:null
    };
    constructor() {
        super();
        this.state={
            loading:true,
            diet_list:[],
            count:null,
            user_information:{}
        }
        this.user_success=this.user_success.bind(this)
    };
    componentDidMount(){
        var uuid = DeviceInfo.getUniqueID()
        console.log(uuid)
        if(uuid != 36){
            uuid = CryptoJS.MD5(uuid).toString();
            uuid = uuid.replace(/(\S)(?=((\S{7})+)$)/g,'$1-');
        }
        AsyncStorage.setItem("uuid",JSON.stringify(uuid))
        setTimeout(()=>{
            try {
                //第一次打开页面先去获取isPhoneLogin字段
                AsyncStorage.getItem(
                    'isPhoneLogin',
                    (error,result)=>{
                        //判断如果没有则跳转欢迎页面
                        if (result==null || result==""){
                            this.setState({
                                loading:false
                            })
                            //存入isPhoneLogin字段说明不是第一次打开了
                            AsyncStorage.setItem("isPhoneLogin",JSON.stringify(1))
                            this.props.navigation.navigate("Welcome")
                            return false
                        }else{
                            //如果有说明不是第一次登录，再去获取用户信息
                            AsyncStorage.getItem("user",(error,result)=>{
                                //如果没有则说明已经退出登录或者没有登录过，跳转到登录页面
                                if(result==null || result==""){
                                    this.setState({
                                        loading:false
                                    })
                                    this.props.navigation.navigate("Login")
                                }else{
                                    //如果有用户信息则跳转到首页
                                    this.setState({
                                        loading:false
                                    })
                                    var user = JSON.parse(result)
                                        //获取用户状态
                                    user_status(user.id,user.uuid,user.token,this.user_success)
                                    this.props.navigation.navigate("App",{
                                        selectedTab:"首页",
                                        user:result
                                    })
                                }
                            })
                        }
                    }
                )

            }catch(error){
                alert('失败'+error);
            }
        })

    }
    user_success(responseText){
        console.log(responseText)
        if (responseText.code != 0){
            bounces("账号已过期，请重新登录")
            this.props.navigation.navigate("Login")
            return false
        }else{
            AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
        }

    }
    render() {
        return (
            <View style={{width:width,height:height,backgroundColor:"#fff",position:"relative",alignItems:"center"}}>
                <View style={{position:"absolute",top:height/4}}>
                    <Image source={require("../../img/share.png")} style={{width:100,height:100,borderRadius:10}} />
                </View>
                <View style={{width:width,alignItems:"center"}}>
                    <ActivityIndicator
                        animating={this.props.loading}
                        size='large'
                        style={[styles.centering, styles.gray]}
                    />
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    centering: {
        top:height/2
    },
    gray: {
        backgroundColor: 'transparent'
    },
});
