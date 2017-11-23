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
    ScrollView
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {collect_user_list} from "../api"
export default class Collect extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "我的收藏",
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state={
            collect_list:[]
        }
        this.collect_success=this.collect_success.bind(this)
    }
    componentDidMount(){
        var user = this.props.navigation.state.params.user
        collect_user_list(user.id,user.uuid,user.token,this.collect_success)
    }
    collect_success(responseText){
        console.log(responseText)
        this.setState({
            collect_list:responseText.data.dataList
        })
    }
    _renderItem=({item})=>{

        if(item.type==2){
            return (
                    <View>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate("Xfdetailed",{
                                id:item.id,
                                user:JSON.stringify(this.props.navigation.state.params.user)
                            })
                        }}>
                        <View style={{width:width,height:120,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2",justifyContent:"center"}}>
                            <View style={{width:width,height:80,paddingLeft:10,paddingRight:10,flexDirection:"row",position:"relative"}}>
                                <View>
                                    <View>
                                        <View style={{flexDirection:"row",alignItems:"center"}}>
                                            <Image source={{uri:item.author_img}} style={{width:16,height:16,borderRadius:8}} />
                                            <Text style={{color:"#999",marginLeft:5}}>{item.author_name}</Text>
                                        </View>
                                        <View style={{marginTop:20}}>
                                            <Text style={{color:"#000"}}>{item.title}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{position:"absolute",right:10}}>
                                    <Image source={{uri:item.banner}} style={{width:120,height:75,borderRadius:5}} />
                                </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                        <View style={{width:width,height:15,backgroundColor:"#f5f5f5"}}></View>
                    </View>
            )
        }else if(item.type==4){
            return (
                <View>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate("VideoDetail",{
                            id:item.id,
                            author:item
                        })
                    }}>
                        <View style={{width:width,backgroundColor:"#fff"}}>
                            <View style={{width:width,height:40,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10}} >
                                <View style={{marginRight:10}}>
                                    <Image source={{uri:item.author_img}} style={{width:20,height:20,borderRadius:10}}/>
                                </View>
                                <View>
                                    <Text style={{fontSize:14,color:"#999"}}>{item.author_name}</Text>
                                </View>
                            </View>
                            <View style={{width:width,height:200,flexDirection:"row",justifyContent:"center"}}>
                                <Image source={{uri:item.banner}} style={{width:width*0.9,height:200}}/>
                            </View>
                            <View style={{width:width,height:40,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10}} >
                                <View style={{marginRight:10}}>
                                    <Text style={{fontSize:14,color:"#999"}}>#{item.tags_ids}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:14,color:"#333"}}>{item.title}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{width:width,height:15,backgroundColor:"#f5f5f5"}}></View>
                </View>
            )
        }else if(item.type==3){
            return (
                <View>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate("Detailed",{
                            id:item.id,
                            user:this.props.navigation.state.params.user,
                            title:item.title
                        })
                    }}>
                    <View style={{width:width,height:120,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2",justifyContent:"center"}}>
                        <View style={{width:width,height:80,paddingLeft:10,paddingRight:10,flexDirection:"row",position:"relative"}}>
                            <View>
                                <View>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <Image source={{uri:item.author_img}} style={{width:16,height:16,borderRadius:8}} />
                                        <Text style={{color:"#999",marginLeft:5}}>{item.author_name}</Text>
                                    </View>
                                    <View style={{marginTop:20}}>
                                        <Text style={{color:"#000"}}>{item.title}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{position:"absolute",right:10}}>
                                <Image source={{uri:item.banner}} style={{width:120,height:75,borderRadius:5}} />
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{width:width,height:15,backgroundColor:"#f5f5f5"}}></View>
                </View>
            )
        }else if(item.shoucang==1){
            return (
                <View>
                    <TouchableWithoutFeedback onPress={()=>{

                    }}>
                    <View style={{width:width,backgroundColor:"#fff"}}>
                        <View style={{width:width,height:45,paddingRight:10,paddingLeft:10,flexDirection:"row",alignItems:"center"}}>
                            <View style={{marginRight:10}}>
                                <Image source={{uri:item.author_head_img}} style={{width:20,height:20,borderRadius:10}} />
                            </View>
                            <View>
                                <Text style={{fontSize:14,color:"#999"}}>{item.author_nickname}</Text>
                            </View>
                        </View>
                        <View style={{paddingLeft:10,paddingRight:10,width:width}}>
                            <Text style={{fontSize:14,color:"#333"}}>{item.content}</Text>
                        </View>
                        <View style={{width:width,height:40,paddingLeft:10,paddingRight:10,justifyContent:"center"}}>
                            <View style={{flexDirection:"row"}}>
                                <View style={{marginRight:10}}>
                                    <Text style={{fontSize:14,color:"#999"}}>回答 {item.author_nickname}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:14,color:"#999"}}>浏览 {item.visit_num}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{width:width,height:15,backgroundColor:"#f5f5f5"}}></View>
                </View>
            )
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
                <ScrollView>
                <View style={{width:width}}>
                    <FlatList
                        data={this.state.collect_list}
                        renderItem={this._renderItem}
                    />
                </View>
                </ScrollView>
            </View>
        )
    }
}
