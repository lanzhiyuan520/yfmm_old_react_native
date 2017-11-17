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
    ToastAndroid
} from 'react-native';
import PubTop from './publish_top';
import Btn from './btn';
import Camera from './CameraButton';
import constants from './../constants';
// import queryString from 'query-string';
import qs from 'qs';
export default class Find extends Component{
    static navigationOptions = {
        header:null
    }
    constructor(props){
        super(props);
        this.state={
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            service:0,
            quiz:0,
            text:'',
            arr:[]
        }
        this.getService=this.getService.bind(this);
        this.putIn=this.putIn.bind(this);
        this.getImg=this.getImg.bind(this);
        this.postData=this.postData.bind(this);
    }

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

    //提交数据
    postData(){
        let img=JSON.stringify([]);
        let data={'author_id':constants.userId,'content':this.state.text,'service_groups':'1','service_id':this.state.service,'anonymous':'0','adapter':'1'};
        data=qs.stringify(data);
        fetch(constants.url+"/v1/problem?uuId="+constants.uuid,{
            method: "patch",
            mode: 'same-origin',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:data,
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
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //提交问题
    putIn(){
        console.log(this.state.arr);
        //获取匿名提问还是公开提问
        if(this.state.trueSwitchIsOn){
            this.setState({
                quiz:0
            })
        }else {
            this.setState({
                quiz:1
            })
        }
        this.postData()

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
                            <Camera getImg={this.getImg} />
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff',height:40,paddingTop:5}}>
                        <View style={{flex:1,flexDirection:'row',paddingLeft:15}}>
                            <View>
                                <Switch onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
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
                             <Btn title="不限" getService={this.getService} />
                        </View>
                    </View>
                </ScrollView>
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