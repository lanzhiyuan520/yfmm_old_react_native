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
    AsyncStorage,
    TouchableHighlight,
    Modal,
    ToastAndroid
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bounces} from "../bounces/bounces"
export default class Setting extends Component{
    static navigationOptions = ({navigation}) => ({
        title: "系统设置",
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
            disabled:false,
            show:false
        }
        this.exit=this.exit.bind(this)
    }
    componentDidMount(){

    }
    componentWillUnmount(){
        this.setState({
            show:false
        })
    }
    exit(){
        try {
            AsyncStorage.removeItem(
                "user",
                (error)=>{
                    if(!error){
                        AsyncStorage.removeItem("user_data",(error)=>{
                            if(!error){
                                this.setState({show:false});
                                this.setState({flag:false});
                                this.props.navigation.navigate("Login")
                            }
                        })

                    }
                }
            )
        }catch (error){
            alert('失败',+error);
        }
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
            <View style={{flex:1,backgroundColor:"#f5f5f5",alignItems:"center"}}>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                <View style={{width:width,height:45,flexDirection:"row",backgroundColor:"#fff",paddingLeft:10,paddingRight:10,alignItems:"center",position:"relative"}}>
                    <View>
                        <Text style={{color:"#333"}}>系统更新</Text>
                    </View>
                    <View style={{position:"absolute",right:10}}>
                        <Text style={{color:"#666",fontSize:14}}>1.0.0</Text>
                    </View>
                </View>
                <View style={{width:width,height:15,backgroundColor:"#f2f2f2"}}></View>
                <View style={{width:width-20,height:45,backgroundColor:"#fff",borderRadius:5}}>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.setState({show:true});this.disabled()}}>
                        <View style={{width:width-20,height:45,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{color:"#999"}}>退出登录</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.container}>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.show}
                        onShow={() => {}}
                        onRequestClose={() => {}} >
                        <View style={styles.modalStyle}>
                            <View style={styles.subView}>
                                <Text style={styles.titleText}>
                                    提示
                                </Text>
                                <Text style={styles.contentText}>
                                    确定要退出吗
                                </Text>
                                <View style={styles.horizontalLine} />
                                <View style={styles.buttonView}>
                                    <TouchableHighlight underlayColor='transparent'
                                                        style={styles.buttonStyle}
                                                        onPress={()=>{this.setState({show:false})}}>
                                        <Text style={styles.buttonText}>
                                            取消
                                        </Text>
                                    </TouchableHighlight>
                                    <View style={styles.verticalLine} />
                                    <TouchableHighlight underlayColor='transparent'
                                                        style={styles.buttonStyle}
                                                        onPress={()=>{
                                                            this.exit()
                                                        }}>
                                        <Text style={styles.buttonText}>
                                            确定
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
})