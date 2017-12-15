/**
 * Created by Administrator on 2017/10/31.
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
    ScrollView
} from 'react-native';
import Header from './../commen/header';
import Btn from './../column/att_btn';
import constants from './../constants';
import AnserList from './answer_list';
import { AsyncStorage } from 'react-native';
import Share from './../commen/share';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Problem extends Component{

    static navigationOptions = {
       header:null
    };

    constructor(props){
        super(props);
        this.state={
            author:{},
            attend:'false',
            show:false,
            user:{},
            expert:{}
        };
        this._loadInitialState=this._loadInitialState.bind(this);
    }

    componentWillMount(){
        const id=this.props.navigation.state.params.id;
        // this.requestData(id);
        this._loadInitialUser(id);
    }

    componentDidMount(){
        const id=this.props.navigation.state.params.id;
        this._loadInitialState(id);
    }
    //获取用户信息
    async _loadInitialUser(id){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData(id)
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }
    //问题初始化
    async _loadInitialState(id){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            console.log(value)
            if(value!=null){
                result=JSON.parse(value);
                if(result.shoucang.wenti.dataList.indexOf(id) !== -1){
                    this.setState({
                        attend:'true'
                    })
                }
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }



    //渲染图片
    renderPic(){
        let images=this.props.navigation.state.params.images;
        let newArr=[];
        if( images!== null && images!== undefined){
            images.forEach(function(listItem,index){
                if(listItem.indexOf('http') == -1 ){
                    newArr.push(
                        <View key={index} style={{marginRight:10}}>
                            <Image source={{uri:listItem}} style={{width:100,height:75}} />
                        </View>
                    )
                }else {
                    newArr.push(
                        <View key={index} style={{marginRight:10}}>
                            <Image source={{uri:'http://'+listItem}} style={{width:100,height:75}} />
                        </View>
                    )
                }

            })
        }
        return newArr;
    }
    renderTop(){
        return (
            <View>
                <View style={{paddingLeft:15,paddingRight:15}}>
                    <View style={{marginBottom:15}}>
                        <Text>{this.state.author.content}</Text>
                    </View>
                    <View style={[styles.flex_row,styles.wrap,styles.mb_15]}>
                        {this.renderPic()}
                    </View>
                </View>
            </View>
        )
    }
    //请求数据
    requestData(id){
        const url=constants.url+"/v1/problem?rid="+id+"&offset=0&limit=3&type=0&uuid="+this.state.user.uuid;
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    author:responseJson.data.hash_data,
                    expert:responseJson.data.hash_data.author_list
                })
            })
            .catch((err) => {
                console.error('数据请求失败'+err);
            });
    }
    //控制分享组件显示
    shareShow(){
        this.setState({
            show:true
        })
    }

    render(){
        const { state } = this.props.navigation;
        return(
            <View>
                <Header title="问题详情" back="true" share='true' navigation={this.props.navigation} shareShow={()=>this.shareShow()} />
                <ScrollView>
                    <View style={{backgroundColor:'#fff',marginBottom:10}}>
                        <View style={{backgroundColor:'#fff'}}>
                            <View style={styles.container}>
                                <View style={[styles.flex_row,styles.space_between]}>
                                    <View style={styles.flex_row}>
                                        <View style={{marginRight:10}}>
                                            <Image source={{uri:this.state.expert.head_img}} style={{width:30,height:30,borderRadius:15}} />
                                        </View>
                                        <View><Text style={{lineHeight:25,fontSize:12}}>{state.params.author.nickname}</Text></View>
                                    </View>
                                    <View>
                                        <Btn title="收藏" attend={this.state.attend} subtitle="已收藏" collect="collect" operateType="5" id={state.params.id}/>
                                    </View>
                                </View>
                            </View>
                                {this.renderTop()}
                            <View style={[styles.flex_row,styles.space_between,styles.p_15]}>
                                <View>
                                    <Text style={{fontSize:10}}>{this.state.author.create_at}</Text>
                                </View>
                                <View>
                                    <View style={[styles.flex_row]}>
                                        <Text style={{fontSize:10,marginRight:5}}>回答 {this.state.author.reply_num}</Text>
                                        <Text  style={{fontSize:10}}>浏览 {this.state.author.liulan_num}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <AnserList reply={this.state.author.liulan_num} id={state.params.id}/>
                </ScrollView>
                <Share show={this.state.show} id={state.params.id} url="problem" title={this.state.author.content}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:15,
        height:50,
    },
    flex_row:{
        flex:1,
        flexDirection:'row',
    },
    space_between:{
        justifyContent:'space-between'
    },
    mb_30:{
        marginBottom:30
    },
    mb_50:{
        marginBottom:80
    },
    wrap:{
        flexWrap:'wrap',
        height:'auto'
    },
    p_15:{
        paddingHorizontal:15,
        paddingBottom:15
    },
    mb_15:{
        marginBottom:15
    },
});