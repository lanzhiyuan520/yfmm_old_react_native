import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    FlatList,
    Dimensions,
    AsyncStorage,
    ScrollView,
    RefreshControl
} from 'react-native';
import Header from './commen/header';
import constants from './constants';
import VideoDetail from './find/video_detail';
var {width,height} = Dimensions.get('window');
import {getSingedUrl,getEncryptParam,decrypt} from "./tools/tools";
let count=0;
import LoadingMore from './loading_more';
export default class Find extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            limit:5,
            offset:0,
            user:{},
            actionNum:0,
            loadMore:false,
            isRefreshing: false,
            finish:false,
            count:0
        }
        this.renderList=this.renderList.bind(this);
    }

    componentDidMount(){
        let offset=0;
        this._loadInitialUser(offset);
    }
    //获取用户信息
    async _loadInitialUser(offset){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData(offset);
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    //监听列表滚到底部
    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
            if(this.state.count==1){
                console.log("数据加载完成")
            }else {
                this.setState({
                    loadMore:true,
                    actionNum:this.state.actionNum+1
                });
                let offset=(this.state.actionNum+1)*5;
                this._loadInitialUser(offset);
            }
        }
    }
    //刷新函数
    _onRefresh(){
        let offset=0;
        if(this.state.dataSource.length ==0){
            this._loadInitialUser(offset);
        }
    }

    requestData(offset){
        const url=constants.url+"/v1/article?uuid="+this.state.user.uuid+"&articleType=4&orderBy=createTimeDesc&limit="+this.state.limit+"&offset="+offset;
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let oldArr=this.state.dataSource;
                let newArr=responseJson.data.dataList;
                if(newArr.length<5 && newArr.length>=0){
                    this.setState({
                        count:1,
                        finish:true,
                        actionNum:this.state.actionNum-1
                    });
                    if(this.state.count==1){
                        let allArr=[...oldArr,...newArr];
                        this.setState({
                            dataSource:allArr
                        });
                    }
                }else {
                    allArr=[...oldArr,...newArr];
                    this.setState({
                        dataSource:allArr
                    })
                }

            })
            .catch((err) => {
                console.error('数据请求失败:'+err);
            });


    }

    //列表加载
    renderList(){
        let oldArr=[];
        if(this.state.dataSource.length ==0){
            return(
                <View style={{backgroundColor:'#fff',width:width,height:height}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:80,height:65}} source={require('../img/app_nothing.png')} />
                        <Text style={{fontSize:10,color:'#999',marginTop:10}}>下拉刷新试试~</Text>
                    </View>
                </View>
            )
        }else {
            this.state.dataSource.map((item,index)=>{
                oldArr.push(
                    <View key={index}>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigate('VideoDetail',{id:item.id,author:item})}>
                            <View style={styles.container}>
                                <View style={styles.rightContainer}>
                                    <Image onLoadStart={()=>console.log(item.banner)} source={{uri:item.banner}} style={styles.pic}/>
                                    <View style={styles.mask}></View>
                                    <View style={{position:'absolute',left:(width-30)/2,top:90,marginLeft:-25,marginTop:-25,zIndex:999}}>
                                        <Image style={{width:50,height:50}} source={{uri:"http://cdn.ayi800.com/app_faxian/@2px_btn_play_big.png"}}/>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:'row',marginVertical:5}}>
                                    <View style={{marginRight:5}}>
                                        <Text style={{color:'#999',fontSize:14}}>#{item.tags_name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{color:'#444',fontSize:14}}>{item.title}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={{marginRight:5}}>
                                                <Image source={{uri:item.author_img}} style={{width:20,height:20,borderRadius:10}} />
                                            </View>
                                            <View>
                                                <Text style={{color:'#999',fontSize:12}}>{item.author_name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{color:'#999',fontSize:12}}>播放{item.visit_num}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
            })
            return oldArr;
        }
    }


    render(){
        return(
            <View style={{marginTop:(Platform.OS === 'ios' ? -20 : 0)}}>
                <Header title="发现" back="false" />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this._onRefresh()}
                            tintColor="#000"
                            title="加载中..."
                            titleColor="#000"
                            colors={['#999', '#999', '#999']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}
                >
                    <View>
                        {this.renderList()}
                    </View>
                    <LoadingMore
                        finish={this.state.finish}
                        isLoading={this.state.loadMore}
                        onLoading={()=>{
                            let offset=(this.state.actionNum+1)*5;
                            this.requestData(offset);
                        }}
                    />
                    <View style={{height:45,width:width,marginTop:10}}></View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: '#fff',
        marginBottom:10,
        height:'auto',
        padding:15
    },
    rightContainer: {
        position:'relative'
    },
    pic:{
        // width:width,
        height:180,
    },
    mask:{
        width:width-30,
        height:180,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        left:0,
        top:0,
    }
});

