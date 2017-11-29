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
    ToastAndroid
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
var {width} = Dimensions.get('window')
import Variable from "../Variable/Variable"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_professionals_content} from "../api"
import {Circle,friends} from "../fenxiang/fenxiang"
import {bounces} from "../bounces/bounces"
export default class Expertsdetails extends Component{
    static navigationOptions = ({navigation}) => ({

            title: `${navigation.state.params.expert}`,
            headerTitleStyle:{
                alignSelf:'center'
            },
        headerStyle:{
            elevation: 0
        },
        headerRight: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.navigatePress()}}><FontAwesome name="share-alt" style={{fontSize: 20, color: "#ff8080",marginRight:10}}/></TouchableWithoutFeedback>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state = {
            attention:false,
            user:{},
            experts_data:{},
            care_num:null,
            reply_num:null
        }
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
        this.attention = this.attention.bind(this)
        this.experts_success = this.experts_success.bind(this)
    }
    componentDidMount(){
        var user = this.props.navigation.state.params.user
        //获取专家详情
        request_professionals_content(user.uuid,user.token,this.props.navigation.state.params.id,this.experts_success)
        this.props.navigation.setParams({navigatePress:this.showActionSheet})
    }
    experts_success(responseText){
        this.setState({
            experts_data:responseText.data.professional,
            reply_num:responseText.data.reply_num,
            care_num:responseText.data.care_num
        })
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
    attention(){
        if(this.state.attention){
            bounces('取关成功')

        }else{
            bounces('关注成功')
        }
        this.setState({
            attention:!this.state.attention
        })
    }
    render(){
        let attention = this.state.attention?"已关注":"+关注"
        let attention_style = this.state.attention?styles.Has_attention:styles.attention
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
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
                    <TouchableWithoutFeedback onPress={()=>{this.attention()}}>
                        <View style={{
                            width:80,
                            height:35,
                            backgroundColor:"#fff",
                            justifyContent:"center",
                            alignItems:"center",
                            borderWidth:1,
                            borderColor:"#f3f3f3",
                            borderRadius:5,
                            position:"absolute",
                            right:10
                        }}>
                            <Text style={attention_style}>{attention}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{width:width,paddingRight:10,paddingLeft:10}}>
                    <Text style={{color:"#333",fontSize:14}}>{this.state.experts_data.content}</Text>
                </View>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={Variable.options}
                    cancelButtonIndex={Variable.CANCEL_INDEX}
                    destructiveButtonIndex={Variable.DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    attention:{
        color:"#FF8080"
    },
    Has_attention:{
        color:"#999"
    }
})