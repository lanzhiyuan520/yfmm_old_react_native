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
var {width} = Dimensions.get('window')
import Variable from "../Variable/Variable"
import ActionSheet from 'react-native-actionsheet'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Circle,friends} from "../fenxiang/fenxiang"
import {request_article_yinshi_xiangqing,request_user_action,user_behavior} from "../api"
import {bounces} from "../bounces/bounces"
import Btn from './../column/att_btn';
import Header from "../commen/header"
import HTMLView from "react-native-htmlview"
import Share from './../commen/share';
export default class DietList extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
    });
    constructor(props){
        super(props)
        this.state = {
            attend:"false",
            user_behavior:null,
            detailed_data:{},
            heart:false,
            show:false
        }
        this.showActionSheet = this.showActionSheet.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.yinshi_detailed_success = this.yinshi_detailed_success.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this)
    }
    componentDidMount(){
        var user= this.props.navigation.state.params.user
        //获取推荐详情
        request_article_yinshi_xiangqing(this.props.navigation.state.params.id,user.uuid,user.token,this.yinshi_detailed_success)
        this.props.navigation.setParams({navigatePress:this.showActionSheet,collect:this.collect})
    }
    //饮食详情成功回调
    yinshi_detailed_success(responseText){
        this.setState({
            detailed_data:responseText.data
        })
        this._loadInitialState()
    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            const author_id=this.state.detailed_data.author_id+"";
            var id = this.state.detailed_data.id
            if(value!=null){
                result=JSON.parse(value);
                if(result.guanzhu.daren.dataList.indexOf(author_id) == -1){
                    this.setState({
                        attend:'false'
                    })
                    console.log("1");
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
    showActionSheet() {
        this.ActionSheet.show()
    }
    handlePress(i) {
        if(i==0){
            alert("点了取消")
        } else if(i==1){
            Circle({type:"text",description:"测试分享朋友圈"})
        } else if(i==2){
            friends({type:"text",description:"测试分享好友"})
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
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <Header title={this.props.navigation.state.params.title} id={this.state.detailed_data.id}  heart={this.state.heart} back="true" isheart='true' navigation={this.props.navigation} shareShow={()=>this.shareShow()} />
                <ScrollView>
                <View>
                    <Image source={{uri:this.state.detailed_data.banner}} style={{width:width,height:250}}/>
                </View>
                <View style={{paddingLeft:10,paddingRight:10,borderBottomWidth:1,borderBottomColor:"#f5f5f5"}}>
                    <View style={{width:width,alignItems:"center",flexDirection:"row",height:35}}>
                        <Text style={{fontSize:16,color:"#333"}}>#</Text>
                        <Text style={{color:"#999",fontSize:16}}>福滋味</Text>
                        <Text style={{color:"#333",fontSize:16}}>{this.state.detailed_data.title}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",height:35}}>
                        <View>
                            <Text>{this.state.detailed_data.created_at}</Text>
                        </View>
                        <View>
                            <Text>浏览{this.state.detailed_data.visit_num}</Text>
                        </View>
                    </View>
                </View>
                <View style={{paddingLeft:10,paddingRight:10,flexDirection:"row",height:70,alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate("ExpertDetail",{
                            id:this.state.detailed_data.author_id
                        })
                    }}>
                        <View style={{flexDirection:"row"}}>
                            <Image source={{uri:this.state.detailed_data.author_img}} style={{width:36,height:20}}/>
                            <Text style={{marginLeft:5,color:"#333",fontSize:16}}>{this.state.detailed_data.tags_name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{position:"absolute",right:10}}>
                        <Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="8" id={this.state.detailed_data.author_id}/>
                    </View>
                </View>
                <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                <HTMLView
                    value={this.state.detailed_data.content}
                    stylesheet={styles}
                />
                </ScrollView>
                {/*<View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={Variable.options}
                        cancelButtonIndex={Variable.CANCEL_INDEX}
                        destructiveButtonIndex={Variable.DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </View>*/}
                <Share show={this.state.show} id={this.state.detailed_data.id} url="article" title={this.state.detailed_data.title} type="999" />
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