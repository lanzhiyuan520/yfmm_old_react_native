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
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {request_zhuanlan_reply} from "../api"
var user
export default class Questions extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "我的提问",
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
            reply_list:[],
            state:false
        }
        this.reply=this.reply.bind(this)
        this._renderItem=this._renderItem.bind(this)
        this.image=this.image.bind(this)
        this.for_image=this.for_image.bind(this)
    }
    componentDidMount(){

        user = this.props.navigation.state.params.user
        request_zhuanlan_reply(user.token,user.uuid,2,user.id,"create",0,1000,this.reply)
    }
    reply(responseText){
        if(responseText.code != 0){
            this.setState({
                state:false
            })
        }else{
            this.setState({
                reply_list:responseText.data,
                state:true
            })
        }
        console.log(responseText)
    }
    for_image(item){
        item.map((data)=>{
            if (data != null){
                return (
                    <Image source={{uri:data}} style={{width:80,height:70,marginRight:5}} />
                )
            }
        })
    }
    image(item){
        if(item.images != null){
            return (
                <View style={{flexDirection:"row"}}>
                    {
                        this.for_image(item.images)
                        /*item.images.map((data,index)=>{
                            if (!data){
                                return (
                                    <Image source={{uri:data}} style={{width:80,height:70,marginRight:5}} />
                                )
                            }
                        })*/
                    }
                </View>
            )
        }
    }
     _renderItem(){
        return (
            <FlatList
                data={this.state.reply_list}
                renderItem={({item})=>{
                    return (
                        <View  style={{marginBottom:15}}>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.props.navigation.navigate("Problem",{
                                    id:item.id,
                                    author:item
                                })
                            }}>
                                <View>
                                    <View style={{width:width,height:40,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",paddingRight:10,paddingLeft:10}}>
                                        <View style={{marginRight:10}}>
                                            <Image source={{uri:item.author_list.head_img}} style={{width:22,height:22,borderRadius:10}} />
                                        </View>
                                        <View>
                                            <Text style={{color:"#666"}}>{item.author_list.nickname}</Text>
                                        </View>
                                    </View>
                                    <View style={{paddingBottom:10,paddingTop:5,backgroundColor:"#fff",paddingLeft:10,paddingRight:10}}>
                                        <View style={{marginBottom:10}}>
                                            <Text style={{color:"#333"}}>{item.content}</Text>
                                        </View>
                                        {
                                            this.image(item)
                                        }
                                    </View>
                                    <View style={{width:width,paddingBottom:15,flexDirection:"row",paddingLeft:10,paddingRight:10,backgroundColor:"#fff",justifyContent:"space-between"}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{color:"#666",marginRight:15}}>回答 30</Text>
                                            <Text style={{color:"#666"}}>浏览 30</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:"#666"}}>{item.create_at}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )
                }}
            />
        )
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                {this.state.state?
                    this._renderItem()
                    :
                    <View style={{width:width,justifyContent:"center",alignItems:"center",marginTop:15}}>
                        <Text>暂无提问</Text>
                    </View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})
