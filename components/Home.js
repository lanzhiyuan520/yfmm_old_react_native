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
<<<<<<< HEAD
    FlatList
} from 'react-native';
export default class Home extends Component{

    render(){
        return(
            <View>
                <Text>首页</Text>
            </View>
=======
    FlatList,
    ScrollView,
    ToastAndroid,
    ImageBackground,
    AsyncStorage,
    BackHandler,
    InteractionManager
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
import {request_professionals_list,requestTodayView} from "./api"
import {PullView} from 'react-native-pull';
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
            status_img:null,
            user:[],
            experts:[],
            suggest:{},
            read:"每周必读"
        }
        this.loading=this.loading.bind(this)
        this.disabled=this.disabled.bind(this)
        this.clear=this.clear.bind(this)
        this.onPullRelease=this.onPullRelease.bind(this)
        this.answer_success=this.answer_success.bind(this)
        this.suggest_success=this.suggest_success.bind(this)
        this.renderItem=this.renderItem.bind(this)
    }
    clear(){
        /*try {
            AsyncStorage.removeItem(
                "isPhoneLogin",
                (error)=>{
                    if(!error){
                        alert('数据清除成功');
                    }
                }
            )
        }catch (error){
            alert('失败',+error);
        }*/
    }
    componentDidMount(){
            this.setState({
                user:JSON.parse(this.props.user),
                week:this.state.weeks[moment().format('d')-1],
                months:moment().month(),
                day:moment().dates(),
            })
        AsyncStorage.getItem("user_data",(error,result)=>{
             result = JSON.parse(result)
            this.state.status=result.statusCon
            if(result.status == 3){
                this.state.status_img=require("../img/yuerqi.png")
            }else if(result.status == 2){
                this.state.status_img=require("../img/yueziqi.png")
            }else if(result.status == 1){
                this.state.status_img=require("../img/yunqi.png")
            }
            if(result.status == 2){
                this.setState({
                    read:"每日必读"
                })
            }else if (result.status == 3){
                this.setState({
                    read:"每月必读"
                })
            }
            request_professionals_list(0, 1, this.state.user.uuid, this.state.user.token, this.answer_success)
            requestTodayView(result.period,result.status,this.state.user.uuid,this.state.user.token,this.suggest_success)
        })

    }
    //必读成功回调
    suggest_success(responseText){
        this.setState({
            suggest:responseText.data.articleData
        })
    }
    //问答成功回调
    answer_success(responseText){
        this.setState({
            experts:responseText.data
        })
    }
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
    renderItem = ({item,index})=>{
        if(index==0){
           return  <View style={{
               flex:1,
               flexDirection:"row",
               alignItems:"center",
               paddingRight:10,
               paddingLeft:10,
               position:"relative"
           }}>
               <View style={{flexDirection:"row"}}>
                   <View>
                       <Image source={{uri:item.img}} style={{width:50,height:50,borderRadius:20}}/>
                   </View>
                   <View style={{flexDirection:"column", width:210,marginLeft:5}}>
                       <View style={{flexDirection:"row"}}>
                           <Text style={{color:"#000",fontSize:16,marginRight:5}}>{item.name}</Text>
                           <Text style={{fontSize:13,textAlignVertical:"center"}}>{item.title}</Text>
                       </View>
                       <View>
                           <Text numberOfLines={2} style={{fontSize:13,color:"#999"}}>{item.content}</Text>
                       </View>
                   </View>
               </View>
               <TouchableWithoutFeedback
                   disabled={this.state.disabled}
                   onPress={()=>{
                       this.props.navigate('Expertsdetails',{
                           expert:item.name,
                           user:this.state.user,
                           id:item.id
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
                       borderColor:"#f5f5f5"
                   }}>
                       <Text style={{color:"#FF9490",fontSize:11}}>去问TA</Text>
                   </View>
               </TouchableWithoutFeedback>
           </View>
        }else{
           return <View></View>
        }

    }
    onPullRelease(resolve){
        /*setTimeout(()=>{
            resolve();
        },3000)*/
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
            <PullView onPullRelease={this.onPullRelease}>
            <View style={{position:"relative"}}>
                <Loading loading={this.state.loading}/>
                <ScrollView>
                <View style={{marginTop:-1,position:"relative"}}>
                    <ImageBackground  source={require("../img/bgc.png")} style={{width:width,height:220}}/>
                    <ImageBackground  source={require("../img/top_white.png")} style={{width:width,height:20,position:"absolute",bottom:0}}/>
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
                        <Image source={this.state.status_img} style={{
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
                                fontSize:16
                            }}>{this.state.months+1}月{this.state.day}日 {this.state.week}</Text>
                        </View>
                        <TouchableWithoutFeedback
                            disabled={this.state.disabled}
                            onPress={()=>{
                                this.props.navigate('Message')
                                this.setState({disabled:true})
                                setTimeout(()=>{
                                    this.setState({disabled:false})
                                },500)
                        }}>
                            <View style={{
                                position:"absolute",
                                right:10
                            }}>
                                <Text style={{
                                    color:"#fff",
                                    fontSize: 16
                                }}>消息</Text>
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
                        <Text style={{color:"#fff",fontSize:14}}>{this.state.status}</Text>
                    </View>
                </View>
                                <TouchableWithoutFeedback
                                    disabled={this.state.disabled}
                                    onPress={()=>{
                                        this.props.navigate('Required',{
                                            user:this.state.user
                                        })
                                        this.setState({disabled:true})
                                        setTimeout(()=>{
                                            this.setState({disabled:false})
                                        },500)
                                        this.clear()
                                    }}>
                                    <View style={{width:width,height:100,backgroundColor:"#fff"}}>
                                        <View style={styles.title}>
                                            <View>
                                                <Text style={styles.text}>{this.state.read}</Text>
                                            </View>
                                            <View>
                                                <Image source={require("../img/youjiantou.png")} style={styles.title_img}/>
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
                <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                    <Diet navigate={this.props.navigate} user={this.props.user} disabled={this.state.disabled} disabled_fun={this.disabled}/>
                <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                   <Video find={this.props.find} user={this.props.user} />
                    <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                    <View style={{width:width,height:100}}>
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
                                    <Image source={require("../img/youjiantou.png")} style={styles.title_img}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <FlatList
                            data={this.state.experts}
                            renderItem={this.renderItem}
                        />

                    </View>
                    <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                    <Smallfu loading={this.loading} user={this.props.user} navigate={this.props.navigate} disabled={this.state.disabled} disabled_fun={this.disabled}/>
                </ScrollView>
            </View>
            </PullView>
>>>>>>> 33b91709abc2fff838f66293dbda3b5e3b203c88
        )
    }
}
const styles = StyleSheet.create({
<<<<<<< HEAD

=======
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
>>>>>>> 33b91709abc2fff838f66293dbda3b5e3b203c88
})