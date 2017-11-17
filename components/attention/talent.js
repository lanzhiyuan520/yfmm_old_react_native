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
import {request_daren_care_data,request_user_action_list} from "../api"
export default class Attention extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            daren:[]
        }
        this.attention_list=this.attention_list.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({
            user:this.props.user
        })
        request_user_action_list(this.props.user.id,this.props.user.uuid,this.props.user.token,this.attention_list)
    }

    attention_list(responseText){
        this.setState({
            daren:responseText.data.dataList
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{width:width}}>
                    <FlatList
                        data={this.state.daren}
                        renderItem={({item})=>{
                            return (
                                <TouchableWithoutFeedback onPress={()=>{this.props.navigate.navigate("TalentDetailed",{
                                    id:item.id,
                                    user:this.props.user,
                                    img:item.img,
                                    name:item.name,
                                    care_num:item.care_num,
                                    content:item.content
                                })}}>
                                    <View style={{width:width,height:120,justifyContent:"center",backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2"}}>
                                        <View style={{
                                            width:width,
                                            height:80,
                                            paddingLeft:10,
                                            paddingRight:10,
                                            flexDirection:"row",
                                        }}>
                                            <View style={{marginRight:10,flex:1}}>
                                                <Image source={{uri:item.img}} style={{width:80,height:80,borderRadius:40}} />
                                            </View>
                                            <View style={{flex:4}}>
                                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                                    <Text style={{color:"#000",fontSize:18,marginRight:5}}>{item.name}</Text>
                                                    <Text style={{marginRight:5,fontSize:15}}>关注</Text>
                                                    <Text style={{marginRight:5,fontSize:15}}>{item.care_num}</Text>
                                                </View>
                                                <View style={{}}>
                                                    <Text style={{fontSize:16}} numberOfLines={2}>
                                                        {item.content}
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />

                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})