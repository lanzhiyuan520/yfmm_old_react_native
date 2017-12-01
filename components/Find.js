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
    Dimensions
} from 'react-native';
import Header from './commen/header';
import constants from './constants';
import VideoDetail from './find/video_detail';
var {width} = Dimensions.get('window');
import {getSingedUrl,getEncryptParam,decrypt} from "./tools/tools";
export default class Find extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            refreshing: false,
            limit:5,
            offset:0
        }
        this._onload=this._onload.bind(this);
    }

    componentDidMount(){
        this.requestData();
    }
    
    requestData(){
        const url=constants.url+"/v1/article?uuid="+constants.uuid+"&articleType=4&orderBy=createTimeDesc&limit="+this.state.limit+"&offset="+this.state.offset;
        const urlSigned = getSingedUrl(url, constants.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": constants.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let oldArr=this.state.dataSource;
                let newArr=responseJson.data.dataList;
                allArr=[...oldArr,...newArr];
                this.setState({
                    dataSource:allArr,
                    refreshing: false
                })
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

    _onload(){
        let timer =  setTimeout(()=>{
            this.setState({
                offset:this.state.offset+1
            });
            this.requestData();
            clearTimeout(timer);
        },1500)
    }
    _extraUniqueKey(item ,index){ return "index"+index+item; }

    render(){
        return(
            <View style={{marginTop:(Platform.OS === 'ios' ? -20 : 0)}}>
                <Header title="发现" back="false" />
                <FlatList
                    keyExtractor = {this._extraUniqueKey}
                    data={this.state.dataSource}
                    getItemLayout={(data, index) => ( {length: 100, offset: 100 * index, index} )}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onload}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({refreshing: true});
                        alert('刷新成功~')
                    }}
                    renderItem={({item}) => this.renderItem(item)}
                    style={{marginBottom:40}}
                />
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

