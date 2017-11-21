/**
 * Created by Administrator on 2017/10/24.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    AsyncStorage
} from 'react-native';
import Mycolumn from './myColumn';
import Recommend from './rec_column';
import constants from './../constants';
export default class Column  extends Component {

    constructor(props){
        super(props);
        this.state={
            column:[],
            list:[],
            data:[],
            newColumn:null,
            change:true
        }
        this.changeData=this.changeData.bind(this);
        this._loadInitialState=this._loadInitialState.bind(this);
    }

    componentWillMount(){
        this.requestData();
        this._loadInitialState();
    }

    async _loadInitialState(){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                result = result.guanzhu.zhuanlan.dataList;
                this.setState({
                    list:result
                })
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    requestData(){
        fetch(constants.url+'/v1/group?type=12312&offset=0&limit=4&orderby=weight&uuid='+constants.uuid+'&action_num=1')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data:response.data.group_list
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }



    changeData(){
        this._loadInitialState();
    }

    render() {
        return (
            <View>
                <Mycolumn navigate={this.props.navigate} change={this.changeData} data={this.state.data} lists={this.state.list}/>
                <Recommend navigate={this.props.navigate} change={this.changeData} data={this.state.data} list={this.state.list}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({

});