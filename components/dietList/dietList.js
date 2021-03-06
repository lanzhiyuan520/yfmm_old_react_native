import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    AsyncStorage,
    ScrollView,
    FlatList,
    Dimensions,
    InteractionManager
} from 'react-native';
var {width} = Dimensions.get('window')
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import Load from "../loading/loading"
import DetailedYun from "./dietListdetailed"
import Detailedyuezi from "./detailed_yuezi"
import Detailedyuer from "./detailed_yuer"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_article_yinshi_list} from "../api"
import Header from './../commen/header';
export default class DietList extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
        /*title: "饮食推荐",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,*/
    });
    constructor(props){
        super(props)
        this.state= {
            loading: true,
            user: {},
            index: 1,
            diet_list: []
        }
        this.load=this.load.bind(this)
        this.success=this.success.bind(this)
        this.fun=this.fun.bind(this)
    }
    componentWillMount(){
        /*InteractionManager.runAfterInteractions(()=>{
            AsyncStorage.getItem("user_data",(error,result)=>{
                result = JSON.parse(result)
                request_article_yinshi_list(this.state.user.uuid,this.state.index,"weightDesc", 0,100,this.state.user.token,this.success)
            })
        })*/
        this.state.user=this.props.navigation.state.params.user

    }
    success(responseText){
        this.load(2)
        this.setState({
            diet_list:responseText.data.dataList
        })
    }
    load(num){
        if(num==1){
            this.setState({
                loading:true
            })
        }else{
            this.setState({
                loading:false
            })
        }
    }
    fun(obj){
        /*request_article_yinshi_list(this.state.user.uuid,obj.i+1,"weightDesc", 0, 100,this.state.user.token,this.success)*/
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <Load loading={this.state.loading}/>
                </View>
                <Header title="饮食推荐" back="true" navigation={this.props.navigation} />
                <ScrollableTabView
                    initialPage={0}
                    locked={true}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    renderTabBar={() => <ScrollableTabBar/>}
                    onChangeTab={(obj)=>{
                        this.fun(obj)
                    }}
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarActiveTextColor="#333"
                    tabBarInactiveTextColor="#666"
                    tabBarBackgroundColor="#fff"
                >
                    <DetailedYun tabLabel="孕中" load={this.load} user={this.props.navigation.state.params.user} navigate={this.props.navigation.navigate}/>
                    <Detailedyuezi tabLabel="月子" load={this.load} user={this.props.navigation.state.params.user} navigate={this.props.navigation.navigate}/>
                    <Detailedyuer tabLabel="育儿" load={this.load} user={this.props.navigation.state.params.user} navigate={this.props.navigation.navigate}/>
                    {/*<View tabLabel="孕中" style={{flex:1}}>
                        <ScrollView>
                            <FlatList
                                data={this.state.diet_list}
                                renderItem={({item})=>{
                                    return (
                                        <View style={{
                                            width:width,
                                            height:300,
                                            backgroundColor:"#fff"
                                        }}>
                                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('Detailed',{
                                                id:item.id,
                                                user:this.state.user,
                                                title:item.title
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
                                                            <Text style={{color:"#999"}}>浏览 {item.visit_num}</Text>
                                                            <Text style={{color:"#999",marginLeft:5}}>收藏 {item.collect_num}</Text>
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
                    <View tabLabel="月子" style={{flex:1}}>
                        <ScrollView>
                            <FlatList
                                data={this.state.diet_list}
                                renderItem={({item})=>{
                                    return (
                                        <View style={{
                                            width:width,
                                            height:300,
                                            backgroundColor:"#fff"
                                        }}>
                                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('Detailed',{
                                                id:item.id,
                                                user:this.state.user,
                                                title:item.title
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
                                                            <Text style={{color:"#999"}}>浏览 {item.visit_num}</Text>
                                                            <Text style={{color:"#999",marginLeft:5}}>收藏{item.collect_num}</Text>
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
                    <View tabLabel="育儿" style={{flex:1}}>
                        <ScrollView>
                            <FlatList
                                data={this.state.diet_list}
                                renderItem={({item})=>{
                                    return (
                                        <View style={{
                                            width:width,
                                            height:300,
                                            backgroundColor:"#fff"
                                        }}>
                                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('Detailed',{
                                                id:item.id,
                                                user:this.state.user,
                                                title:item.title
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
                                                            <Text style={{color:"#999"}}>浏览 {item.visit_num}</Text>
                                                            <Text style={{color:"#999",marginLeft:5}}>收藏 {item.collect_num}</Text>
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
                    </View>*/}
                </ScrollableTabView>
            </View>
        )
    }
}