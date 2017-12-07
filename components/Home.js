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
    FlatList,
    AsyncStorage,
    ImageBackground,
    ScrollView,
    RefreshControl
} from 'react-native';
import moment from 'moment';
import {setSpText,scaleSize} from "../font"
import Expertsdetails from "./Experts/Expertsdetails"
import Message from "./message"
import Smallfu from "./xiaofu/xiaofu"
import Loading from "./loading/loading"
import Diet from "./diet/diet"
import Video from "./video_list/video_list"
var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import {request_professionals_list, requestTodayView, request_noticelist, request_article_xiaofujingxuan} from "./api"
import {PullView} from 'react-native-pull';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Load from "./loading/loading";
export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            week:"",
            months:"",
            day:"",
            weeks:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
            xiaofu_list:[],
            loading:true,
            disabled:false,
            status:"",
            status_img:"",
            user:[],
            experts:{},
            suggest:{},
            read:"每周必读",
            data:{},
            message:false,
            sta:"",
            isRefreshing: false,
            loadMore:false,
            actionNum:0
        }
        this.loading=this.loading.bind(this)
        this.disabled=this.disabled.bind(this)
        this.answer_success=this.answer_success.bind(this)
        this.suggest_success=this.suggest_success.bind(this)
        /*this.message_success=this.message_success.bind(this)
        this.message_list=this.message_list.bind(this)*/
    }
    componentDidMount(){
            this.setState({
                user:JSON.parse(this.props.user),
                week:this.state.weeks[moment().format('d')-1],
                months:moment().month(),
                day:moment().dates(),
            })
        //获取用户状态
        AsyncStorage.getItem("user_data",(error,result)=>{
             result = JSON.parse(result)
            this.state.status=result.statusCon
            this.state.sta = result.status
            //根据用户状态判断显示的图片
            if(result.status == 3){
                this.state.status_img="http://cdn.ayi800.com/image/jpg/app_yueryuerqi.png"
            }else if(result.status == 2){
                this.state.status_img="http://cdn.ayi800.com/image/jpg/app_yueziyueziqi.png"
            }else if(result.status == 1){
                this.state.status_img="http://cdn.ayi800.com/image/jpg/app_yunqiyunqi.png"
            }
            //判断今日建议的文本
            if(result.status == 2){
                this.setState({
                    read:"每日必读"
                })
            }else if (result.status == 3){
                this.setState({
                    read:"每月必读"
                })
            }
            //首页有问必答
            request_professionals_list(0, 1, this.state.user.uuid, this.state.user.token, this.answer_success)
            //首页今日建议
            requestTodayView(result.period,result.status,this.state.user.uuid,this.state.user.token,this.suggest_success)
        })

    }
   /* message_list(){
        //首页消息列表
        request_noticelist(this.state.user.uuid,this.state.user.token,this.message_success)
    }*/
    //必读成功回调
    suggest_success(responseText){
        this.setState({
            suggest:responseText.data.articleData
        })
    }
    //问答成功回调
    answer_success(responseText){
        this.setState({
            experts:responseText.data[0]
        })
    }
    //控制loading的显示与隐藏
    loading(num){
        if(num==1){
            this.setState({
                loading:true
            })
        } else if(num==2){
            this.setState({
                loading:false
            })
        }

    }
    //消息列表成功回调
   /* message_success(responseText){
        console.log(responseText)
        var flag = 0
        for (var i = 0; i < responseText.data.length; i++) {
            if(!responseText.data.is_read){
                flag += 1
            }
        }
        if (flag > 0){
            this.setState({
                message:false
            })
        }else{
            this.setState({
                message:true
            })
        }
    }*/
    _onRefresh(){
        alert("刷新成功")
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
            <View style={{position:"relative"}}>
                    <Load loading={this.state.loading}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this._onRefresh()}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#999', '#999', '#999']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                <View style={{marginTop:-1,position:"relative"}}>
                    <ImageBackground  source={{uri:"http://cdn.ayi800.com/image/jpg/app_bgcbgc.png"}} style={{width:width,height:220}}/>
                    <ImageBackground  source={{uri:"http://cdn.ayi800.com/image/jpg/app_toptop_white.png"}} style={{width:width,height:20,position:"absolute",bottom:0}}/>
                    <View style={{
                        width:width,
                        height:200,
                        position:"absolute",
                        top:0,
                        left:0,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <Image source={{uri:this.state.status_img}} style={{
                            width:80,
                            height:80,

                        }}/>
                    </View>
                    <View style={{
                        width:width,
                        height:48,
                        position:"absolute",
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"row"
                    }}>
                        <View>
                            <Text style={{
                                color:"#fff",
                                fontSize:16,
                                backgroundColor:"transparent"
                            }}>{this.state.months+1}月{this.state.day}日 {this.state.week}</Text>
                        </View>
                        <TouchableWithoutFeedback
                            disabled={this.state.disabled}
                            onPress={()=>{
                                this.props.navigate('Message',{
                                    user:this.state.user,
                                   /* message_list:this.message_list*/
                                })
                                this.setState({disabled:true})
                                setTimeout(()=>{
                                    this.setState({disabled:false})
                                },500)
                        }}>
                            <View style={{
                                position:"absolute",
                                right:10
                            }}>
                                <FontAwesome name="bell-o" style={{fontSize: 20,backgroundColor:"transparent", color: "#fff",marginLeft:10}}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                        position:"absolute",
                        width:width,
                        height:48,
                        bottom:25,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <Text style={{color:"#fff",fontSize:14,backgroundColor:"transparent"}}>{this.state.status}</Text>
                    </View>
                </View>
                                <TouchableWithoutFeedback
                                    disabled={this.state.disabled}
                                    onPress={()=>{
                                        this.props.navigate('Required',{
                                            user:this.state.user,
                                            status:this.state.sta
                                        })
                                        this.setState({disabled:true})
                                        setTimeout(()=>{
                                            this.setState({disabled:false})
                                        },500)
                                    }}>
                                    <View style={{width:width,height:100,backgroundColor:"#fff"}}>
                                        <View style={styles.title}>
                                            <View>
                                                <Text style={styles.text}>{this.state.read}</Text>
                                            </View>
                                            <View>
                                                <FontAwesome name="angle-right" style={{fontSize: 18, color: "#000",marginLeft:10}}/>
                                            </View>
                                        </View>
                                        <View style={{
                                            paddingRight:10,
                                            paddingLeft:10,
                                            width:width,
                                            height:50,
                                        }}>
                                            <View style={{
                                                flexDirection:"row",
                                                justifyContent:"space-between"
                                            }}>
                                                <View style={{
                                                    height:50,
                                                    justifyContent:"space-between",

                                                }}>
                                                    <View>
                                                        <Text style={{color:"#666"}}>{this.state.suggest?this.state.suggest.title:""}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{fontSize:10}}>有{this.state.suggest?this.state.suggest.visit_num:""}人阅读</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Image source={{uri:this.state.suggest?this.state.suggest.banner:""}} style={{width:80,height:50}}/>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                    <Diet navigate={this.props.navigate} user={this.props.user} disabled={this.state.disabled} disabled_fun={this.disabled}/>
                <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                   <Video navigate={this.props.navigate} find={this.props.find} user={this.props.user} />
                    <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                    <View style={{width:width,height:100,backgroundColor:"#fff"}}>
                        <TouchableWithoutFeedback
                            disabled={this.state.disabled}
                            onPress={()=>{
                                this.props.navigate('ExpertsList',{
                                navigate:this.props.navigate,
                                user:this.state.user
                        })
                                this.setState({disabled:true})
                                setTimeout(()=>{
                                    this.setState({disabled:false})
                                },500)
                            }}>
                            <View style={styles.title}>
                                <View>
                                    <Text style={styles.text}>有问必答</Text>
                                </View>
                                <View>
                                    <FontAwesome name="angle-right" style={{fontSize: 18, color: "#000",marginLeft:10}}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.experts?<View style={{
                                flex:1,
                                flexDirection:"row",
                                alignItems:"center",
                                paddingRight:10,
                                paddingLeft:10,
                                position:"relative"
                            }}>
                                <View style={{flexDirection:"row",width:width*0.6}}>
                                    <View>
                                        <Image source={{uri:this.state.experts.img}} style={{width:50,height:50,borderRadius:25}}/>
                                    </View>
                                    <View style={{flexDirection:"column",marginLeft:5}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{color:"#000",fontSize:16,marginRight:5}}>{this.state.experts.name}</Text>
                                            <Text style={{fontSize:13,textAlignVertical:"center"}}>{this.state.experts.title}</Text>
                                        </View>
                                        <View>
                                            <Text numberOfLines={2} style={{fontSize:13,color:"#999"}}>{this.state.experts.content}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback
                                    disabled={this.state.disabled}
                                    onPress={()=>{
                                        this.props.navigate('Expertsdetails',{
                                            expert:this.state.experts.name,
                                            user:this.state.user,
                                            id:this.state.experts.id
                                        });
                                        this.setState({disabled:true})
                                        setTimeout(()=>{
                                            this.setState({disabled:false})
                                        },500)
                                    }}>
                                    <View style={{
                                        position:"absolute",
                                        right:10,
                                        width:80,
                                        height:35,
                                        borderRadius:3,
                                        backgroundColor:"#fff",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        borderWidth:1,
                                        borderColor:"#f5f5f5",
                                        flex:1
                                    }}>
                                        <Text style={{color:"#FF9490",fontSize:11}}>去问TA</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>:<View></View>
                        }
                    </View>
                    <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                    <Smallfu loading={this.loading}  user={this.props.user} navigate={this.props.navigate} disabled={this.state.disabled} disabled_fun={this.disabled}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",
        fontSize:14,
        fontWeight:"bold"
    },
    title:{
        width:width,
        height:40,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        justifyContent:"space-between"
    },
    title_img:{
        width:16,
        height:16
    },
    img_line:{
        position:"relative",
        marginRight:10
    },
    img_last:{
        marginRight:0
    }
})