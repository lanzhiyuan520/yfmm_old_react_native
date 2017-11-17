import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    TextInput,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Opinion extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "意见反馈",
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
            text:null
        }
        this.submit=this.submit.bind(this)
    }

    componentDidMount(){
        this.props.navigation.setParams({submit:this.submit})
    }
    submit(){
        this.props.navigation.navigate("App",{
            selectedTab:"我的"
        })
    }
    render(){
        return(
            <View style={{width:width,flex:1,backgroundColor:"#f5f5f5"}}>
                <View style={{width:width,height:300,backgroundColor:"#fff",paddingRight:10,paddingLeft:10}}>
                    <TextInput
                        style={{height: 45,backgroundColor:"#fff"}}
                        placeholder="请填写下你的问题"
                        onChangeText={(text) => {
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
