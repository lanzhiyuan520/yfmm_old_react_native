/**
 * Created by Administrator on 2017/10/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
import constants from './../constants';
import PublishProblem from './publish_problem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExpertsList from './../Experts/ExpertsList';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
import Expertsdetails from "./../Experts/Expertsdetails"
export default class ExpertList extends Component {
    constructor(props){
        super(props);
        this.state={
            oldAry:[],
            navigation:this.props.navigation,
            user:{}
        };
        this._loadInitialUser=this._loadInitialUser.bind(this);
    }
    componentWillMount(){
        this._loadInitialUser();
    }
    // 获取用户信息
    async _loadInitialUser(){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    renderItem(){
        var itemAry=[];
        this.props.oldAry.map( (item,index)=> {
            itemAry.push(
                <TouchableWithoutFeedback key={index} onPress={()=> {this.props.navigate('Expertsdetails',{
                    expert:item.name,
                    user:this.state.user,
                    id:item.id
                })}}>
                    <View style={styles.container}>
                        <View>
                            <Image style={{width:scaleSize(100),height:scaleSize(100),borderRadius:scaleSize(50)}} source={{uri:item.img}}/>
                        </View>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                        <View>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={styles.ask_btn}>
                            <Text style={{lineHeight:20,textAlign:'center',color:'#ff8480'}}>去问TA</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
        return itemAry;
    }
    render() {
        if(this.props.oldAry.length==0){
            return (
                <View style={{backgroundColor:'#fff',flex:1,justifyContent:'center',alignItems:'center',height:162,marginBottom:10,}}>
                    <Image style={{width:80,height:65}} source={require('../../img/app_no_network.png')} />
                    <Text style={{fontSize:10,color:'#999',marginTop:10}}>下拉刷新试试~</Text>
                </View>
            )
        }else {
            return (
                <View style={[styles.scroll_box]}>
                    <View style={styles.article_item}>
                        <View style={{flex:1}}><Text style={styles.font_14}>专家推荐</Text></View>
                        <View style={{flex:1}}>
                            <TouchableWithoutFeedback onPress={()=>this.props.navigate('ExpertsList', {navigate: this.props.navigate, user: this.state.user})}>
                                <FontAwesome name="angle-right" style={styles.font_10} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <ScrollView style={styles.scroll_pic} horizontal>
                        {this.renderItem()}
                    </ScrollView>
                </View>
            );
        }
    }
}



const styles = StyleSheet.create({
    container:{
        borderWidth:0.5,
        width:135,
        height:162,
        borderColor:'#f2f2f2',
        marginRight:10,
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingTop:15,
        paddingBottom:15
    },
    scroll_box:{
        backgroundColor:'#fff',
        marginBottom:15,
        height:220,
    },
    font_10:{
        fontSize:20,
        lineHeight:13,
        textAlign:'right'
    },
    font_14:{
        fontSize:14
    },
    black_color:{
        color:'#262626'
    },
    article_item:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        paddingBottom:0
    },
    scroll_pic:{
        backgroundColor:'#fff',
        height:162,
        marginTop:-142,
        marginLeft:15,
        marginRight:5
    },
    ask_btn:{
        width:70,
        height:25,
        borderWidth:1,
        borderColor:'#f2f2f2',
        borderRadius:3
    }
});