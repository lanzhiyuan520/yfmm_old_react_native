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
import {request_user_collect} from "../api"
export default class Specialist extends Component{
    constructor(props){
        super(props)
        this.state={
            disabled:false,
            collect_experts:[]
        }
        this.collect_success=this.collect_success.bind(this)
    }
    componentDidMount(){
        request_user_collect(this.props.user.id,this.props.user.uuid,this.props.user.token,this.collect_success)
    }
    collect_success(responseText){
        this.setState({
            collect_experts:responseText.data.dataList
        })
        console.log(responseText)
    }
    disabled(){
        this.setState({
            disabled:true
        })
        setTimeout(()=>{
            this.setState({disabled:false})
        },500)
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{width:width}}>

                    <FlatList
                        data={this.state.collect_experts}
                        renderItem={({item})=>{
                            return (
                                <View style={{width:width,height:120,justifyContent:"center",backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2"}}>
                                    <View style={{
                                        width:width,
                                        height:80,
                                        paddingLeft:10,
                                        paddingRight:10,
                                        flexDirection:"row",
                                        position:"relative"
                                    }}>
                                        <View style={{marginRight:10,flex:1}}>
                                            <Image source={{uri:item.img}} style={{width:80,height:80,borderRadius:40}} />
                                        </View>
                                        <View style={{flex:4,flexDirection:"row",alignItems:"center"}}>
                                            <View style={{}}>
                                                <Text style={{color:"#000",fontSize:18}}>{item.name}</Text>
                                                <Text style={{color:"#999",fontSize:17}}>{item.title}</Text>
                                                <View style={{flexDirection:"row"}}>
                                                    <Text style={{color:"#999",fontSize:16,marginRight:5}}>关注</Text>
                                                    <Text style={{color:"#999",fontSize:16,marginRight:10}}>{item.care_num}</Text>
                                                    <Text style={{color:"#999",fontSize:16,marginRight:5}}>回答</Text>
                                                    <Text style={{color:"#999",fontSize:16,}}>{item.reply_num}</Text>
                                                </View>
                                            </View>
                                            <TouchableWithoutFeedback
                                                disabled={this.state.disabled}
                                                onPress={()=>{this.props.navigate.navigate("Expertsdetails",{
                                                    expert:item.name,
                                                    user:this.props.user,
                                                    id:item.id
                                                });this.disabled()}}>
                                                <View style={{
                                                    width:80,
                                                    height:35,
                                                    borderRadius:5,
                                                    borderWidth:1,
                                                    borderColor:"#f2f2f2",
                                                    justifyContent:"center",
                                                    alignItems:"center",
                                                    position:"absolute",
                                                    right:10
                                                }}>
                                                    <Text style={{color:"#ff8089"}}>提问</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />


                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})