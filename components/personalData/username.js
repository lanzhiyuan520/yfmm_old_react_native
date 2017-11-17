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
    TextInput
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Username extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "用户名",
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            text:null
        }
        this.preservation=this.preservation.bind(this)
    }
    componentDidMount(){
        this.props.navigation.setParams({preservation:this.preservation})
    }
    preservation(){
        this.props.navigation.navigate("App",{
            selectedTab:"我的"
        })
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
                <TextInput
                    style={{
                        width:width,
                        height:45,
                        backgroundColor:"#fff",
                        marginTop:10,
                        borderTopWidth:1,
                        borderTopColor:"#f2f2f2",
                        borderBottomWidth:1,
                        borderBottomColor:"#f2f2f2"
                    }}
                    underlineColorAndroid={"transparent"}
                    onChangeText={(text) => {
                        this.setState({
                            text:text
                        })
                    }}
                />
            </View>
        )
    }
}
