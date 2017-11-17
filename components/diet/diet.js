import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    FlatList,
    Dimensions,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
import {request_article_yinshi,request_article_yinshi_list} from "../api"
export default class Diet extends Component{
    constructor(props){
        super(props)
        this.state={
            diet_list:[],
            count:null,
            user:{},
            user_data:{},
            food_list:[],
            pregnancy:[],
            btn:"加载更多",
            num:null,
            index:0
        }
        this.request_article_yinshi_successCallBack=this.request_article_yinshi_successCallBack.bind(this)
    }
    componentDidMount(){
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            request_article_yinshi(this.state.user.uuid,result.status,"weightDesc",0,5,this.state.user.token,this.request_article_yinshi_successCallBack)
        })
        this.state.user=JSON.parse(this.props.user)
    }
    request_article_yinshi_successCallBack(responseText){
        this.setState({
            diet_list:responseText.data.dataList,
            count:responseText.data.count
        })
    }

    render(){
        return(
            <View style={{width:width,height:170,backgroundColor:"#fff"}}>
                <TouchableWithoutFeedback
                    disabled={this.props.disabled}
                    onPress={()=>{
                        this.props.navigate('DietList',{
                            user:this.state.user,
                            food_list:this.state.food_list
                        }),{
                    navigate:this.props.navigate
                }
                        this.props.disabled_fun()
                    }}>
                    <View style={styles.title}>
                        <View>
                            <Text style={styles.text}>饮食推荐</Text>
                        </View>
                        <View>
                            <Image source={require("../../img/youjiantou.png")} style={styles.title_img}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-around",
                    paddingLeft:10,
                    paddingRight:10
                }}>
                    <FlatList
                        horizontal={true}
                        data={this.state.diet_list}
                        renderItem={({item,index})=>{
                            return(
                                <View style={[styles.img_line,index==this.state.count-1&&styles.img_last]}>

                                            <TouchableWithoutFeedback
                                                disabled={this.props.disabled}
                                                onPress={()=>{this.props.navigate('Detailed',{
                                                id:item.id,
                                                user:this.state.user,
                                                title:item.title
                                            });
                                                    this.props.disabled_fun()
                                                }}>
                                                <View>
                                                    <View style={{opacity:.8,backgroundColor:"#000"}}>
                                                        <Image source={{uri:"http://cdn.ayi800.com/1504686351"}} style={{width:190,height:120}}/>
                                                    </View>
                                                    <View style={{
                                                        position:"absolute",
                                                        top:50,
                                                        left:0,
                                                        paddingLeft:10,
                                                        paddingRight:10,
                                                    }}>
                                                        <Text style={{color:"#fff",fontSize:12}}>#福滋味</Text>
                                                        <Text style={{color:"#fff",fontSize:12}}>{item.title}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

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
        color:"#333",
        fontSize:14,
        fontWeight:"bold"
    },
    title:{
        width:width,
        height:40,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        justifyContent:"space-between"
    },
    title_img:{
        width:16,
        height:16
    },
    img_line:{
        position:"relative",
        marginRight:10
    },
    img_last:{
        marginRight:0
    }
})