/**
 * Created by Administrator on 2017/10/17.
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
//Question
var QUESTIONLIST = "problem?";
var API_VERSION = "v1/";

export default class ProblemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:this.props.data,
            limit:this.props.problemLimit,
            orderby:'weight',
            more_title:'点击加载更多数据',
            actionNum:0,
            offset:0,
            finish:false,
            user:{}
        }
    }
    componentDidMount(){
        // const orderby='weight';
        // const offset=0;
        // this._loadInitialUser(orderby,offset);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }


    //渲染图片
    renderItem(images){
        let newArr=[];
        console.log(images)
        if( images!== null && images!== undefined){
            images.forEach(function(listItem,index){
                if(listItem !== null && listItem.indexOf('http') !== -1) {
                    newArr.push(
                        <View key={index} style={{marginRight: 5, marginBottom: 5}}>
                            <Image source={{uri:listItem}} style={{width: 50, height: 40}}/>
                        </View>
                    )
                }else {
                    newArr.push(
                        <View key={index} style={{marginRight: 5, marginBottom: 5}}>
                            <Image source={{uri:'http://'+listItem}} style={{width: 50, height: 40}}/>
                        </View>
                    )
                }
            })
        }
        return newArr;
    }
    render() {
        var that=this;
        console.log(this.state.data)
        if(this.state.data.length==0){
            return (
                <View style={{backgroundColor:'#fff',flex:1,justifyContent:'center',alignItems:'center',height:200,marginBottom:10}}>
                    <Image style={{width:80,height:65}} source={require('../../img/app_no_network.png')} />
                </View>
            )
        }else {
            return (
                <View>
                    <View style={{backgroundColor:'#fff',paddingTop:15,marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.props.changeSort('weight')}>
                                    <View>
                                        <Text style={this.props.sort? styles.black_color:styles.light_color}>最热</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.division}></View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.props.changeSort('create')}>
                                    <View>
                                        <Text style={this.props.sort? styles.light_color:styles.black_color}>最新</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {
                            <View>
                                {this.state.data.map(function(listItem,index){
                                    console.log(listItem)
                                    if(listItem.images==null){
                                        return  (
                                            <View key={index}>
                                                <TouchableWithoutFeedback onPress={()=> that.props.navigate('Problem',{id:listItem.id,author:listItem.author_list,images:listItem.images}) }>
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
                                    }else {
                                        return  (
                                            <View key={index}>
                                                <TouchableWithoutFeedback onPress={()=> that.props.navigate('Problem',{id:listItem.id,author:listItem.author_list,images:listItem.images}) }>
                                                    <View style={{height:'auto',flex:1,justifyContent:'space-around',borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',padding:15}}>
                                                        <View style={{flex:1,flexDirection:'row',height:20,marginBottom:10}}>
                                                            <View style={{marginRight:10}}>
                                                                <Image source={{uri:listItem.author_list.head_img}} style={{width:20,height:20,borderRadius:10}} />
                                                            </View>
                                                            <View><Text>{listItem.author_list.nickname}</Text></View>
                                                        </View>
                                                        <View>
                                                            <View style={{marginBottom:5}}>
                                                                <Text style={styles.show_two}>{listItem.content}</Text>
                                                            </View>
                                                            <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',height:'auto'}}>
                                                                {that.renderItem(listItem.images)}
                                                            </View>
                                                        </View>
                                                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                                            <View><Text>回答:{listItem.reply_num}   浏览:{listItem.liulan_num}</Text></View>
                                                            <View><Text>{listItem.create_at}</Text></View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        }
                    </View>
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