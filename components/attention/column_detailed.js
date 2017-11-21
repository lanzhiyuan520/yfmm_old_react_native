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
import {columnDetail} from "../api"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class ColumnDetailed extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "专栏详情",
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
            zhuanlan:{}
        }
        this.zhuanlan_detailed=this.zhuanlan_detailed.bind(this)
    }
    componentDidMount(){
        var id = this.props.navigation.state.params.id
        var user = this.props.navigation.state.params.user
        columnDetail(user.token,user.uuid,id,this.zhuanlan_detailed)
    }
    zhuanlan_detailed(responseText){
        this.setState({
            zhuanlan:responseText.data.group_msg
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{width:width,height:100,backgroundColor:"#fff",flexDirection:"column",justifyContent:"center",borderTopColor:"#f2f2f2",borderTopWidth:1}}>
                    <View style={{width:width,height:80,paddingLeft:10,paddingRight:10,flexDirection:"row",position:"absolute"}}>
                        <View>
                            <Image source={{uri:this.state.zhuanlan.group_img}} style={{width:120,height:80}} />
                        </View>
                        <View style={{marginLeft:10,flex:2}}>
                            <View>
                                <Text style={{fontSize:14,color:"#000"}}>{this.state.zhuanlan.group_name}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:12,color:"#999"}}>关注{this.state.zhuanlan.care_user_num}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:13,color:"#333"}}>{this.state.zhuanlan.group_content}</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={()=>{}}>
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
                                <Text style={{color:"#ff8089"}}>+关注</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

})