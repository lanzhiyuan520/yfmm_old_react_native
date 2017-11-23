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
    ScrollView
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '微信朋友圈', '微信好友', '复制到剪切板']
var WeChat=require('react-native-wechat');
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_article_xiaofu_xiangqing} from "../api"
export default class XfDetailed extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "小福精选",
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    })
    constructor(props){
        super(props)
        this.state = {
            collect:false,
            attention:false,
            xiaofu:{}
        }
        WeChat.registerApp('wx825ecd9a849eef9d')
        this.showActionSheet = this.showActionSheet.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.collect = this.collect.bind(this)
        this.attention = this.attention.bind(this)
        this.xiaofu_detailed = this.xiaofu_detailed.bind(this)
    }

    componentDidMount(){
        if( this.props.navigation.state.params.list){
            this.props.navigation.state.params.list()
        }

        var id = this.props.navigation.state.params.id
        var user = JSON.parse(this.props.navigation.state.params.user)
        request_article_xiaofu_xiangqing(id,user.uuid,user.token,this.xiaofu_detailed)
        this.props.navigation.setParams({navigatePress:this.showActionSheet,collect:this.collect})
    }
    xiaofu_detailed(responseText){
        this.setState({
            xiaofu:responseText.data
        })
        console.log(this.state.xiaofu)
    }
    showActionSheet() {
        this.ActionSheet.show()
    }
    collect(){
        this.setState({
            collect:!this.state.collect
        })

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
    attention(){
        if(this.state.attention){
            ToastAndroid.show('取关成功', ToastAndroid.SHORT)

        }else{
            ToastAndroid.show('关注成功', ToastAndroid.SHORT)
        }
       this.setState({
           attention:!this.state.attention
       })
    }
    render(){
        let attention = this.state.attention?"已关注":"+关注"
        let attention_style = this.state.attention?styles.Has_attention:styles.attention
        return(
            <View style={{width:width,backgroundColor:"#fff",flex:1}}>
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
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Image source={{uri:this.state.xiaofu.author_img}} style={{width:46,height:46,borderRadius:23}}/>
                            <Text style={{marginLeft:10}}>{this.state.xiaofu.author_name}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>{this.attention()}}>
                            <View style={{
                                width:80,
                                height:35,
                                backgroundColor:"#fff",
                                justifyContent:"center",
                                alignItems:"center",
                                borderWidth:1,
                                borderColor:"#f3f3f3",
                                borderRadius:5
                            }}>
                                <Text style={attention_style}>{attention}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    attention:{
        color:"#FF9490"
    },
    Has_attention:{
        color:"#999"
    }
})