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
    ToastAndroid
} from 'react-native';
const {width,height}=Dimensions.get('window');
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            show:false,
            imageArr:[]
        }
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
    //调用相册
    photoAlbum(){
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            let picArr=this.state.imageArr;
            picArr.push(...images);
           this.props.getPic(picArr,true);
            this.props.cameraHide();
           this.setState({
               show:false
           })
        });
    }
    //调用相机
    getCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            let imagePic=this.state.imageArr;
            imagePic.push(JSON.stringify(image));
            this.props.getPic(imagePic,false);
            console.log(imagePic);
            this.props.cameraHide();
            this.setState({
                show:false
            })
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
        top:40,
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