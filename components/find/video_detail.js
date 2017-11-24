/**
 * Created by Administrator on 2017/11/2.
 */
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
    ScrollView,
    FlatList,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import Header from './../commen/header';
import Btn from './../column/att_btn';
import Recommend from './dongtai_tuijian';
import ExpertDetail from './expert_detail';
import Video from 'react-native-video';
var {width} = Dimensions.get('window');
import Share from './../commen/share';
export default class VideoDetail extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.state={
            data:{},
            play:false,
            attend:'false',
            show:false,
            heart:true
        };
        this._loadInitialState=this._loadInitialState.bind(this);
    }
    //视频加载成功后回调函数
    onLoad(info){
        // info == {currentTime,duration,...}
        ToastAndroid.show('视频加载成功！', ToastAndroid.SHORT);
    }
    //视频加载失败后回调函数
    onError(e){
        ToastAndroid.show('视频加载错误！', ToastAndroid.SHORT);
    }

    onProgress(info){
        // info == {currentTime: 0, playableDuration: 0}
    }
    //点击播放按钮视频播放
    showVideo(){
        let author=this.props.navigation.state.params.author;
        if(this.state.play){
            return(
                <View style={{flex:1}}>
                    <Video
                    ref="myvideo"
                    resizeMode='cover'
                    source={{uri:author.video,type: 'mp4'}}
                    style={{width:width,height:200}}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    onProgress={this.onProgress}
                    />
                </View>
            )
        }else {
            return(
                <View style={{width:width}}>
                    <Image style={{width:width,height:200}} source={{uri:author.banner}}/>
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

    componentDidMount(){
        this._loadInitialState();
    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        const author_id=this.props.navigation.state.params.author.author_id;
        const id=this.props.navigation.state.params.id;
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                console.log(result.shoucang.yinshi.dataList);
                if(result.guanzhu.daren.dataList.indexOf(author_id) !== -1){
                    this.setState({
                        show:false,
                        attend:'true'
                    })
                }else {
                    this.setState({
                        show:false,
                        attend:'false'
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
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }


    //监听按钮改变和播放按钮是否播放
    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.state.attend !== nextState.attend){
    //         return true;
    //     }
    //     if(this.state.play !== nextState.play){
    //         return true;
    //     }
    //     if(this.state.show !== nextState.show){
    //         return true;
    //     }
    // }
    //显示分享组件
    shareShow(){
        this.setState({
            show:true
        })
    }

    render(){
        const { state } = this.props.navigation;
        return(
            <View>
                <Header title="视频详情" back="true" id={state.params.id} heart={this.state.heart} isheart='true' navigation={this.props.navigation} shareShow={()=>this.shareShow()}/>
                <ScrollView>
                    <View style={styles.container}>
                        {this.showVideo()}
                        <View style={styles.content}>
                            <View style={{flex:1,flexDirection:'row',marginVertical:5}}>
                                <View style={{marginRight:5}}>
                                    <Text style={{color:'#999',fontSize:14}}>#{state.params.author.tags_name}</Text>
                                </View>
                                <View>
                                    <Text style={{color:'#444',fontSize:14}}>{state.params.author.title}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingBottom:10}}>
                                <View>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View>
                                            <Text style={{color:'#999',fontSize:12}}>{state.params.author.created_at}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{color:'#999',fontSize:12}}>播放{state.params.author.visit_num}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',paddingHorizontal:15,paddingVertical:10}}>
                            <View>
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('ExpertDetail',{id:state.params.author.author_id,changeBtn:this._loadInitialState})}>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{marginRight:10}}>
                                            <Image source={{uri:state.params.author.author_img}} style={{width:30,height:30,borderRadius:15}} />
                                        </View>
                                        <View>
                                            <View><Text style={{fontSize:11}}>{state.params.author.author_name}</Text></View>
                                            <View><Text style={{fontSize:10,color:'#999'}}>{state.params.author.author_title}</Text></View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="8" id={state.params.author.author_id}/>
                            </View>
                        </View>
                    </View>
                    <Recommend navigation={this.props.navigation}/>
                </ScrollView>
                <Share show={this.state.show} id={state.params.id} url="article" title={state.params.author.title} type="999" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginBottom:10,
        height:'auto',
    },
    banner:{
        flex:1,
        height:180
    },
    content:{
        paddingHorizontal:15,
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:0.5
    },
    mask:{
        width:width,
        height:200,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        left:0
    }
})