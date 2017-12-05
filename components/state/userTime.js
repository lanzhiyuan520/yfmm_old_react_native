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
import DatePicker from 'react-native-datepicker'
var selectTableWarp = {}
var user
export default class UserTime extends Component{
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
            year:"",
            month:"",
            day:"",
            text:"",
            chooseDate: new Date()
        }
        this.showPicker=this.showPicker.bind(this)
        this.submit=this.submit.bind(this)
        this.user=this.user.bind(this)
        this.state_success=this.state_success.bind(this)
        this.phone=this.phone.bind(this)

    }
    componentDidMount(){
        user = JSON.parse(this.props.navigation.state.params.user)
        if(this.props.navigation.state.params.state){
            this.setState({
                text:"预产期"
            })
        }else{
            this.setState({
                text:"宝宝生日"
            })
        }
    }
    phone(){
        if (Platform.OS === "android") {
            return (
                <TouchableWithoutFeedback onPress={()=>{this.showPicker()}}>
                    <View style={{width:100,height:35,backgroundColor:"#fff",borderRadius:5,borderWidth:1,borderColor:"#f2f2f2",justifyContent:"center",alignItems:"center"}}>
                        <Text>选择日期</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else if (Platform.OS === "ios") {
            return (
                <DatePicker
                    style={{width: width*0.9,height:100}}
                    date={this.state.chooseDate}
                    mode="date"
                    placeholder="选择日期"
                    format="YYYY-MM-DD"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    onDateChange={this._onDateChange.bind(this)}
                />
            )
        }
    }
    _onDateChange(data){
        this.setState({
            chooseDate:data
        })
        selectTableWarp.confinementDate=data
    }
    submit(){
        if(this.props.navigation.state.params.state){
            selectTableWarp.userStatus=1
        }else{
            selectTableWarp.userStatus=3
        }
        if(!selectTableWarp.confinementDate){
            alert("请选择时间")
            return false
        }
        //更改用户状态
        request_user_status(user,selectTableWarp,this.state_success)
    }
    state_success(responseText){
        if(responseText.code != 0){
            alert(responseText.msg)
        }else{
            //用户状态更改成功的话从新获取用户状态并存储
            user_status(user.id,user.uuid,user.token,this.user)
        }
    }
    user(responseText){

        AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
            .then(()=>{
                AsyncStorage.setItem("user",JSON.stringify(user))
                this.props.navigation.navigate("App",{selectedTab:"首页",user:JSON.stringify(user)})
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    //时间插件
    async showPicker(options) {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                /* alert(`你选择的时间是${year}年${month+1}月${day}日`)*/
                this.setState({
                    year:year,
                    month:month+1,
                    day:day
                })
                selectTableWarp.confinementDate=`${year}-${month+1}-${day}`
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    render(){
        return (
            <View style={{
                width:width,
                flex:1,
                backgroundColor:"#fff"
            }}>
                <View style={{marginTop:100,
                    justifyContent:"center",
                    alignItems:"center",
                    marginBottom:60
                }}>
                    <Text style={{color:"#000",fontSize:16}}>{this.state.text}</Text>
                    <Text style={{color:"#ff8089",fontSize:30}}>{this.state.year}年{this.state.month}月{this.state.day}日</Text>
                </View>
                <View style={{width:width,alignItems:'center'}}>
                    {
                        this.phone()
                    }
                </View>
                <TouchableWithoutFeedback onPress={()=>{
                    this.submit()
                }}>
                    <View style={{width:width,justifyContent:"center",alignItems:"center",marginTop:60}}>
                        <View style={{backgroundColor:"#ff8089",width:width*0.9,height:50,justifyContent:"center",alignItems:'center'}}>
                            <Text style={{color:"#fff",fontSize:15}}>提交</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}