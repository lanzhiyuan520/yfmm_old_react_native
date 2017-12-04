/**
 * Created by Administrator on 2017/11/2.
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
    Dimensions,
    FlatList,
    AsyncStorage
} from 'react-native';
import constants from './../constants';
import VideoDetail from './video_detail';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Recommend extends Component{

    constructor(props){
        super(props);
        this.state={
            list:[],
            user:{}
        }
    }

    componentWillMount(){
        this. _loadInitialUser()
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
                that.requestData();
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    requestData(){
        const url=constants.url+'/v1/article?uuid='+this.state.user.uuid+'&articleType=4&orderBy=createTimeDesc&limit=5&offset=0';
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    list:response.data.dataList
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }


    render(){
        const that =this;
        return(
            <View style={styles.container}>
                <View style={{paddingHorizontal:15}}>
                    <Text style={{fontSize:12,color:'#262626'}}>其他推荐</Text>
                </View>
                {
                    <View>
                        {this.state.list.map(function(listItem,index){
                                return(
                                <TouchableWithoutFeedback key={index} onPress={()=>that.props.navigation.navigate('VideoDetail',{id:listItem.id,author:listItem})}>
                                    <View style={{flex:1,flexDirection:'row',padding:15,borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',justifyContent:'space-between'}}>
                                        <View style={{flex:2,paddingRight:10,justifyContent:'space-between'}}>
                                            <View>
                                                <View style={{flex:1,flexDirection:'row'}}>
                                                    {/*<Text style={{marginRight:5,color:'#999',fontSize:12}}>#{listItem.tags_name}</Text>*/}
                                                    <Text style={{paddingRight:45,fontSize:12}}>{listItem.title}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                                    <View style={{flex:1,flexDirection:'row'}}>
                                                        <Image style={{width:20,height:20,borderRadius:10,marginRight:8}} source={{uri:listItem.author_img}}/>
                                                        <Text style={{color:'#999',fontSize:10,lineHeight:15}}>{listItem.author_name}</Text>
                                                    </View>
                                                    <Text style={{fontSize:10,color:'#999'}}>播放{listItem.visit_num}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{flex:1,alignItems:'flex-end'}}>
                                            <Image style={{width:90,height:65}} source={{uri:listItem.banner}}/>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                )
                            })}
                    </View>
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingTop:15,
        marginBottom:50
    }
})