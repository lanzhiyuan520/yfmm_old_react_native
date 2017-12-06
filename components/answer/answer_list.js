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
import Problem from './problem_detail';
import Hand from './../commen/hand';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class AnswerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            sort:true,
            limit:this.props.problemLimit,
            orderby:'weight',
            more_title:'点击加载更多数据',
            user:{},
            blank:false
        }
    }
    componentDidMount(){
        this._loadInitialUser();
    }

    //获取用户信息
    async _loadInitialUser(){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData();
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    requestData(){
        const url=constants.url+"/v1/reply?uuid="+this.state.user.uuid+"&offset=0&limit=10000&problem_id="+this.props.id+"&support=1";
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.code==0){
                    this.setState({
                        data:responseJson.data.reply_msg,
                    });
                }else {
                    this.setState({
                        blank:true
                    })
                }

            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

    render() {
        var that=this;
        if(this.state.blank) {
            return (
                <View style={{backgroundColor:'#fff',flex:1,justifyContent:'center',alignItems:'center',height:500}}>
                    <Image style={{width:125,height:100}} source={require('../../img/app_nothing.png')} />
                </View>
            )
            
        }else {
            return (
                <View style={{backgroundColor:'#fff',paddingTop:15,marginBottom:50}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
                        <View>
                            <Text style={{fontSize:12}}>回答：{this.props.reply}</Text>
                        </View>
                    </View>
                    {
                        <View>
                            {this.state.data.map(function(listItem,index){
                                return  (
                                    <View key={index}>
                                        <TouchableWithoutFeedback onPress={()=>alert(5)}>
                                            <View style={{height:'auto',flex:1,justifyContent:'space-around',borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',padding:15}}>
                                                <View style={{flex:1,flexDirection:'row',height:20,marginBottom:15}}>
                                                    <View style={{marginRight:10}}>
                                                        <Image source={{uri:listItem.author.img}} style={{width:30,height:30,borderRadius:15}} />
                                                    </View>
                                                    <View>
                                                        <View><Text style={{fontSize:11}}>{listItem.author.name}</Text></View>
                                                        <View><Text style={{fontSize:10,color:'#999'}}>{listItem.author.title}</Text></View>
                                                    </View>
                                                </View>
                                                <View><Text style={styles.show_two}>{listItem.content}</Text></View>
                                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                                    <View><Text>{listItem.create_at}</Text></View>
                                                    <Hand id={listItem.id} num={listItem.better_num}/>
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
    hand:{
        fontSize:15,
        color:"#ff8080",
        marginRight:5
    },
    un_hand:{
        fontSize:15,
        color:"#999",
        marginRight:5
    }
});