import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Button,
    Dimensions,
    FlatList,
    AsyncStorage,
    InteractionManager
} from 'react-native';
/*
* 孕期护理 0 4 1 0
* 妇产护理 0 4 2 0
* 新生儿护理 0 4 3 0
* 母乳指导 0 4 4 0
* 育儿专家 0 4 5 0
*
* */
var {width} = Dimensions.get('window')
import {request_page_content_by_caregory} from "../api"
export default class ExpertsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:{},
            experts:[]
        }
        this.experts_list=this.experts_list.bind(this)
    }
    componentDidMount(){
        if (this.state.experts.length == 0){
            this.props.load(1)
        }else{
            this.props.load(2)
        }
        //获取用户状态来获取不同类型的专家列表
        InteractionManager.runAfterInteractions(()=>{
            AsyncStorage.getItem("user_data",(error,result)=>{
                result = JSON.parse(result)
                request_page_content_by_caregory(this.state.user.uuid, this.state.user.token,{offset:0,limit:4,category:this.props.index,action_num:0}, this.experts_list)
            })
        })

        this.setState({
            user:this.props.user
        })
    }

    experts_list(responseText){
        InteractionManager.runAfterInteractions(()=>{
            this.setState({
                experts:responseText.data
            })
        })
        this.props.load(2)
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                <FlatList
                    data={this.state.experts}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{
                                paddingLeft:10,
                                paddingRight:10,
                                height:100,
                                flexDirection:"row",
                                alignItems:"center",
                                position:"relative",
                                borderBottomColor:"#f5f5f5",
                                borderBottomWidth:1
                            }}>
                                <View>
                                    <Image source={{uri:item.img}} style={{width:80,height:80,borderRadius:40}}/>
                                </View>
                                <View style={{height:80,marginLeft:10,justifyContent:"space-between"}}>
                                    <Text style={{color:"#333",fontSize:16}}>{item.name}</Text>
                                    <Text style={{color:"#999",fontSize:14}}>{item.title}</Text>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{color:"#999",fontSize:14,marginRight:15}}>关注{item.care_num}</Text>
                                        <Text style={{color:"#999",fontSize:14}}>回答{item.reply_num}</Text>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback onPress={()=>{this.props.navigate("Expertsdetails",{
                                    expert:item.name,
                                    user:this.props.user,
                                    id:item.id
                                })}}>
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
                                        <Text style={{color:"#ff8080",fontSize:15}}>提问</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }}
                />

            </View>
        )
    }
}