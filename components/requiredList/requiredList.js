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
    ScrollView,
    TouchableOpacity,
    Slider,
    Modal
} from 'react-native';
var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
import {requestTodayView} from "../api"
import Btn from './../column/att_btn';
import Video from 'react-native-video';
import {bounces} from "../bounces/bounces"
import Toast, {DURATION} from 'react-native-easy-toast'
import HTMLView from "react-native-htmlview"
import Load from "../loading/loading"
var user
import Icon from 'react-native-vector-icons/FontAwesome'
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
            play:false,
            loading:true,
            playButton: 'pause-circle',
            sliderValue: 0,
            duration:0,
            videoPause:false,
            current:'00:00',
        }
        this.suggest_success=this.suggest_success.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this);
        this.encodeURI=this.encodeURI.bind(this);
        this._formatTime=this._formatTime.bind(this);
        this.onProgress=this.onProgress.bind(this);
        this.onLoad=this.onLoad.bind(this);
        this.suspend=this.suspend.bind(this)
        this.stop_video=this.stop_video.bind(this)
        }
    componentDidMount(){
        this.suspend()
    }
    //时间转换
    _formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    //视频url转码
    encodeURI(u){
        let url = encodeURI(u)
        return url
    }
    stop_video(){
        this.setState({
            play:false
        })
    }
    suspend(){
        user = this.props.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            //获取今日建议的文章
            requestTodayView(this.props.index,result.status,user.uuid,user.token,this.suggest_success)
        })
    }
    //点击播放按钮
    _playButton() {

        this.setState({
            playButton: this.state.videoPause ? 'pause-circle' : 'play-circle',
            videoPause: !this.state.videoPause
        })
    }
    onProgress(data){
        // data == {currentTime: 0, playableDuration: 0}
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            current: this._formatTime(Math.floor(data.currentTime))
        })
    }
    showVideo(){
        if(this.state.play){
            return(
              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.play}
              >
                  <View style={{position:"absolute",top:20,right:10,zIndex:9999999}}>
                      <TouchableOpacity onPress={()=>{this.setState({play:false})}}>
                          <View>
                              <Icon name="window-close" size={30} color='#999' style={{backgroundColor:"transparent"}} />
                          </View>
                      </TouchableOpacity>
                  </View>
                <View style={{flex:1,width:width,justifyContent:"center",backgroundColor:"#000"}}>
                    <Video
                        ref="video"
                        resizeMode='cover'
                        source={{uri:this.encodeURI(this.state.suggest_data.video),type:"mp4"}}
                        style={{width:width,height:200,backgroundColor:"#fff"}}
                        playInBackground={true}
                        onLoad={this.onLoad}
                        onError={this.onError}
                        onProgress={this.onProgress}
                        paused={this.state.videoPause}
                        onEnd={() => {
                            this.setState({
                                sliderValue: 0,
                                current: '00:00',
                                playButton:'play-circle',
                                videoPause: true
                            })
                        }}
                    />
                    <View style={{position:'absolute',bottom:0,width:width}}>
                        <View style={styles.playingControl}>
                            <TouchableOpacity onPress={this._playButton.bind(this)}>
                                <Icon name={this.state.playButton} size={30} color='#999' style={{backgroundColor:"transparent"}} />
                            </TouchableOpacity>
                            <Slider
                                ref='slider'
                                style={{flex: 1, marginLeft: 10, marginRight: 10}}
                                value={this.state.sliderValue}
                                minimumValue = {0} //最小之
                                maximumValue = {Math.floor(this.state.duration)} //最大值
                                onValueChange={(value) => {
                                    this.setState({
                                        videoPause: true,
                                        current: this._formatTime(Math.floor(value))
                                    })
                                }
                                }
                                onSlidingComplete={(value) => {
                                    this.refs.video.seek(value);
                                    // 判断是否处于播放状态
                                    if (this.state.playButton === 'pause-circle') this.setState({videoPause: false})
                                }
                                }
                                step={1}
                                minimumTrackTintColor='#999'
                                maximumTrackTintColor='#2175bc'
                                thumbTintColor="#2175bc"
                            />

                            <View>
                                <Text style={{color:'#999',backgroundColor:"transparent"}}>{this.state.current} : {this._formatTime(Math.floor(this.state.duration))}</Text>
                            </View>

                        </View>
                    </View>
                </View>
              </Modal>
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
        bounces('视频加载成功',this);
        this.setState({
            duration:info.duration
        })
    }
    onError(e){
        bounces('视频加载错误');
    }
    suggest_success(responseText){
        if(responseText.code != 0){
            this.setState({
                suggest_data:this.state.suggest_data,
                loading:false
            })
        }else{
            this.setState({
                suggest_data:responseText.data.articleData,
                loading:false
            })
            this._loadInitialState();
        }

    }
    render(){
        return(
            <View style={{flex:1,width:width,backgroundColor:"#fff"}}>
                <Toast ref="toast"/>
                {
                    this.state.loading?
                        <View style={{position:"absolute",top:-100}}>
                            <Load loading={this.state.loading} />
                        </View>
                        :
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
                                    <TouchableWithoutFeedback onPress={()=>{
                                        this.props.navigation.navigate("ExpertDetail",{
                                            id:this.state.suggest_data.author_id,
                                            daren:this._loadInitialState
                                        })
                                    }}>
                                        <View style={{flexDirection:"row",alignItems:"center"}}>
                                            <View style={{marginRight:10}}>
                                                <Image source={{uri:this.state.suggest_data.author_img}} style={{width:30,height:30,borderRadius:15}} />
                                            </View>
                                            <View>
                                                <Text style={{color:"#333",fontSize:13}}>{this.state.suggest_data.author_name}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
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
                }

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
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    }
})