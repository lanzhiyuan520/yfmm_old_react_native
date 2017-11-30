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
    AsyncStorage,
    RefreshControl,
    ScrollView,
    Dimensions
} from 'react-native';
import Mycolumn from './myColumn';
import Recommend from './rec_column';
import constants from './../constants';
import LoadingMore from './../loading_more';
var {width} = Dimensions.get('window');
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Column  extends Component {

    constructor(props){
        super(props);
        this.state={
            column:[],
            list:[],
            data:[],
            newColumn:null,
            change:true,
            finish:false,
            isRefreshing: false,
            loadMore:false,
            actionNum:0
        }
        this.changeData=this.changeData.bind(this);
        this._loadInitialState=this._loadInitialState.bind(this);
        this._onScroll=this._onScroll.bind(this);
    }
    //初始化数据
    componentWillMount(){
        const offset=0;
        this.requestData(offset);
        this._loadInitialState();
    }


    //监听列表滚到底部
    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
            this.setState({
                loadMore:true,
                actionNum:this.state.actionNum+1
            });
            let offset=(this.state.actionNum+1)*5;
            this.requestData(offset);
        }
    }
    //刷新函数
    _onRefresh(){

        alert('刷新成功')
    }

    //点击加载更多数据
    loadeMore(){
        this.setState({
            loadMore:true,
            actionNum:this.state.actionNum+1
        });
        let offset=(this.state.actionNum+1)*5;
        this.requestData(offset);
    }

    //从存储中取出数据，判断关注按钮的状态
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
            console.log('AsyncStorage错误'+error.message);
        }
    }
    //请求数据
    requestData(offset){
        const url=constants.url+'/v1/group?type=12312&offset='+offset+'&limit=4&orderby=weight&uuid='+constants.uuid+'&action_num=1';
        const urlSigned = getSingedUrl(url, constants.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": constants.token
            }
        })
            .then((response) => response.json())
            .then((response) => {
                let oldArr=this.state.data;
                let newArr=response.data.group_list;
                let allArr={};
                let count=0;
                for(var i in newArr){
                    count++;
                }
                if(count<=0){
                    this.setState({
                        finish:true,
                        actionNum:this.state.actionNum-1
                    })
                }else {
                    Object.assign(allArr,oldArr,newArr);
                    this.setState({
                        data:allArr
                    });
                }
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this._onRefresh()}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#999', '#999', '#999']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}
                >
                <Mycolumn navigate={this.props.navigate} change={this.changeData} data={this.state.data} lists={this.state.list}/>
                <Recommend navigate={this.props.navigate} change={this.changeData} data={this.state.data} list={this.state.list}/>
                <LoadingMore
                    finish={this.state.finish}
                    isLoading={this.state.loadMore}
                    onLoading={()=>this.loadeMore()}
                />
                <View style={{height:40,width:width}}></View>
                </ScrollView>
            </View>
        );
    }

}
const styles = StyleSheet.create({

});