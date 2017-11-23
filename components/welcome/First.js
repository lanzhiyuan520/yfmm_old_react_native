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
    ToastAndroid
} from 'react-native';

var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import {user_status} from "../api"
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
        /*this.user_success=this.user_success.bind(this)*/
    };
    componentDidMount(){
        setTimeout(()=>{
            try {
                AsyncStorage.getItem(
                    'isPhoneLogin',
                    (error,result)=>{
                        if (result==null || result==""){
                            /*alert('取值失败:'+error+"用户第一次打开app");*/
                            /*AsyncStorage.setItem("first","first")*/
                            this.setState({
                                loading:false
                            })
                            this.props.navigation.navigate("Welcome")
                            return false
                        }else{
                            AsyncStorage.getItem("user",(error,result)=>{
                                if(result==null || result==""){
                                    this.setState({
                                        loading:false
                                    })
                                    this.props.navigation.navigate("Login")
                                }else{
                                    this.setState({
                                        loading:false
                                    })
                                    var user = JSON.parse(result)
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
        AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
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
