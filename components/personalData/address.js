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
    AsyncStorage
} from 'react-native';
var postData = {}
var {width} = Dimensions.get('window')
import {address} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Phone extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "地址",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.preservation()}}><View style={{marginRight:10}}><Text style={{color:"#ff8089",fontSize:15}}>保存</Text></View></TouchableWithoutFeedback>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.go()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            text:""
        }
        this.preservation=this.preservation.bind(this)
        this.go=this.go.bind(this)
        this.address_success=this.address_success.bind(this)
    }
    componentDidMount(){
        this.props.navigation.setParams({preservation:this.preservation,go:this.go})
    }
    preservation(){
        var user = this.props.navigation.state.params.user
        if(!this.state.text){
            return false
        }
        address(user,postData,this.address_success)
    }
    address_success(responseText){
        var user = this.props.navigation.state.params.user
        user.address = this.state.text
        AsyncStorage.setItem("user",JSON.stringify(user))
        this.props.navigation.navigate("App",{
            selectedTab:"我的",
            user:JSON.stringify(user)
        })

    }
    go(){
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{width:width,height:150,borderBottomColor:"#f2f2f2",borderBottomWidth:1,borderTopColor:"#f2f2f2",borderTopWidth:1,backgroundColor:"#fff"}}>
                    <TextInput
                        onChangeText={(text) => {
                            postData.address=text
                            this.setState({
                                text:text
                            })
                        }}
                        underlineColorAndroid={"transparent"}
                    />
                </View>
            </View>
        )
    }
}
