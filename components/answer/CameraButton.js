/**
 * Created by Administrator on 2017/11/15.
 */
import React, { Component } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
var ImagePicker = require('react-native-image-picker');
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
            avatarSource:[],
            imgFileName:[]
        }
    }

    renderPic(){
        var picArr=[];
        this.state.avatarSource.map(function (listItem) {
            picArr.push(
                <Image source={listItem} style={{width:100,height:100,marginRight:10,marginBottom:10}} />
            )
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
                            <Octicons name="plus-small" style={{fontSize:50,color:"#aaa",paddingLeft:25}} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }



    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户点击了取消');
            }
            else if (response.error) {
                console.log('ImagePicker 出错: ', response.error);
            }
            else {
                let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    source = {uri: response.uri, isStatic: true};
                }
                let imageArray = this.state.avatarSource;
                imageArray.push(source);

                let imgFileNameArray = this.state.imgFileName;
                if (response.fileName!=null) {
                    imgFileNameArray.push(response.fileName);
                }
                this.setState({
                    avatarSource:imageArray
                });
                this.props.getImg(this.state.avatarSource)
            }
        });

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