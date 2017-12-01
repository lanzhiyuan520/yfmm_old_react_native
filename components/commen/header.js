/**
 * Created by Administrator on 2017/10/31.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    AlertIOS,
    ToastAndroid,
    Platform,
    AsyncStorage
} from 'react-native';
import {Circle,friends} from "../fenxiang/fenxiang";
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import *as wechat from 'react-native-wechat';
import constants from './../constants';
export default class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            heart:this.props.heart
        }
    }

    componentWillMount(){
        this.getActionList();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({heart: nextProps.heart});
    }

    //获取用户的点赞 - 关注 - 收藏 list
    getActionList(){
        const url=constants.url+"/v1/userbehavior/user?uuid="+constants.uuid+"&userId="+constants.userId+"&userOpType=10";
        const urlSigned = getSingedUrl(url, constants.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": constants.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                try {
                    AsyncStorage.setItem(
                        'userActionList',
                        JSON.stringify(responseJson.data),
                        (error)=>{
                            console.log(error);
                            if (error){
                                console.log(error)
                            }else{
                                console.log("存值成功!");
                            }
                        }
                    );
                } catch (error){
                    // alert('失败'+error);
                }
                this.setState({
                    data:responseJson.data
                });
            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }

    //改变心形按钮
    changeHeart(reverse){
        let post_params={
            userId:constants.userId,
            operateType:'3',
            operateId:this.props.id,
            reverse:reverse
        };
        const url=constants.url+"/v1/userbehavior/collect?uuid="+constants.uuid;
        const urlSigned = getSingedUrl(url, constants.uuid);
        const dataEncrypt = getEncryptParam(post_params);
        fetch(urlSigned,{
            method: "POST",
            headers: {
                "Http-App-Token": constants.token,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:`param=${dataEncrypt.param}`,
        }).then((response) => response.json())
            .then((responseJson) => {
                if( reverse == '1' ){
                    if(responseJson.code==0){
                        if (Platform.OS === "android") {
                            ToastAndroid.show('关注成功', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('关注成功');
                        }
                        this.getActionList();
                        this.setState({
                            heart:false
                        });
                    }else {
                        if (Platform.OS === "android") {
                            ToastAndroid.show('关注失败', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('关注失败');
                        }
                    }
                }else if( reverse == '2' ){
                    if(responseJson.code==0){
                        if (Platform.OS === "android") {
                            ToastAndroid.show('取关成功', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('取关成功');
                        }
                        this.getActionList();
                        this.setState({
                            heart:true
                        });
                    }
                }

            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }

    componentDidMount (){
        wechat.registerApp('wx825ecd9a849eef9d')
    }

    shareWechat(){
        this.props.shareShow();
    }
    //渲染心形按钮
    renderHeart(){
        if(this.state.heart){
            return(
                <TouchableWithoutFeedback onPress={() =>  this.changeHeart('1')}>
                    <View>
                        <FontAwesome name="heart-o" style={{fontSize:15,color:"#ff8080",marginRight:8}} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }else {
            return(
                <TouchableWithoutFeedback onPress={() =>  this.changeHeart('2')}>
                    <View>
                        <FontAwesome name="heart" style={{fontSize:15,color:"#ff8080",marginRight:8}} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    //头部右边渲染
    hasRight() {
        if (this.props.share) {
            return (
                <TouchableWithoutFeedback onPress={() => this.shareWechat()}>
                    <View style={[styles.sub_container, styles.pr]}>
                        <FontAwesome name="share-alt" style={{fontSize: 15, color: "#ff8080",}}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }else if (this.props.isheart) {
            return (
                    <View style={[styles.sub_container, styles.pr]}>
                        {this.renderHeart()}
                        <TouchableWithoutFeedback onPress={() => this.props.shareShow()}>
                             <FontAwesome name="share-alt" style={{fontSize: 15, color: "#ff8080",}}/>
                        </TouchableWithoutFeedback>
                    </View>
            )
        }else{
            return (
                <TouchableWithoutFeedback>
                    <View style={[styles.sub_container, styles.pr]}>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    //返回按钮
    goBack(){
        if( this.props.changeBtn){
            this.props.changeBtn();
            this.props.navigation.goBack(null);
        }else{
            this.props.navigation.goBack(null);
        }

    }
    //头部左边渲染
    hasLeft(){
        if (this.props.back=="true") {
            return (
                <TouchableWithoutFeedback onPress={()=> this.goBack()}>
                    <View style={[styles.sub_container,styles.pl]}>
                        <FontAwesome name="angle-left" style={{fontSize:30,color:"#ff8080"}} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }else {
            return (
                <TouchableWithoutFeedback>
                    <View style={[styles.sub_container, styles.pr]}>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:1,flexDirection:'row',height:40}}>
                    {this.hasLeft()}
                    <View style={[styles.sub_container,styles.center]}><Text>{this.props.title}</Text></View>
                    {this.hasRight()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:40,
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        marginTop:(Platform.OS === 'ios' ? 20 : 0)
    },
    sub_container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    pl:{
        paddingLeft:15
    },
    pr:{
        paddingRight:15,
        justifyContent:'flex-end'
    },
    center:{
        justifyContent:'center'
    }
});