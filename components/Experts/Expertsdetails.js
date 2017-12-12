import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Button,
    Dimensions,
    ToastAndroid,
    AsyncStorage,
    FlatList,
    ScrollView
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import PublishProblem from './../answer/publish_problem';
var {width} = Dimensions.get('window')
import Variable from "../Variable/Variable"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_professionals_content,request_professionals_reply_content} from "../api"
import {Circle,friends} from "../fenxiang/fenxiang"
import {bounces} from "../bounces/bounces"
import Btn from './../column/att_btn';
import Header from "../commen/header"
import Share from './../commen/share';
var user
export default class Expertsdetails extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
    });
    constructor(props){
        super(props)
        this.state = {
            attend:"false",
            user:{},
            experts_data:{},
            care_num:null,
            reply_num:null,
            sort:true,
            problem_list:[],
            show:false
        }
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
        this.experts_success = this.experts_success.bind(this)
        this._loadInitialState=this._loadInitialState.bind(this);
        this.problem=this.problem.bind(this);
        this.shareShow=this.shareShow.bind(this);
    }
    componentDidMount(){
         user = this.props.navigation.state.params.user
        //获取专家详情
        request_professionals_content(user.uuid,user.token,this.props.navigation.state.params.id,this.experts_success)
        this.props.navigation.setParams({navigatePress:this.showActionSheet})
    }
    experts_success(responseText){
        var type = "weight"
        this.setState({
            experts_data:responseText.data.professional,
            reply_num:responseText.data.reply_num,
            care_num:responseText.data.care_num
        })
        this._loadInitialState()
        this.problem(type)
    }
    //问题列表
    problem(type){
        request_professionals_reply_content(user.token,{
            uuid:user.uuid,
            support:2,
            problem_id:this.props.navigation.state.params.id,
            orderby:type,
            offset:0,
            limit: 4000,
            action_num:0,
            font:false
        },(responseText)=>{
            console.log(responseText)
            this.setState({
                problem_list:responseText.data.reply_msg
            })
        })
    }
    //关注收藏按钮初始化
    async _loadInitialState(){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            const id=this.state.experts_data.id+"";
            if(value!=null){
                result=JSON.parse(value);
                if(result.guanzhu.zhuanjia.dataList.indexOf(id) == -1){
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
                <Header zhuanjia={this.props.navigation.state.params.zhuanjia} title={this.props.navigation.state.params.expert} share='true' id={this.state.experts_data.id}  back="true" isheart='true' shareShow={()=>this.shareShow()} navigation={this.props.navigation}/>
                <ScrollView>
                <View style={{
                    width:width,
                    height:100,
                    flexDirection:"row",
                    alignItems:"center",
                    paddingLeft:10,
                    paddingRight:10,
                    position:'relative',
                    borderTopColor:"#f5f5f5",
                    borderTopWidth:1
                }}>
                    <View>
                        <Image source={{uri:this.state.experts_data.img}} style={{width:60,height:60,borderRadius:30}}/>
                    </View>
                    <View style={{height:60,justifyContent:"space-around",marginLeft:10}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"#000",fontSize:16,marginRight:5}}>{this.state.experts_data.name}</Text>
                            <Text style={{color:"#999",fontSize:14}}>{this.state.experts_data.title}</Text>
                        </View>
                        <View>
                            <Text style={{color:"#999",fontSize:14}}>关注 {this.state.care_num}</Text>
                        </View>
                    </View>
                    <View style={{position:"absolute",right:10}}>
                        <Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="7" id={this.state.experts_data.id}/>
                    </View>
                </View>
                <View style={{width:width,paddingRight:10,paddingLeft:10,paddingBottom:10}}>
                    <Text style={{color:"#333",fontSize:14}}>{this.state.experts_data.content}</Text>
                </View>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                <View>
                    <View style={{
                        width:width,
                        height:45,
                        flexDirection:"row",
                        paddingRight:10,
                        paddingLeft:10,
                        alignItems:"center",
                        justifyContent:"space-between"
                    }}>
                        <View style={{width:100}}>
                            <Text style={{color:"#999",fontSize:14}}>回答{this.state.problem_list.length?this.state.problem_list.length:0}个</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.problem("weight");
                                this.setState({
                                    font:false
                                })
                            }}>
                                <View>
                                    <Text style={this.state.font?styles.light_color:styles.black_color}>最热</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{marginLeft:5,marginRight:5}}>
                                <Text>|</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.problem("create");
                                this.setState({
                                    font:true
                                })
                            }}>
                                <View>
                                    <Text style={this.state.font?styles.black_color:styles.light_color}>最新</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.problem_list}
                        renderItem={({item,index})=>{
                            console.log(item)
                            return (
                                <TouchableWithoutFeedback onPress={()=>{
                                    this.props.navigation.navigate("Problem",{
                                        id:item.problem_id,
                                        author:item.author,
                                        images:item.images
                                    })
                                }}>
                                    <View style={{width:width,borderBottomWidth:1,borderBottomColor:"#f2f2f2",paddingBottom:5}}>
                                        <View style={{width:width,justifyContent:"center",paddingRight:10,paddingLeft:10,paddingBottom:10,paddingTop:10}}>
                                            <Text style={{color:'#000',fontSize:15}}>{item.problem_content}</Text>
                                        </View>
                                        <View style={{width:width,justifyContent:"center",padding:5}}>
                                            <Text style={{color:'#666',fontSize:13}}>{item.content}</Text>
                                        </View>
                                        <View style={{width:width,flexDirection:"row",justifyContent:"space-between"}}>
                                            <View style={{paddingLeft:10,paddingRight:10}}>
                                                <Text style={{color:"#999",fontSize:12}}>{item.create_at}</Text>
                                            </View>
                                            <View style={{paddingLeft:10,paddingRight:10,flexDirection:"row"}}>
                                                <FontAwesome name="thumbs-o-up" style={styles.un_hand} />
                                                <Text style={{color:"#999",fontSize:12,marginLeft:5}}>{item.parent}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />

                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={Variable.options}
                    cancelButtonIndex={Variable.CANCEL_INDEX}
                    destructiveButtonIndex={Variable.DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
                </ScrollView>
                <View style={{width:width,height:60,backgroundColor:'#fff',justifyContent:"center",alignItems:"center"}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate("PublishProblem",{
                            author:this.state.experts_data,
                            navigate:this.props.navigate
                        })
                    }}>
                        <View style={{backgroundColor:"#ff8089",width:width*0.9,height:40,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{color:"#fff",fontSize:16}}>提问</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Share show={this.state.show} id={this.state.experts_data.id} url="article" title={this.state.experts_data.title} type="999" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    division:{
        width:2,
        height:15,
        backgroundColor:'#999',
        marginLeft:8,
        marginRight:8
    },
    attention:{
        color:"#FF8080"
    },
    Has_attention:{
        color:"#999"
    },
    black_color:{
        color:'#333',
        fontSize:15
    },
    light_color:{
        color:'#999',
        fontSize:15
    },
})