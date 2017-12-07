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
    AsyncStorage,
    RefreshControl
} from 'react-native';
import Header from './../commen/header';
import Btn from './../column/att_btn';
import OrtherList from './orther_dongtai';
import constants from './../constants';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
import LoadingMore from './../loading_more';
export default class Expert extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.state={
            author:{},
            num:'',
            attend:'false',
            isRefreshing: false,
            loadMore:false,
            actionNum:0,
            list:[],
            finish:false,
            count:0,
            user:{}
        };
        this._loadInitialState=this._loadInitialState.bind(this);
        this.header=this.header.bind(this);
        this. _onScroll=this. _onScroll.bind(this);
        this.requestData=this.requestData.bind(this);
        this.requestLists=this.requestLists.bind(this);
    }

    componentWillMount(){
        const id=this.props.navigation.state.params.id;
        // this.requestData(id);
        let offset=0;
        // this.requestLists(id,offset);
        this._loadInitialUser(id,offset)
    }
    //获取用户信息
    async _loadInitialUser(id,offset){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData(id);
                that.requestLists(id,offset);
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }
    //关注收藏按钮
    componentDidMount(){
        const id=this.props.navigation.state.params.id;
        this._loadInitialState(id);
    }
    async _loadInitialState(id){
        try{
            var value=await AsyncStorage.getItem('userActionList');
            if(value!=null){
                result=JSON.parse(value);
                if(result.guanzhu.daren.dataList.indexOf(id) !== -1){
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
    //请求页面头部数据
    requestData(id){
        const url=constants.url+'/v1/professionals?uuid='+this.state.user.uuid+'&rid='+id;
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
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

    //请求页面列表数据
    requestLists(id,offset){
        const url=constants.url+'/v1/article?uuid='+this.state.user.uuid+'&limit=5&offset='+offset+'&orderBy=created_at desc&authId='+id+'&articleSource=auth';
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responsejson) => {
                 let oldArr=this.state.list;
                 let newArr=responsejson.data.dataList;
                 this.setState({
                     count:responsejson.data.count
                 });
                 if(newArr.length<5){
                     this.setState({
                         finish:true,
                         actionNum:this.state.actionNum-1
                     })
                 }else {
                     allArr=[...oldArr,...newArr];
                     this.setState({
                         list:allArr,
                     });
                 }
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }

    //监听列表滚到底部
    _onScroll(event) {
        const id=this.props.navigation.state.params.id;
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
            const id=this.props.navigation.state.params.id;
            this.setState({
                loadMore:true,
                actionNum:this.state.actionNum+1
            });
            let offset=(this.state.actionNum+1)*5;
            this.requestLists(id,offset);
        }
    }
    //刷新函数
    _onRefresh(){
        alert('刷新成功')
    }
    header(){
        if(this.props.navigation.state.params.changeBtn){
            return (
                 <Header title={this.state.author.name} attend={this.state.attend} back="true" changeBtn={this.props.navigation.state.params.changeBtn}  navigation={this.props.navigation}  />
            )
        }else{
        return(
                <Header title={this.state.author.name} attend={this.state.attend} back="true" navigation={this.props.navigation} />
            )
        }
    }
    render(){
        const {state}=this.props.navigation;
        return(
            <View style={{marginBottom:30}}>
                {
                    this.header()
                }
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
                    <OrtherList list={this.state.list} isLoading={this.state.loadMore} actionNum={this.state.actionNum} id={state.params.id}/>
                    <View style={{height:40}}>
                        <LoadingMore
                            finish={this.state.finish}
                            isLoading={this.state.loadMore}
                            onLoading={()=>{
                                const id=this.props.navigation.state.params.id;
                                this.setState({
                                    loadMore:true,
                                    actionNum:this.state.actionNum+1
                                });
                                let offset=(this.state.actionNum+1)*5;
                                this.requestLists(id,offset);
                            }}
                        />
                    </View>
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