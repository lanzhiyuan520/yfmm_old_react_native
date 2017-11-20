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
import AnserList from './answer_list'
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import Share from './../commen/share';
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 'null',
    enableCache: true
})

export default class Problem extends Component{

    static navigationOptions = {
       header:null
    };

    constructor(props){
        super(props);
        this.state={
            author:{},
            attend:'false',
            show:false
        }
    }

    componentWillMount(){
        const id=this.props.navigation.state.params.id;
        this.requestData(id);
    }
    componentDidMount(){
        const id=this.props.navigation.state.params.id;
        try {
            AsyncStorage.getItem(
                'userActionList',
                (error,result)=>{
                    if (error){
                        console.log(error);
                    }else{
                        result=JSON.parse(result);
                        var that = this;
                        if(result.shoucang.wenti.dataList.length !== 0){
                            if(result.shoucang.wenti.dataList.indexOf(id) !== -1){
                                that.setState({
                                    attend:'true'
                                })
                            }
                        }
                    }
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    renderPic(){
        if(false){
            return(
                <View>
                    <View style={[styles.flex_row,styles.wrap]}>
                        <View style={{marginRight:10,width:100,height:75,marginBottom:10}}>
                            <Image source={{uri:'http://cdn.ayi800.com/app-article-cover.jpg'}} style={{width:100,height:75}} />
                        </View>
                        <View style={{marginRight:10,width:100,height:75,marginBottom:10}}>
                            <Image source={{uri:'http://cdn.ayi800.com/app-article-cover.jpg'}} style={{width:100,height:75}} />
                        </View>
                        <View style={{marginRight:10,width:100,height:75,marginBottom:10}}>
                            <Image source={{uri:'http://cdn.ayi800.com/app-article-cover.jpg'}} style={{width:100,height:75}} />
                        </View>
                    </View>
                </View>
            )
        }
    }

    renderTop(){
        return (
            <View>
                <View style={{paddingLeft:15,paddingRight:15}}>
                    <View style={{marginBottom:15}}>
                        <Text>{this.state.author.content}</Text>
                    </View>
                    <View style={{height:'auto'}}>
                        {this.renderPic()}
                    </View>
                </View>
            </View>
        )
    }

    requestData(id){
        fetch(constants.url+"/v1/problem?rid="+id+"&offset=0&limit=3&type=0&uuid="+constants.uuid)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    author:responseJson.data.hash_data
                })
            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

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
                                            <Image source={{uri:state.params.author.head_img}} style={{width:30,height:30,borderRadius:15}} />
                                        </View>
                                        <View><Text style={{lineHeight:25,fontSize:12}}>{state.params.author.nickname}</Text></View>
                                    </View>
                                    <View>
                                        <Btn title="收藏" attend={this.state.attend} subtitle="已收藏" collect="collect" operateType="5" id={state.params.id}/>
                                    </View>
                                </View>
                            </View>
                            {this.renderTop()}
                        </View>
                    </View>
                    <AnserList/>
                </ScrollView>
                <Share show={this.state.show}/>
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
    }

});