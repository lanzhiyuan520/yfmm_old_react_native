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
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Header from './../commen/header';
import Btn from './../column/att_btn';
import OrtherList from './orther_dongtai';
import constants from './../constants';
export default class Expert extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.state={
            author:{},
            num:'',
            attend:'false'
        }
    }

    componentWillMount(){
        const id=this.props.navigation.state.params.id;
        this.requestData(id)
    }
    //关注收藏按钮
    componentDidMount(){
        const id=this.props.navigation.state.params.id;
        try {
            AsyncStorage.getItem(
                'userActionList',
                (error,result)=>{
                    if (error){
                        console.log(error)
                    }else{
                        result=JSON.parse(result);
                        if(result.guanzhu.daren.dataList.length!==0){
                            if(result.guanzhu.daren.dataList.indexOf(id) !== -1){
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

    requestData(id){
        fetch(constants.url+'/v1/professionals?uuid='+constants.uuid+'&rid='+id)
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({
                    author:responsejson.data.professional,
                    num:responsejson.data.care_num
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }


    render(){
        const {state}=this.props.navigation;
        return(
            <View>
                <Header title={this.state.author.name} attend={this.state.attend} back="true" changeBtn={state.params.changeBtn}  navigation={this.props.navigation} />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View>
                                    <Image style={{width:40,height:40,borderRadius:20,marginRight:10}} source={{uri:this.state.author.img}}/>
                                </View>
                                <View>
                                    <Text style={{fontSize:14,color:'#262626'}}>{this.state.author.name}</Text>
                                    <Text style={{fontSize:11,color:'#999'}}>关注{this.state.num}</Text>
                                </View>
                            </View>
                            <View><Btn title="关注" subtitle="已关注" attend={this.state.attend} collect="care" operateType="8" id={state.params.id}/></View>
                        </View>
                        <View><Text style={{fontSize:12,color:'#262626'}}>{this.state.author.content}</Text></View>
                    </View>
                    <OrtherList id={state.params.id}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:15,
        marginBottom:10
    }
})