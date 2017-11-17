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
    FlatList
} from 'react-native';
var {width} = Dimensions.get('window')
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import {request_daren_care_data} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class TalentDetailed extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "达人详情",
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
            user:{},
            daren:[]
        }
        this.daren_detailed = this.daren_detailed.bind(this)
    }
    componentDidMount(){
        var id = this.props.navigation.state.params.id
        var user = this.props.navigation.state.params.user
        request_daren_care_data(id,user,this.daren_detailed)
    }
    daren_detailed(responseText){
        console.log(responseText)
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{marginBottom:15}}>
                    <View style={{width:width,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2"}}>
                        <View style={{width:width,height:80,paddingLeft:10,paddingRight:10,flexDirection:"row",alignItems:"center"}}>
                            <View style={{marginRight:10}}>
                                <Image source={{uri:this.props.navigation.state.params.img}} style={{width:60,height:60,borderRadius:30}} />
                            </View>
                            <View style={{flexDirection:"column",paddingLeft:10,height:50,justifyContent:"space-around"}}>
                                <Text style={{fontSize:14,color:"#000"}}>{this.props.navigation.state.params.name}</Text>
                                <Text style={{fontSize:12,color:"#999"}}>关注{this.props.navigation.state.params.care_num}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={()=>{}}>
                                <View style={{
                                    width:80,
                                    height:35,
                                    backgroundColor:"#fff",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    borderRadius:5,
                                    position:"absolute",
                                    right:10,
                                    borderWidth:1,
                                    borderColor:"#f2f2f2"
                                }}>
                                    <Text style={{color:"#ff8080",fontSize:15}}>关注</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={{width:width,backgroundColor:"#fff",height:40,paddingLeft:10}}>
                        <Text style={{color:"#333",fontSize:13}}>{this.props.navigation.state.params.content}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View>
                        <View style={{width:width,height:20,paddingLeft:10,paddingRight:10}}>
                            <Text style={{color:"#000",fontSize:14}}>Ta的动态</Text>
                        </View>
                        <View style={{width:width,height:70,paddingLeft:10,borderBottomWidth:1,borderBottomColor:"#f2f2f2",paddingRight:10,position:"relative",flexDirection:"row",alignItems:"center"}}>
                            <View style={{width:width,height:60,justifyContent:"space-between",flexDirection:"column"}}>
                                <View>
                                    <Text style={{color:"#333",fontSize:14}}>420宝宝学坐巧训练</Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{color:"#999",fontSize:13,marginRight:15}}>9月26日 52:15</Text>
                                    <Text style={{color:"#999",fontSize:13}}> 阅读2282</Text>
                                </View>
                            </View>
                            <View style={{width:80,height:60,position:"absolute",right:10}}>
                                <Image source={require("../../img/baobao.jpg")} style={{width:80,height:60}} />
                            </View>
                        </View>
                        <View style={{width:width,height:80,paddingLeft:10,borderBottomWidth:1,borderBottomColor:"#f2f2f2",paddingRight:10,position:"relative",flexDirection:"row",alignItems:"center"}}>
                            <View style={{width:width,height:60,justifyContent:"space-between",flexDirection:"column"}}>
                                <View>
                                    <Text style={{color:"#333",fontSize:14}}>420宝宝学坐巧训练</Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{color:"#999",fontSize:13,marginRight:15}}>9月26日 52:15</Text>
                                    <Text style={{color:"#999",fontSize:13}}> 阅读2282</Text>
                                </View>
                            </View>
                            <View style={{width:80,height:60,position:"absolute",right:10}}>
                                <Image source={require("../../img/baobao.jpg")} style={{width:80,height:60}} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

})