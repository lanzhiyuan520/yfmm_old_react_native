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
import Share from './../commen/share';
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

    requestData(id){
        fetch(constants.url+'/v1/group?rid='+id+'&offset=0&limit=1&uuid=6e76-933cad1-41a6130-3392c69-0ff2bd7')
            .then((response) => response.json())
            .then((response) => {
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
        try {
            AsyncStorage.getItem(
                'userActionList',
                (error,result)=>{
                    if (error){
                        console.log(error);
                    }else{
                        result=JSON.parse(result);
                        if(result.guanzhu.zhuanlan.dataList.length !== 0){
                            if(result.guanzhu.zhuanlan.dataList.indexOf(id) !== -1){
                                this.setState({
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

    shareShow(){
        this.setState({
            show:true
        })
    }

    render(){
        const { state } = this.props.navigation;
        return(
            <View>
                <Header title={this.state.author.group_name} shareShow={()=>this.shareShow()} changeBtn={state.params.removeItem} back="true" share='false' navigation={this.props.navigation} />
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
                <Share show={this.state.show}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top_content:{
        fontSize:11
    }
});