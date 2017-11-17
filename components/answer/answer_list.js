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
    FlatList
} from 'react-native';
import constants from './../constants';
import Problem from './problem_detail';
import Hand from './../commen/hand'
export default class AnswerList extends Component {
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

    requestData(){
        fetch(constants.url+"/v1/problem?type=1&orderby=weight&offset=0&limit=4&uuid="+constants.uuid)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
                this.setState({
                    data:responseJson.data,
                });
            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

    render() {
        var that=this;
        return (
            <View style={{backgroundColor:'#fff',paddingTop:15,marginBottom:50}}>
                <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
                    <View>
                        <Text style={{fontSize:12}}>回答：125</Text>
                    </View>
                </View>
                {
                    <View>
                        {this.state.data.map(function(listItem){
                            return  (
                                <View>
                                    <TouchableWithoutFeedback>
                                        <View style={{height:'auto',flex:1,justifyContent:'space-around',borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',padding:15}}>
                                            <View style={{flex:1,flexDirection:'row',height:20,marginBottom:15}}>
                                                <View style={{marginRight:10}}>
                                                    <Image source={{uri:listItem.author_list.head_img}} style={{width:30,height:30,borderRadius:15}} />
                                                </View>
                                                <View>
                                                    <View><Text style={{fontSize:11}}>{listItem.author_list.nickname}</Text></View>
                                                    <View><Text style={{fontSize:10,color:'#999'}}>{listItem.author_list.nickname}</Text></View>
                                                </View>
                                            </View>
                                            <View><Text style={styles.show_two}>{listItem.content}</Text></View>
                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                                <View><Text>{listItem.create_at}</Text></View>
                                                 <Hand id={listItem.id} num={listItem.reply_num}/>
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