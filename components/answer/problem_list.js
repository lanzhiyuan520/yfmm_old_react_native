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
    FlatList
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
            data:[],
            sort:true,
            limit:this.props.problemLimit,
            orderby:'weight',
            more_title:'点击加载更多数据'
        }
    }
    componentDidMount(){
        const orderby='weight';
        this.requestData(orderby);
        console.log(this.props)
    }

    requestData(orderby){
        fetch(constants.url+"/v1/problem?type=1&orderby="+orderby+"&offset=0&limit="+this.state.limit+"&uuid="+constants.uuid)
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
        return (
            <View style={{backgroundColor:'#fff',paddingTop:15,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
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
                {
                    <View>
                        {this.state.data.map(function(listItem){
                            return  (
                            <View>
                                <TouchableWithoutFeedback onPress={()=> that.props.navigate('Problem',{id:listItem.id,author:listItem.author_list}) }>
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