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
    Dimensions,
    ToastAndroid,
    WebView,
    ScrollView
} from 'react-native';
var {width} = Dimensions.get('window')
import {requestTodayView} from "../api"
import Btn from './../column/att_btn';
import Video from 'react-native-video';
import {bounces} from "../bounces/bounces"
import Toast, {DURATION} from 'react-native-easy-toast'
import HTMLView from "react-native-htmlview"
var user
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
                content:"",
                tags_ids:44,
                tags_name:"好好坐月子",
                title:"产后恢复操（上）",
                type:2,
                visit_num:1428,
                weight:0,
                video:"http://cdn.ayi800.com/产后按摩.mp4"
            },
            attend:"false",
            play:false
        }
        this.suggest_success=this.suggest_success.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this);
    }
    componentDidMount(){
         user = this.props.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            //获取今日建议的文章
            requestTodayView(this.props.index,result.status,user.uuid,user.token,this.suggest_success)
        })
    }
    showVideo(){
        if(this.state.play){
            return(
                <View style={{flex:1}}>
                    <Video
                        ref="myvideo"
                        resizeMode='cover'
                        source={{uri:this.state.suggest_data.video,type: 'mp4'}}
                        style={{width:width,height:200,backgroundColor:"#fff"}}
                        onLoad={this.onLoad}
                        onError={this.onError}
                        onProgress={this.onProgress}
                    />
                </View>
            )
        }else {
            return(
                <View style={{width:width}}>
                    <Image style={{width:width,height:200}} source={{uri:this.state.suggest_data.banner}}/>
                    <TouchableWithoutFeedback onPress={()=>this.setState({play:true})}>
                        <View style={{position:'absolute',left:width/2,top:100,marginLeft:-25,marginTop:-25,zIndex:999}}>
                            <Image style={{width:50,height:50}} source={{uri:"http://cdn.ayi800.com/app_faxian/@2px_btn_play_big.png"}}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.mask}></View>
                </View>
            )
        }
    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        const author_id=this.state.suggest_data.author_id+"";
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                if(result.guanzhu.daren.dataList.indexOf(author_id) == -1){
                    this.setState({
                        attend:'false'
                    })
                }else {
                    this.setState({
                        attend:'true'
                    })
                }
            }else{
                console.log('无数据')
            }
        }catch(error){
            console.log(error)
        }
    }
    onLoad(info){
        // info == {currentTime,duration,...}
        bounces('视频加载成功！', this);
    }
    onError(e){
        bounces('视频加载错误！',this);
    }

    onProgress(info){
        // info == {currentTime: 0, playableDuration: 0}
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
            <View style={{flex:1,width:width,backgroundColor:"#fff"}}>
                <Toast ref="toast"/>
                <ScrollView>
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
                    <View>
                        {this.showVideo()}
                    </View>
                    <View>
                        <HTMLView
                            value={this.state.suggest_data.content}
                        />
                    </View>
                </ScrollView>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    mask:{
        width:width,
        height:200,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        left:0
    }
})