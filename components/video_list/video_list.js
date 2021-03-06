import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    ToastAndroid,
    FlatList,
    Dimensions,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import {request_article_shipin} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Video extends Component{
    constructor(props){
        super(props)
        this.state={
            video:[],
            count:null,
            user:{}
        }
        this.video_success=this.video_success.bind(this)
    }
    componentDidMount(){
        this.setState({
            user:JSON.parse(this.props.user)
        })
        //获取用户状态，获取首页视频列表
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            request_article_shipin(this.state.user.uuid,this.state.user.token,0,5,"weight",this.video_success)
        })
    }
    video_success(responseText){
        this.setState({
            video:responseText.data.dataList
        })
    }
    render(){
        return(
            <View style={{width:width,height:170,backgroundColor:"#fff"}}>
                <TouchableWithoutFeedback onPress={()=>{this.props.find()}}>
                    <View style={styles.title}>
                        <View>
                            <Text style={styles.text}>热门视频</Text>
                        </View>
                        <View>
                            <FontAwesome name="angle-right" style={{fontSize: 18, color: "#000",marginLeft:10}}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-around",
                    paddingLeft:10,
                    paddingRight:10
                }}>
                    <FlatList
                        horizontal={true}
                        data={this.state.video}
                        renderItem={({item,index})=>{
                            return(
                                <TouchableWithoutFeedback onPress={()=>{
                                    this.props.navigate("VideoDetail",{
                                        id:item.id,
                                        author:item
                                    })
                                }}>
                                    <View style={[styles.img_line,index==this.state.count-1?styles.img_last:""]}>
                                        <View>
                                            <View style={{}}>
                                                <Image source={{uri:item.banner}} style={{width:190,height:120}}/>
                                            </View>
                                            <View style={{
                                                position:"absolute",
                                                top:50,
                                                left:0,
                                                paddingLeft:10,
                                                paddingRight:10,
                                            }}>
                                                <Text style={{color:"#fff",fontSize:12,backgroundColor:"transparent"}}>#{item.tags_name}</Text>
                                                <Text style={{color:"#fff",fontSize:12,backgroundColor:"transparent"}}>{item.title}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />
                </View>
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