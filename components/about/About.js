import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class PersonalData extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "关于我们",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            disabled:false
        }
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
        return(
            <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
                <View style={{width:width,backgroundColor:"#fff"}}>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate('Service');this.disabled()}}>
                        <View style={{width:width,height:45,borderTopColor:"#f2f2f2",borderTopWidth:1,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>服务条款</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Image source={require("../../img/you.png")} style={{width:22,height:22}} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate('Declaration');this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>免责声明</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Image source={require("../../img/you.png")} style={{width:22,height:22}} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate('AboutUs');this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>关于我们</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Image source={require("../../img/you.png")} style={{width:22,height:22}} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
