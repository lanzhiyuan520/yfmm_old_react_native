/**
 * Created by Administrator on 2017/11/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    AsyncStorage
} from 'react-native';
import constants from './../constants';
// import Problem from './problem_detail';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class ProblemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            sort:true,
            limit:4,
            orderby:'weight',
            more_title:'点击加载更多数据',
            user:{}
        }
    }
    componentDidMount(){
        const orderby='weight';
        this._loadInitialUser(orderby);
    }

    requestData(orderby){
        const url=constants.url+"/v1/problem?uuid="+this.state.user.uuid+"&support=1&group_id="+this.props.id+"&orderby="+orderby+"&offset=0&limit=5";
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data,
                });
            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

    //获取用户信息
    async _loadInitialUser(orderby){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData(orderby);
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    //最热最新按钮切换
    changeSort(orderby){
        if(orderby=='weight'){
            this.setState({
                sort:true,
                orderby:'weight'
            });
        }
        if(orderby=='create'){
            this.setState({
                sort:false,
                orderby:'create'
            });
        }
        this.requestData(orderby)
    }

    render() {
        var that=this;
        if(this.state.data.length==0){
            return (
                <View style={{backgroundColor:'#fff',flex:1,justifyContent:'center',alignItems:'center',height:500,marginBottom:10,marginTop:10}}>
                    <Image style={{width:80,height:65}} source={require('../../img/app_nothing.png')} />
                </View>
            )
        }else {
            return (
                <View style={{backgroundColor:'#fff',paddingTop:15,marginBottom:50}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:12}}>{this.props.count}个问题</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.changeSort('weight')}>
                                    <View>
                                        <Text style={this.state.sort? styles.black_color:styles.light_color}>最热</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.division}></View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.changeSort('create')}>
                                    <View>
                                        <Text style={this.state.sort? styles.light_color:styles.black_color}>最新</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    {
                        <View>
                            {this.state.data.map(function(listItem,index){
                                return  (
                                    <View key={index}>
                                        <TouchableWithoutFeedback>
                                            <View style={{height:'auto',flex:1,justifyContent:'space-around',borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',padding:15}}>
                                                <View style={{flex:1,flexDirection:'row',height:20,marginBottom:10}}>
                                                    <View style={{marginRight:10}}>
                                                        <Image source={{uri:listItem.author_list.head_img}} style={{width:20,height:20,borderRadius:10}} />
                                                    </View>
                                                    <View><Text>{listItem.author_list.nickname}</Text></View>
                                                </View>
                                                <View><Text style={styles.show_two}>{listItem.content}</Text></View>
                                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                                    <View><Text>回答:{listItem.reply_num}   浏览:{listItem.liulan_num}</Text></View>
                                                    <View><Text>{listItem.create_at}</Text></View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )
                            })}
                        </View>
                    }
                </View>
            );
        }
    }
}



const styles = StyleSheet.create({
    division:{
        width:2,
        height:15,
        backgroundColor:'#999',
        marginLeft:8,
        marginRight:8
    },
    black_color:{
        color:'#333',
        fontSize:12
    },
    light_color:{
        color:'#999',
        fontSize:12
    },

});