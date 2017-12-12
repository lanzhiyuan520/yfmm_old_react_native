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
    ToastAndroid,
    AsyncStorage,
    ScrollView,
    WebView
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '微信朋友圈', '微信好友', '复制到剪切板']
var WeChat=require('react-native-wechat');
var {width} = Dimensions.get('window')
var user
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_article_xiaofu_xiangqing} from "../api"
import Btn from './../column/att_btn';
import Header from './../commen/header';
import HTMLView from "react-native-htmlview"
import Share from './../commen/share';
export default class XfDetailed extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
        /*title: "小福精选",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:18
        },
        headerStyle:{
            elevation: 0,
        },
        headerRight: (
            <View style={{flexDirection:"row"}}>
            <TouchableWithoutFeedback
                onPress={()=>{navigation.state.params.collect()}}>
                <FontAwesome name="heart" style={{fontSize: 20, color: "#ff8080",marginRight:10}}/>
            </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{navigation.state.params.navigatePress()}}>
                    <FontAwesome name="share-alt" style={{fontSize: 20, color: "#ff8080",marginRight:10}}/>
                </TouchableWithoutFeedback>
           </View>
        )
        ,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,*/
    })
    constructor(props){
        super(props)
        this.state = {
            collect: false,
            xiaofu: {},
            user_behavior: null,
            attend:"false",
            heart:true,
            show:false
        }
        WeChat.registerApp('wx825ecd9a849eef9d')
        this.showActionSheet = this.showActionSheet.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.collect = this.collect.bind(this)
        this.xiaofu_detailed = this.xiaofu_detailed.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this);
        this.shareShow=this.shareShow.bind(this);
    }

    componentDidMount(){
        //判断有没有传这个值过来，有传的话说明是从消息页面跳转过来的，则从新刷新消息列表
        if( this.props.navigation.state.params.list){
            this.props.navigation.state.params.list()
        }
        var id = this.props.navigation.state.params.id
        if(this.props.navigation.state.params.video){
            user = this.props.navigation.state.params.user
        }else {
            user = JSON.parse(this.props.navigation.state.params.user);
        }

        //获取小福精选详情页
        request_article_xiaofu_xiangqing(id,user.uuid,user.token,this.xiaofu_detailed)
        this.props.navigation.setParams({navigatePress:this.showActionSheet,collect:this.collect})
    }
    xiaofu_detailed(responseText){
        console.log(responseText)
        this.setState({
            xiaofu:responseText.data,
            heart:false
        })
        this._loadInitialState();
    }
    showActionSheet() {
        this.ActionSheet.show()
    }
    collect(){
        this.setState({
            collect:!this.state.collect
        })
    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            var id = this.state.xiaofu.id
            const author_id=this.state.xiaofu.author_id+"";
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
                if(result.shoucang.yinshi.dataList.indexOf(id) !== -1){
                    this.setState({
                        show:false,
                        heart:false
                    })
                }else {
                    this.setState({
                        show:false,
                        heart:true
                    })
                }
            }else{
                console.log('无数据')
            }
        }catch(error){
            console.log(error)
        }
    }
    handlePress(i) {
        if(i==0){
            alert("点了取消")
        } else if(i==1){
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToTimeline({type: "text",description:this.state.xiaofu.title})
                            .catch((error) => {
                                ToastAndroid(error.message);
                            });
                    } else {
                        ToastAndroid('没有安装微信软件，请您安装微信之后再试');
                    }
                });
        } else if(i==2){
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToSession({type: "text",description:this.state.xiaofu.title})
                            .catch((error) => {
                               console.log(error)
                            });
                    } else {
                        console.log('没有安装微信软件，请您安装微信之后再试');
                    }
                });
        } else if(i==3){
            alert("点了剪切板")
        }
    }
    //控制分享组件显示
    shareShow(){
        this.setState({
            show:true
        })
    }
    render(){
        return(
            <View style={{width:width,backgroundColor:"#fff",flex:1}}>
                <Header title="小福精选" id={this.state.xiaofu.id} heart={this.state.heart} back="true" isheart='true' shareShow={()=>this.shareShow()} navigation={this.props.navigation}/>
                  <ScrollView>
                <View style={{
                    width:width,
                    height:80,
                    paddingLeft:10,
                    justifyContent:"center",
                    borderTopColor:"#f5f5f5",
                    borderTopWidth:1
                }}>
                    <View style={{width:width,height:50,justifyContent:"space-between",paddingRight:10}}>
                        <View>
                            <Text style={{fontSize:16,color:"#333",fontWeight:"bold"}}>{this.state.xiaofu.title}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"#999"}}> {this.state.xiaofu.created_at} </Text>
                            <Text style={{color:"#999",marginLeft:20}}>阅读 {this.state.xiaofu.visit_num}</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:width,height:70}}>
                    <View style={{
                        width:width,
                        height:70,
                        paddingLeft:10,
                        paddingRight:10,
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        borderTopWidth:1,
                        borderTopColor:"#f5f5f5",
                        borderBottomWidth:1,
                        borderBottomColor:"#f5f5f5"
                    }}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate("ExpertDetail",{
                                id:this.state.xiaofu.author_id,
                                daren:this._loadInitialState
                            })
                        }}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Image source={{uri:this.state.xiaofu.author_img}} style={{width:46,height:46,borderRadius:23}}/>
                                <Text style={{marginLeft:10}}>{this.state.xiaofu.author_name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{position:"absolute",right:10}}>
                            <Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="8" id={this.state.xiaofu.author_id}/>
                        </View>
                    </View>
                </View>
                  <View style={{width:width}}>
                      <HTMLView
                          value={this.state.xiaofu.content}
                          stylesheet={styles}
                      />
                  </View>
                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </View>
              </ScrollView>
                <Share show={this.state.show} id={this.state.xiaofu.id} url="article" title={this.state.xiaofu.title} type="999" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    p:{
      marginTop:-5,
        marginBottom:-5
    },
    attention:{
        color:"#FF9490"
    },
    Has_attention:{
        color:"#999"
    }
})