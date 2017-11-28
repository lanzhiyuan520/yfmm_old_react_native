import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    AsyncStorage,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import {requestTodayView} from "../api"
export default class RequiredList extends Component{
    constructor(props){
        super(props)
        this.state={
            index:1,
            suggest_data:{
                adapter:1,
                author_id:57,
                author_img:"http://cdn.ayi800.com/1504855038",
                author_name:"有福妈妈",
                author_title:"有福妈妈",
                banner:"http://cdn.ayi800.com/1504691922",
                better_num:0,
                care_num:0,
                collect_num:0,
                created_at:"2017-07-24 22:16:25",
                id:208,
                tags_ids:44,
                tags_name:"好好坐月子",
                title:"产后恢复操（上）",
                type:2,
                visit_num:1428,
                weight:0
            }
        }
        this.suggest_success=this.suggest_success.bind(this)
    }
    componentDidMount(){
        var user = this.props.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            //获取今日建议的文章
            requestTodayView(this.props.index,result.status,user.uuid,user.token,this.suggest_success)
        })

    }
    suggest_success(responseText){
        if(responseText.code != 0){
            this.setState({
                suggest_data:this.state.suggest_data
            })
        }else{
            this.setState({
                suggest_data:responseText.data.articleData
            })
        }

    }
    render(){
        return(
            <View style={{width:width,backgroundColor:"#fff"}}>
                <View>
                    <View style={{width:width,height:15,backgroundColor:"#f5f5f5"}}></View>
                        <View style={{width:width,justifyContent:"space-around",height:80,paddingRight:10,paddingLeft:10}}>
                            <View style={{width:width}}>
                                <Text style={{fontSize:14,color:"#000"}}>{this.state.suggest_data.title}</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontSize:12,color:"#999",marginRight:10}}>{/*{this.state.suggest_data.created_at}*/}</Text>
                                <Text style={{fontSize:12,color:"#999"}}>阅读 {this.state.suggest_data.created_at}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:width,height:80,flexDirection:"row",alignItems:"center",borderColor:"#f2f2f2",borderTopWidth:1,borderBottomWidth:1}}>
                        <View style={{width:width,flexDirection:"row",paddingLeft:10,paddingRight:10,alignItems:"center"}}>
                            <View style={{marginRight:10}}>
                                <Image source={{uri:this.state.suggest_data.author_img}} style={{width:30,height:30,borderRadius:15}} />
                            </View>
                            <View>
                                <Text style={{color:"#333",fontSize:13}}>{this.state.suggest_data.author_name}</Text>
                            </View>
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
                                <Text style={{color:"#ff8080",fontSize:15}}>+关注</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
        )
    }
}