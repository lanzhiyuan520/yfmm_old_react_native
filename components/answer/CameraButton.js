/**
 * Created by Administrator on 2017/11/15.
 */
import React, { Component } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
const {width,height}=Dimensions.get('window');
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
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            camera:false
        }
    }
    //渲染照片
    renderPic(){
        var picArr=[];
        this.props.picArr.map(function (listItem,index) {
            if(listItem.indexOf('http') !== -1){
                picArr.push(
                    <Image key={index} source={{uri:listItem}} style={{width:100,height:75,marginRight:10,marginBottom:10}} />
                )
            }else {
                picArr.push(
                    <Image key={index} source={{uri:'http://'+listItem}} style={{width:100,height:75,marginRight:10,marginBottom:10}} />
                )
            }

        })
        return picArr;
    }

    render(){
        return(
            <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                {this.renderPic()}
                <View>
                    <TouchableWithoutFeedback onPress={()=>this.showImagePicker()}>
                        <View style={styles.add_box}>
                            <Octicons name="plus-small" style={{fontSize:50,color:"#aaa",paddingLeft:30}} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }


    //显示相册或相机组件
    showImagePicker() {
        this.props.cameraShow()
    }
}
const styles = StyleSheet.create({
    add_box:{
        width:100,
        height:75,
        borderWidth:1,
        borderColor:'#f2f2f2',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    }
})