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
    AsyncStorage
} from 'react-native';
var {width} = Dimensions.get('window')
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '拍照','从照片中选择']
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {username,user_img,update_information} from "../api"
var postData = {}
var user
export default class PersonalData extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "我的资料",
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.go()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    /**/
    constructor(props){
        super(props)
        this.state={
            disabled:false,
            username:this.props.navigation.state.params.username,
            img:this.props.navigation.state.params.head_img
        }
        this.go=this.go.bind(this)
       this.address=this.address.bind(this)
       this.user=this.user.bind(this)
       this.user_image=this.user_image.bind(this)
       this.handlePress=this.handlePress.bind(this)
       this.update_information_success=this.update_information_success.bind(this)
    }
    componentDidMount(){
        user = this.props.navigation.state.params.user
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        this.props.navigation.setParams({go:this.go})
    }

    go(){
       this.props.navigation.goBack()
    }
    showActionSheet() {
        this.ActionSheet.show()
    }
    handlePress(i) {
        if(i==0){

        } else if(i==1){
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay:true,
                showCropGuidelines:false
            }).then(image => {
                this.setState({
                    img:image.path
                })
                user_img(user.uuid,user.token,image.path,this.user_image)
            });
        }  else if(i==2){
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay:true,
                showCropGuidelines:false
            }).then(image => {
                this.setState({
                    img:image.path
                })
                user_img(user.uuid,user.token,image.path,this.user_image)
            });
        }
    }
    //图片上传成功回调
    user_image(responseText){
        var head_img = responseText.data.url
        postData = {head_img:`http://${head_img}`}
        user.head_img = `http://${head_img}`
        AsyncStorage.setItem("user",JSON.stringify(user))
        update_information(user,postData,this.update_information_success)
    }
    //用户资料更新成功回调
    update_information_success(responseText){
        this.props.navigation.navigate("App",{
            selectedTab:"我的",
            user:JSON.stringify(user)
        })
    }
    user(user){
        this.setState({
            user:user
        })
    }
    address(text){
        this.state.add=text
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
            <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
                    <View style={{width:width,height:120,backgroundColor:"#fff",borderTopColor:"#f2f2f2",borderTopWidth:1,flexDirection:"row",alignItems:"center",borderBottomColor:"#f2f2f2",borderBottomWidth:1}}>
                        <View style={{width:width,height:80,paddingRight:10,paddingLeft:10,flexDirection:"row",position:"relative",alignItems:'center'}}>
                            <View>
                                <Text style={{color:"#000",fontSize:16}}>头像</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row",alignItems:"center"}}>
                                <TouchableWithoutFeedback onPress={()=>{this.showActionSheet()}}>
                                    <Image source={{uri:this.state.img}} style={{width:80,height:80,borderRadius:40}} />
                                </TouchableWithoutFeedback>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </View>
                <View style={{width:width,backgroundColor:"#fff"}}>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate("Username",{
                        navigate:this.props.navigation.state.params.navigate,
                            user:this.props.navigation.state.params.user
                    });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>用户名</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Text style={{color:"#666"}}>{this.props.navigation.state.params.name?this.props.navigation.state.params.name:"未设置"}</Text>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate("Phone",{
                            user:this.props.navigation.state.params.user
                        });this.disabled()}}>
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>手机号</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Text style={{color:"#666"}}>{this.props.navigation.state.params.phone?this.props.navigation.state.params.phone:"未绑定"}</Text>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={this.state.disabled}
                        onPress={()=>{this.props.navigation.state.params.navigate("Address",{
                            keys:{B_key:this.props.navigation.state.key},
                            navigate:this.props.navigation.state.params.navigate,
                            address:this.address,
                            user:this.props.navigation.state.params.user
                        });this.disabled()}}
                    >
                        <View style={{width:width,height:45,borderBottomColor:"#f2f2f2",borderBottomWidth:1,flexDirection:"row",alignItems:"center",paddingLeft:10,paddingRight:10,position:"relative"}}>
                            <View>
                                <Text style={{color:"#333"}}>地址</Text>
                            </View>
                            <View style={{position:"absolute",right:10,flexDirection:"row"}}>
                                <Text style={{color:"#666"}}>{this.props.navigation.state.params.address?this.props.navigation.state.params.address:"未设置"}</Text>
                                <FontAwesome name="angle-right" style={{fontSize: 22, color: "#000",marginLeft:10}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </View>
            </View>
        )
    }
}
