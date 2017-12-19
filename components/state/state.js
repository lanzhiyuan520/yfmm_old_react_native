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
    AsyncStorage,
    DatePickerIOS,
    ToastAndroid,
    AlertIOS,

} from 'react-native';
var {width} = Dimensions.get('window')
import {request_user_status,user_status} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var selectTableWarp = {}
var user
import DatePicker from 'react-native-datepicker'
import {bounces} from "../bounces/bounces"
import Toast, {DURATION} from 'react-native-easy-toast'
export default class State extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "我的状态",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.submit()}}><View style={{marginRight:10}}><Text style={{color:"#ff8089",fontSize:14}}>提交</Text></View></TouchableWithoutFeedback>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            disabled:false,
            production:"http://cdn.ayi800.com/image/jpg/app_yuchan2yuchanl.png",
            birth:"http://cdn.ayi800.com/image/jpg/app_chushengchusheng2.png",
            Sta:false,
            state:null,
            Text:"宝宝生日",
            text_color:true,
            chooseDate: new Date()
        }
        this.production=this.production.bind(this)
        this.birth=this.birth.bind(this)
        this.submit=this.submit.bind(this)
        this.showPicker=this.showPicker.bind(this)
        this.state_success=this.state_success.bind(this)
        this.user=this.user.bind(this)
        this.phone=this.phone.bind(this)
    }
    _onDateChange(data){
        this.setState({
            chooseDate:data
        })
        selectTableWarp.confinementDate=data
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
    //时间插件
    async showPicker(options) {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
               /* alert(`你选择的时间是${year}年${month+1}月${day}日`)*/
                selectTableWarp.confinementDate=/*year+"-"+month+"-"+day*/`${year}-${month+1}-${day}`
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({submit:this.submit})
    }
    submit(){
         user = this.props.navigation.state.params.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            if(this.state.state){
                selectTableWarp.userStatus=1
            }else{
                selectTableWarp.userStatus=3
            }
            if(!selectTableWarp.confinementDate){
                bounces("请选择时间",this)
                return false
            }
            //更改用户状态
            request_user_status(user,selectTableWarp,this.state_success)
        })
    }
    state_success(responseText){
        if(responseText.code != 0){
            bounces(responseText.msg,this)
        }else{
            //用户状态更改成功的话从新获取用户状态并存储
            user_status(user.id,user.uuid,user.token,this.user)
        }
    }
    user(responseText){
        AsyncStorage.setItem("user_data",JSON.stringify(responseText.data))
            .then(()=>{
                this.props.navigation.navigate("App",{selectedTab:"我的",user:JSON.stringify(user)})
            })
            .catch((error)=>{
                console.log(error)
            })

    }
    production(){
            this.setState({
                production:"http://cdn.ayi800.com/image/jpg/app_yuchanyuchan2.png",
                birth:"http://cdn.ayi800.com/image/jpg/app_chusheng2chusheng.png",
                Sta:true,
                Text:"我的预产期",
                text_color:false
            })
        this.state.state=true
    }
    birth(){
        this.setState({
            production:"http://cdn.ayi800.com/image/jpg/app_yuchan2yuchanl.png",
            birth:"http://cdn.ayi800.com/image/jpg/app_chushengchusheng2.png",
            Sta:false,
            Text:"宝宝生日",
            text_color:true
        })
        this.state.state=false
    }
    disabled(){
        this.setState({
            disabled:true
        })
        setTimeout(()=>{
            this.setState({disabled:false})
        },500)
    }
    render(){
        let text = this.state.Sta?styles.text:styles.pinkText;
        let statetext = this.state.text_color?styles.text:styles.pinkText;
        return(
            <View style={{flex:1,backgroundColor:"#fff",borderTopColor:"#f2f2f2",borderTopWidth:1}}>
                <Toast ref="toast"/>
                <View style={{width:width,height:45,justifyContent:"center",alignItems:"center"}}>
                    <Text>状态选择</Text>
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
                <View style={{width:width,height:100,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#666",fontSize:17}}>{this.state.Text}</Text>
                </View>
                <View style={{width:width,alignItems:'center'}}>
                    {
                        this.phone()
                    }
                </View>
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