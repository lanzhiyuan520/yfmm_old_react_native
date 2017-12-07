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
    AsyncStorage
} from 'react-native';
import Header from './commen/header';
import constants from './constants';
import VideoDetail from './find/video_detail';
var {width,height} = Dimensions.get('window');
import {getSingedUrl,getEncryptParam,decrypt} from "./tools/tools";
let count=0;
export default class Find extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            refreshing: false,
            limit:5,
            offset:0,
            user:{},
            action_num:0
        }
        this._onload=this._onload.bind(this);
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
                    count++;
                    if(count==1){
                        allArr=[...oldArr,...newArr];
                        this.setState({
                            dataSource:allArr,
                            refreshing: false
                        })
                    }
                    console.log('到底了');
                    this.setState({
                        action_num:this.state.action_num-1
                    });
                }else {
                    allArr=[...oldArr,...newArr];
                    this.setState({
                        dataSource:allArr,
                        refreshing: false
                    })
                }

            })
            .catch((err) => {
                console.error('数据请求失败:'+err);
            });
    }

    renderItem(item){
        return(
            <View>
                <TouchableWithoutFeedback onPress={()=>this.props.navigate('VideoDetail',{id:item.id,author:item})}>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Image source={{uri:item.banner}} style={styles.pic}/>
                            {/*<View style={styles.mask}></View>*/}
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
    }
    //加载更多
    _onload(){
        let timer =  setTimeout(()=>{
            this.setState({
                action_num:this.state.action_num+1
            });
            let offset=this.state.action_num*5;
            this._loadInitialUser(offset);
            clearTimeout(timer);
        },1500)
    }
    _extraUniqueKey(item ,index){ return "index"+index+item; }

    //列表加载
    renderList(){
        if(this.state.dataSource.length==0){
            return(
                <View style={{backgroundColor:'#fff',width:width,height:height}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:80,height:65}} source={require('../img/app_nothing.png')} />
                        <Text style={{fontSize:10,color:'#999',marginTop:10}}>下拉刷新试试~</Text>
                    </View>
                </View>
            )
        }else {
            return(
                <FlatList
                    keyExtractor = {this._extraUniqueKey}
                    data={this.state.dataSource}
                    getItemLayout={(data, index) => ( {length: 100, offset: 100 * index, index} )}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onload}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({refreshing: true});
                        let offset=0;
                        this._loadInitialUser(offset);
                    }}
                    renderItem={({item}) => this.renderItem(item)}
                    style={{marginBottom:40}}
                />
            )
        }
    }


    render(){
        return(
            <View style={{marginTop:(Platform.OS === 'ios' ? -20 : 0)}}>
                <Header title="发现" back="false" />
                {this.renderList()}
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
        flex:1
    },
    pic:{
        flex:1,
        height:180,
    },
    mask:{
        width:width,
        height:180,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        right:0,
        top:0,
    }
});

