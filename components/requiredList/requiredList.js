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
import Btn from './../column/att_btn';
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
            },
            attend:"false"
        }
        this.suggest_success=this.suggest_success.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this);
    }
    componentDidMount(){
        var user = this.props.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            //获取今日建议的文章
            requestTodayView(this.props.index,result.status,user.uuid,user.token,this.suggest_success)
        })

    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        const author_id=this.state.suggest_data.author_id+"";
        console.log(author_id)
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                console.log(result.guanzhu.daren.dataList)
                if(result.guanzhu.daren.dataList.indexOf(author_id) == -1){
                    this.setState({
                        attend:'false'
                    })
                    console.log("1");
                }else {
                    this.setState({
                        attend:'true'
                    })
                    console.log("2")
                }
                console.log(this.state.attend)
            }else{
                console.log('无数据')
            }
        }catch(error){
            console.log(error)
        }
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
            this._loadInitialState();
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
                        <View style={{position:"absolute",right:10}}>
                            <Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="8" id={this.state.suggest_data.author_id}/>
                        </View>
                    </View>
                </View>
        )
    }
}