/**
 * Created by Administrator on 2017/10/30.
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
    Button,
    TextInput,
    Switch,
    ScrollView,
    AlertIOS,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import PubTop from './publish_top';
import Btn from './btn';
import CameraButton from './CameraButton';
import Camera from './../commen/camera';
import constants from './../constants';
// import queryString from 'query-string';
import qs from 'qs';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Find extends Component{
    static navigationOptions = {
        header:null
    }
    constructor(props){
        super(props);
        this.state={
            trueSwitchIsOn: true,
            service:0,
            quiz:0,
            text:'',
            arr:[],
            show:false,
            picArr:[],
            camera:false,
            user:{},
            checked:true
        }
        this.getService=this.getService.bind(this);
        this.putIn=this.putIn.bind(this);
        this.getImg=this.getImg.bind(this);
        this.postData=this.postData.bind(this);
        this.cameraShow=this.cameraShow.bind(this);
        this.getPic=this.getPic.bind(this);
        this.cameraHide=this.cameraHide.bind(this);
    }
    //匿名提问、公开提问按钮
    changeFont(){
        if(this.state.trueSwitchIsOn){
            return (
                <View>
                    <Text style={{lineHeight:23,marginLeft:5}}>公开提问</Text>
                </View>
            )
        }else {
            return (
                <View>
                    <Text style={{lineHeight:23,marginLeft:5}}>匿名提问</Text>
                </View>
            )
        }
    }

    //获取用户信息
    async _loadInitialUser(){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.postData();
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    //按钮改变回调函数
    isChange(value){
        this.setState({trueSwitchIsOn: value});
        //获取匿名提问还是公开提问
        if(this.state.trueSwitchIsOn){
            this.setState({
                quiz:1
            })
        }else {
            this.setState({
                quiz:0
            })
        }
        console.log(this.state.quiz)
    }

    //提交数据
    postData(){
        console.log(this.state.quiz)
        let img=null;
        if(this.state.picArr.length==0){
          console.log('没有上传照片')
        } else {
            console.log(this.state.picArr)
            img=[];
            if(this.state.camera){
                for(var i = 0;i<this.state.picArr.length;i++){
                    var uri = this.state.picArr[i].path;
                    img.push(uri)
                }
            }else {
                for(var i = 0;i<this.state.picArr.length;i++){
                    this.state.picArr[i]=JSON.parse(this.state.picArr[i]);
                    var uri = this.state.picArr[i].path;
                    img.push(uri)
                }
            }

        }
        let post_params={author_id:this.state.user.id,content:this.state.text,service_groups:'2',service_id:this.state.service,anonymous:this.state.quiz,adapter:this.state.user.status,images:img};
        let url=constants.url+"/v1/problem?uuid="+this.state.user.uuid;
        let urlSigned = getSingedUrl(url, this.state.user.uuid);
        var dataEncrypt = getEncryptParam(post_params);
        console.log(post_params);
        fetch(urlSigned,{
            method:"PATCH",
            headers: {
                "Http-App-Token": this.state.user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:`param=${dataEncrypt.param}`
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.code==0){
                    if (Platform.OS === "android") {
                        ToastAndroid.show('提问成功', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                        AlertIOS.alert('提问成功');
                    }
                    this.refs.aTextInputRef.clear();
                    this.setState({
                        picArr:[]
                    })
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //提交问题
    putIn(){
        this._loadInitialUser();
    }

    //获取选中专家的类型
    getService(type){
        this.setState({
            service:type
        })
    }

    //获取图片
    getImg(arr){
        this.setState({
            arr:arr
        })
    }
    //显示照册或相机
    cameraShow(){
        this.setState({
            show:true
        })
    }

    //隐藏照册或相机
    cameraHide(){
        this.setState({
            show:false
        })
    }

    //得到照片的数组
    getPic(photos,condition){
        this.setState({
            picArr:photos,
            camera:condition
        })
    }
    render(){
        const { state } = this.props.navigation;
        return(
            <View>
                <PubTop navigation={this.props.navigation} public={this.putIn} />
                <ScrollView>
                    <View style={{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                        <TextInput
                            style={{height: 120,marginLeft:15,marginRight:15}}
                            placeholder="请填写你的问题"
                            underlineColorAndroid="transparent"
                            multiline={true}
                            textAlignVertical="top"
                            keyboardType="default"
                            placeholderTextColor="#999"
                            onChangeText={(text) => {this.state.text = text}}
                            ref="aTextInputRef"
                        />
                        <View style={styles.pic_box}>
                            <CameraButton camera={this.state.camera} picArr={this.state.picArr} getImg={this.getImg} cameraShow={this.cameraShow} />
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff',height:40,paddingTop:5}}>
                        <View style={{flex:1,flexDirection:'row',paddingLeft:15}}>
                            <View>
                                <Switch onValueChange={(value) => this.isChange(value)}
                                        value={this.state.trueSwitchIsOn}/>
                            </View>
                            {this.changeFont()}
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff',marginTop:15,padding:15}}>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontSize:12}}>我想让以下方面得专家解答</Text>
                        </View>
                        <View>
                             <Btn title="不限"  getService={this.getService} />
                        </View>
                    </View>
                </ScrollView>
                <Camera cameraHide={this.cameraHide} getPic={this.getPic} show={this.state.show}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    case:{
        backgroundColor:'#fff',
        padding:15,
    },
    pic_box:{
        paddingHorizontal:15,
        marginBottom:15,
        flex:1,
        flexDirection:'row'
    },

});