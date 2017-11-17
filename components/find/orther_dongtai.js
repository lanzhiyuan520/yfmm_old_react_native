/**
 * Created by Administrator on 2017/11/3.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
import constants from './../constants';
export default class OrtherList extends Component{

    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }

    componentWillMount(){
        const id=this.props.id;
        this.requestData(id)
    }

    requestData(id){
        fetch(constants.url+'/v1/article?uuid='+constants.uuid+'&limit=5&offset=0&orderBy=created_at desc&authId='+id+'&articleSource=auth')
            .then((response) => response.json())
            .then((responsejson) => {
               console.log(responsejson);
               this.setState({
                   list:responsejson.data.dataList
               })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{paddingLeft:15}}>
                    <Text style={{fontSize:12,color:'#262626'}}>TA的动态</Text>
                </View>
                <View>
                    {
                        <View>
                            {
                                this.state.list.map(function(listItem){
                                    return(
                                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:15,borderBottomWidth:0.5,borderBottomColor:'#f2f2f2'}}>
                                            <View style={{flex:2,justifyContent:'space-between',paddingRight:10}}>
                                                <View>
                                                    <Text style={{fontSize:12}}>{listItem.title}</Text>
                                                </View>
                                                <View>
                                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                                        <Text style={{color:'#999',fontSize:10,lineHeight:15}}>{listItem.created_at}</Text>
                                                        <Text style={{fontSize:10,color:'#999'}}>阅读{listItem.visit_num}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Image style={{width:90,height:65}} source={{uri:listItem.banner}}/>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    }

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingTop:15,
        marginBottom:50
    }
})