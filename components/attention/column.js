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
import {request_user_column} from "../api"
export default class Column extends Component{

    constructor(props){
        super(props)
        this.state={
            column_list:[]
        }
        this.column_success=this.column_success.bind(this)
    }
    componentDidMount(){
        request_user_column(this.props.user.id,this.props.user.uuid,this.props.user.token,this.column_success)
    }
    column_success(responseText){
        this.setState({
            column_list:responseText.data.dataList
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#f8f8f8"}}>
                <View style={{width:width}}>
                    <FlatList
                        data={this.state.column_list}
                        renderItem={({item})=>{
                            return (
                                <TouchableWithoutFeedback onPress={()=>{this.props.navigate.navigate("ColumnDetail",{
                                    id:item.id
                                })}}>
                                    <View style={{width:width,height:120,justifyContent:"center",backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#f2f2f2"}}>
                                        <View style={{
                                            width:width,
                                            height:80,
                                            paddingLeft:10,
                                            paddingRight:10,
                                            flexDirection:"row",
                                            alignItems:"center"
                                        }}>
                                            <View style={{marginRight:10,flex:1}}>
                                                <Image source={{uri:item.group_img}} style={{width:80,height:60}} />
                                            </View>
                                            <View style={{flex:4,flexDirection:"row",alignItems:"center"}}>
                                                <View style={{}}>
                                                    <Text style={{color:"#000",fontSize:18}}>{item.group_name}</Text>
                                                    <Text style={{color:"#999",fontSize:16}} numberOfLines={2}>{item.group_content}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
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