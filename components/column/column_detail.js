/**
 * Created by Administrator on 2017/11/1.
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
    ScrollView,
    AsyncStorage
} from 'react-native';
import Header from './../commen/header';
import Att from './att_btn'
import constants from './../constants';
import ProblemList from './column_problem';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Problem extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.state={
            author:{},
            attend:'false'
        };
        this._loadInitialState=this._loadInitialState.bind(this);
    }

    componentWillMount(){
        const id=this.props.navigation.state.params.id;
        this.requestData(id);
    }

    requestData(id){
        const url=constants.url+'/v1/group?rid='+id+'&offset=0&limit=1&uuid='+constants.uuid;
        const urlSigned = getSingedUrl(url, constants.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": constants.token
            }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({
                    author:response.data.group_msg
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }

    componentDidMount(){
        const id=this.props.navigation.state.params.id;
        this._loadInitialState(id);
    }
    //获取存储的数据，判断是否关注或者收藏
    async _loadInitialState(id){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                if(result.guanzhu.zhuanlan.dataList.indexOf(id) !== -1){
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
    header(){
        if (this.props.navigation.state.params.removeItem){
            return (
                <Header title={this.state.author.group_name} changeBtn={this.props.navigation.state.params.removeItem}  back="true" navigation={this.props.navigation} />
            )
        }else{
            return (
                <Header title={this.state.author.group_name}   back="true" navigation={this.props.navigation} />
            )
        }
    }
    render(){
        const { state } = this.props.navigation;
        return(
            <View>
                {
                  this.header()
                }
                <ScrollView>

                    <View style={{marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row',padding:15,backgroundColor:'#fff'}}>
                            <View style={{flex:1}}>
                                <Image style={{width:100,height:80}} source={{uri:this.state.author.group_img}}/>
                            </View>
                            <View style={{flex:2}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={{fontSize:12}}>{this.state.author.group_name}</Text>
                                        <Text style={{fontSize:10,color:'#999'}}>关注{this.state.author.care_num}</Text>
                                    </View>
                                    <View>
                                        <Att title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="6" id={state.params.id}/>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.top_content} numberOfLines={3}>{this.state.author.group_content}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <ProblemList navigate={this.props.navigate} count={this.state.author.problem_count} id={state.params.id} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top_content:{
        fontSize:11
    }
});