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
import {request_user_status} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var selectTableWarp = {}
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            disabled:false,
            production:require("../../img/yuchanl.png"),
            birth:require("../../img/chusheng2.png"),
            Sta:false,
            state:true,
            Text:"宝宝生日",
        }
        this.production=this.production.bind(this)
        this.birth=this.birth.bind(this)
        this.submit=this.submit.bind(this)
        this.showPicker=this.showPicker.bind(this)
    }
    async showPicker(options) {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
               /* alert(`你选择的时间是${year}年${month+1}月${day}日`)*/
                selectTableWarp.confinementDate=year+"-"+month+"-"+day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({submit:this.submit})

    }
    submit(){
        var user = this.props.navigation.state.params.user
        if(this.state.state){
               selectTableWarp.userStatus=1
        }else{
            selectTableWarp.userStatus=3
        }
        AsyncStorage.getItem("user_data",(error,result)=>{
            request_user_status(user,this.state.selectTableWarp,this.state_success)
        })
        console.log(selectTableWarp)
        /*this.props.navigation.navigate("App",{
            selectedTab:"我的"
        })*/
    }
    state_success(responseText){
        console.log(responseText)
    }
    production(){
            this.setState({
                production:require("../../img/yuchan2.png"),
                birth:require("../../img/chusheng.png"),
                Sta:true,
                state:false,
                Text:"我的预产期"
            })
    }
    birth(){
        this.setState({
            production:require("../../img/yuchanl.png"),
            birth:require("../../img/chusheng2.png"),
            Sta:false,
            state:true,
            Text:"宝宝生日"
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
    render(){
        let text = this.state.Sta?styles.text:styles.pinkText;
        let statetext = this.state.state?styles.text:styles.pinkText;
        return(
            <View style={{flex:1,backgroundColor:"#fff",borderTopColor:"#f2f2f2",borderTopWidth:1}}>
                <View style={{width:width,height:45,justifyContent:"center",alignItems:"center"}}>
                    <Text>状态选择</Text>
                </View>
                <View style={{width:width,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:width*0.9,flexDirection:"row",justifyContent:"space-around"}}>
                        <TouchableWithoutFeedback onPress={this.production}>
                            <View style={{alignItems:"center"}}>
                                <Image source={this.state.production} style={{width:150,height:150}} />
                                <Text style={statetext}>我怀孕了</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.birth}>
                            <View style={{alignItems:"center"}}>
                               <Image source={this.state.birth} style={{width:150,height:150}}/>
                                <Text style={text}>宝宝已出生</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{width:width,height:100,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#666",fontSize:17}}>{this.state.Text}</Text>
                </View>
                <View style={{width:width,alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>{this.showPicker()}}>
                        <View style={{width:100,height:35,backgroundColor:"#fff",borderRadius:5,borderWidth:1,borderColor:"#f2f2f2",justifyContent:"center",alignItems:"center"}}>
                            <Text>选择日期</Text>
                        </View>
                    </TouchableWithoutFeedback>
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