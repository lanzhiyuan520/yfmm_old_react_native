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
    ScrollView
} from 'react-native';
var {width} = Dimensions.get('window')
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import Loadmore from "../loadmore/loadmore"
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><Image source={require("../../img/jiantou.png")} style={{width:30,height:30}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state = {
            pregnancy:[],
            btn:"加载更多",
            num:null,
            count:5
        }
        this.list=this.list.bind(this)
        this.hidden_btn=this.hidden_btn.bind(this)
        this.render_list=this.render_list.bind(this)
    }
    componentDidMount(){
        this.list()
    }
    list(){
        this.props.load(1)
       /* fetch(`http://test.na.ayi800.com/v1/article?uuid=daqcFrbaOXPKttpjzUjh4YJ6OOGeMWxR&userStatus=3&articleType=3&orderBy=weight&limit=${this.state.count}&offset=0`)
            .then((response) => {
                this.setState({refreshing: false});
                return response.json();
            })
            .then((responseText) => {
                this.setState({
                    pregnancy:responseText.data.dataList,
                    num:responseText.data.count,
                    btn:this.state.count >= responseText.data.length?"没有更多了":"加载更多"
                })
                this.props.load(2)
            })
            .catch(()=>{
                ToastAndroid.show('网络错误', ToastAndroid.SHORT)
            })*/
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

        this.list()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView>
                <FlatList
                   data={this.state.pregnancy}
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