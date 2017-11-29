import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    FlatList,
    Dimensions,
    ToastAndroid,
    AsyncStorage,
    InteractionManager,
} from 'react-native';
import {request_article_xiaofujingxuan} from "../api"
var {width} = Dimensions.get('window')
import LoadingMore from '../loading_more'
export default class Smallfu extends Component{
    constructor(props){
        super(props)
        this.state = {
            xiaofu_list:[],
            count:5,
            btn:"加载更多",
            num:0,
            disabled:false,
            user:{},
            status:null,
            list_num:5,
            finish:false,
            data:[],
            actionNum:0
        }
        this.xiaofu_list=this.xiaofu_list.bind(this)
        this.xiaofu=this.xiaofu.bind(this)
        this.more=this.more.bind(this)
    }
    componentDidMount(){
        let offset = 0
        InteractionManager.runAfterInteractions(()=>{
            this.xiaofu_list(offset)
        })
        this.setState({
            user:JSON.parse(this.props.user)
        })
    }
    xiaofu_list(offset){
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            this.setState({
                status:result.statusCon
            })
             this.state.status=result.statusCon
            //获取首页小福精选列表
            request_article_xiaofujingxuan(this.state.user.uuid,this.state.user.status,"weightDesc", offset, this.state.list_num,  this.state.user.token, this.xiaofu)
        })

    }
    more(){
        this.setState({
            actionNum:this.state.actionNum+1,
            btn:"加载中..."
        })
        let offset = (this.state.actionNum+1)*5
        this.xiaofu_list(offset)
    }
    xiaofu(responseText){
        let oldArr= this.state.xiaofu_list
        let newArr=responseText.data.dataList;
        if(!newArr){
            this.setState({
                actionNum:this.state.actionNum-1,
                btn:"没有更多了~~"
            })
        }else {
            allArr =[...oldArr,...newArr];
            this.setState({
                xiaofu_list:allArr,
                btn:"加载更多"
            });
        }
    }
    render(){
        return(
            <View style={{width:width}}>
                <View style={styles.title}>
                    <View>
                        <Text style={styles.text}>小福精选</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.xiaofu_list}
                    getItemLayout={(data, index) => (
                        // 91 是被渲染 item 的高度 ITEM_HEIGHT。
                        {length: 91, offset: 91 * index, index}
                    )}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableWithoutFeedback
                                onPress={()=>{
                                this.props.navigate("Xfdetailed",{
                                id:item.id,
                                user:this.props.user
                            })
                                }}>
                                <View
                                    style={{flexDirection:"row",justifyContent:"center"}}>
                                    <View style={{
                                        width:width,
                                        height:80,
                                        position:"relative",
                                        paddingTop:10,
                                        paddingLeft:10,
                                        paddingRight:10,
                                        borderBottomColor:"#f0f0f0",
                                        borderBottomWidth:1
                                    }}>
                                        <View style={{height:70,flexDirection:"row"}}>
                                            <View style={{height:70}}>
                                                <View style={{width:width*.8}}>
                                                    <Text style={{color:"#333",lineHeight:23}}>{item.title}</Text>
                                                </View>
                                                <View style={{flexDirection:"row",position:"absolute",bottom:10}}>
                                                    <View style={{flexDirection:"row",marginRight:20}}>
                                                        <Image source={{uri:item.author_img}} style={{width:18,height:18,borderRadius:18,marginRight:5}}/>
                                                        <Text style={{color:"#999",fontSize:12}}>{item.author_name}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{color:"#999",fontSize:12}}>阅读{item.visit_num}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <Image source={{uri:item.id==169?"http://cdn.ayi800.com/image/jpg/app_dengdeng2.jpg":item.banner}} style={styles.xiaofu_banner} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }

                    }
                />
                <TouchableWithoutFeedback onPress={()=>{
                    this.more()
                }}>
                    <View style={{
                        width:width,
                        height:40,
                        backgroundColor:"#fff",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <Text>{this.state.btn}</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    xiaofu_banner:{
        width:70,
        height:60,
        borderRadius:5
    }
})