/**
 * Created by Administrator on 2017/11/14.
 */
import React, { Component } from 'react';
import * as WeChat from 'react-native-wechat';
import constants from './../constants';
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
    AlertIOS,
    ToastAndroid,
    Clipboard,
    ScrollView
} from 'react-native';
const {width,height}=Dimensions.get('window');
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            show:this.props.show,
            url:constants.PROBLEM_URL
        };
        this.shearPlate=this.shearPlate.bind(this);
        this.getUrl=this.getUrl.bind(this);
    }

    componentWillMount(){
        this.getUrl();
    }

    componentDidMount(){
        WeChat.registerApp('wx825ecd9a849eef9d');
        WeChat.addListener(
            'SendMessageToWX.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('分享成功', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('分享成功');
                    }
                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('分享失败', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('分享失败');
                    }
                }
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }
    componentWillUnmount(){
        WeChat.removeAllListeners()
    }
    //隐藏组件
    hideItem(){
        this.setState({
          show:false
        })
    }

    //判断分享的url
    getUrl(){
        if(this.props.url=='problem'){
            this.setState({
                url:constants.PROBLEM_URL+'?problem_id='+this.props.id
            })
        }else if(this.props.url=='professional'){
            this.setState({
                url:constants.PROFEESIONAL_URL+ '?professional_id=' + this.props.id
            })
        }else if(this.props.url=='article'){
            this.setState({
                url:constants.ARTICLE_URL+'?article_id='+this.props.id+'&article_type='+this.props.type,
            })
        }

    }

    //分享到朋友圈
    shareCircle(){
        WeChat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                    WeChat.shareToTimeline({
                        title:this.props.title,
                        description:'分享自:有福妈妈APP',
                        thumbImage:'http://cdn.ayi800.com/rn_app/share.png',
                        type:'news',
                        webpageUrl:this.state.url
                    })

                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('没有安装微信软件，请您安装微信之后再试');
                    }
                }
            } );
    }
    //分享给朋友
    shareFriend(){
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title:this.props.title,
                        description: '分享自:有福妈妈APP',
                        thumbImage: 'http://cdn.ayi800.com/rn_app/share.png',
                        type: 'news',
                        webpageUrl: this.state.url
                    })
                        .catch((error) => {
                            console.log(error.message);
                        });
                } else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('没有安装微信软件，请您安装微信之后再试');
                    }
                }
            });
    }

    //复制剪切板
    async shearPlate(){
        Clipboard.setString(this.state.url);
        try {
            var content = await Clipboard.getString();
            ToastAndroid.show('粘贴板的内容为:'+content,ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show(e.message,ToastAndroid.SHORT);
        }
        this.setState({
            show:false
        })
    }

    render(){
        if(this.state.show){
            return(
                <View style={styles.mask}>
                    <View style={{position:'absolute',bottom:0,left:(width-320)/2,height:270}}>
                        <View style={styles.container}>
                            <TouchableWithoutFeedback onPress={()=> this.shareCircle()}>
                                <View style={[styles.item,styles.boders]}>
                                     <Text style={styles.share}>微信朋友圈</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=> this.shareFriend()}>
                                <View style={[styles.item,styles.boders]}>
                                     <Text style={styles.share}>微信好友</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=> this.shearPlate()}>
                                <View style={styles.item}>
                                    <Text style={styles.share}>复制到剪切板</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{width:320,backgroundColor:'#fff',paddingVertical:10, borderRadius:5,}}>
                            <TouchableWithoutFeedback onPress={()=> this.hideItem()}>
                                <View style={{height:20}}>
                                    <Text style={styles.remove}>取消</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }

    }
}
const styles = StyleSheet.create({
    mask:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:(Platform.OS === 'ios' ? 68 : 48),
        left:0,
        zIndex:1000
    },
    container:{
        width:320,
        backgroundColor:'#fff',
        paddingVertical:10,
        borderRadius:5,
        marginBottom:10
    },
    share:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:30
    },
    boders:{
        borderBottomWidth:0.5,
        borderBottomColor:'#f8f8f8'
    },
    item:{
        height:40
    },
    remove:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:20
    }
})