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
    FlatList,
    ToastAndroid,
    ScrollView,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import {request_article_yinshi_list} from "../api"
import Loadmore from "../loadmore/loadmore"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class DietListdetailed extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "饮食推荐",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#f5f5f5"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state = {
            food_list:[],
            btn:"加载更多",
            num:null,
            count:5,
            user:{},
            index:0
        }
        this.hidden_btn=this.hidden_btn.bind(this)
        this.render_list=this.render_list.bind(this)
        this.hello=this.hello.bind(this)
    }

    componentDidMount(){
        this.setState({
            food_list:this.props.diet_list
        })
    }

    hidden_btn(){
        if(this.state.num){
            return <Loadmore btn={this.state.btn} render_list={this.render_list}/>
        }else{
            return null
        }
    }
    render_list(){
        if(this.state.count >= this.state.num){
            this.setState({
                count:this.state.num,
                btn:"没有更多了"
            })
            return false
        }else{
            this.setState({
                count:this.state.count+=5,
                btn:"加载中..."
            })
        }
    }
    hello(){

    }
    render(){
        return(
            <View style={{flex:1}}>
                <Text onPress={()=>{this.hello()}}>哈哈</Text>
                <ScrollView>
                <FlatList
                   data={this.state.food_list}
                   renderItem={({item})=>{
                       return (
                           <View style={{
                               width:width,
                               height:300,
                               backgroundColor:"#fff"
                           }}>
                               <TouchableWithoutFeedback onPress={()=>{this.props.navigate.navigate('Detailed',{
                                   img:item.banner,
                                   author_img:item.author_img,
                                   tags_name:item.tags_name,
                                   title:item.title,
                                   time:item.created_at
                               })}}>
                                   <View>
                                       <View style={{width:width,height:230,justifyContent:"center",alignItems:"center"}}>
                                           <Image source={{uri:item.banner}} style={{width:width-20,height:210}}/>
                                       </View>
                                       <View style={{width:width,height:30,paddingLeft:10,paddingRight:10,alignItems:"center",flexDirection:"row"}}>
                                           <Text style={{color:"#999"}}>#福滋味</Text>
                                           <Text style={{color:"#333"}}>{item.title}</Text>
                                       </View>
                                       <View style={{width:width,height:30,paddingRight:10,paddingLeft:10,alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                                           <View style={{flexDirection:"row"}}>
                                               <Image source={{uri:item.author_img}} style={{width:22,height:22}}/>
                                               <Text style={{marginLeft:5,color:"#999"}}>{item.tags_name}</Text>
                                           </View>
                                           <View style={{flexDirection:"row"}}>
                                               <Text style={{color:"#999"}}>浏览 2367</Text>
                                               <Text style={{color:"#999",marginLeft:5}}>收藏 0</Text>
                                           </View>
                                       </View>
                                       <View style={{width:width,height:15,backgroundColor:"#f3f3f3"}}></View>
                                   </View>
                               </TouchableWithoutFeedback>
                           </View>
                       )
                   }}
                />
                {this.hidden_btn()}
                </ScrollView>
            </View>
        )
    }
}