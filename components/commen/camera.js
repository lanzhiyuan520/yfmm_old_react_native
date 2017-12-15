/**
 * Created by Administrator on 2017/11/14.
 */
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
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
    AlertIOS,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
const {width,height}=Dimensions.get('window');
import constants from './../constants';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            show:false,
            imageArr:[],
            user:{}
        };
        this._loadInitialUser=this._loadInitialUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }
    //隐藏视图
    hideItem(){
        this.props.cameraHide();
        this.setState({
            show:false
        })
    }
    //获取用户信息
    async _loadInitialUser(image){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.uploadPic(image);
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }
    //上传照片
    uploadPic(image){
        console.log(image)
        var url = constants.url+'/v1/upload?uuid='+this.state.user.uuid;
        let formData = new FormData();
        var uri = image.path;
        var index = uri.lastIndexOf("/");
        var name  = uri.substring(index + 1, uri.length);
        let file = {uri: uri, type: 'multipart/form-data', name: name } ;
        formData.append('headImg', file);

        // let file = {uri: path, type: 'multipart/form-data', name: 'image.jpg'};
        // formData.append("headImg",file);
        console.log(formData)
        var urlSigned = getSingedUrl(url,this.state.user.uuid);
        fetch(urlSigned,{
            method:"POST",
            headers: {
                "Http-App-Token": this.state.user.token,
                'Content-Type':'multipart/form-data'
            },
            body:formData
        })
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
               if(responseText.code==0){
                    let picArr=this.state.imageArr;
                    picArr.push(responseText.data.url);
                   this.props.getPic(picArr,true);
                    this.props.cameraHide();
                   this.setState({
                       show:false
                   })
               }

            })
            .catch((error)=>{
                ToastAndroid.show('网络错误', ToastAndroid.SHORT)
            })
    }
    //调用相册
    photoAlbum(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            this._loadInitialUser(image);
        });
    }
    //调用相机
    getCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            this._loadInitialUser(image);
            // let imagePic=this.state.imageArr;
            // imagePic.push(JSON.stringify(image));
            // this.props.getPic(imagePic,false);
            // this.props.cameraHide();
            // this.setState({
            //     show:false
            // })
        });
    }

    render(){
        if(this.state.show){
            return(
                <View style={styles.mask}>
                    <View style={{position:'absolute',bottom:0,left:(width-320)/2,height:220}}>
                        <View style={styles.container}>
                            <TouchableWithoutFeedback onPress={()=> this.photoAlbum()}>
                                <View style={[styles.item,styles.boders]}>
                                    <Text style={styles.share}>从手机相册选择</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=> this.getCamera()}>
                                <View style={[styles.item,styles.boders]}>
                                    <Text style={styles.share}>相机</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{width:320,backgroundColor:'#fff',paddingVertical:10, borderRadius:5,}}>
                            <TouchableWithoutFeedback onPress={()=> this.hideItem()}>
                                <View style={{height:20}}>
                                    <Text style={styles.remove}>取消</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }

    }
}
const styles = StyleSheet.create({
    mask:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:(Platform.OS === 'ios' ? 68 : 48),
        left:0,
        zIndex:1000
    },
    container:{
        width:320,
        backgroundColor:'#fff',
        paddingVertical:10,
        borderRadius:5,
        marginBottom:10
    },
    share:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:20
    },
    boders:{
        borderBottomWidth:0.5,
        borderBottomColor:'#f8f8f8'
    },
    item:{
        height:25
    },
    remove:{
        fontSize:12,
        color:'#3385ff',
        textAlign:'center',
        lineHeight:20
    }
})