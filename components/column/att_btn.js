
//关注按钮
/**
 * Created by Administrator on 2017/10/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ToastAndroid,
    TouchableWithoutFeedback,
    AsyncStorage,
    AlertIOS,
    Platform
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
import constants from './../constants';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class RecColumn  extends Component {

    constructor(props){
        super(props);
        this.state={
            attend:this.props.attend,
            data:{}
        }
    }
    componentWillMount(){
        this.getActionList();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({attend: nextProps.attend});
    }

    //获取用户的点赞 - 关注 - 收藏 list
    getActionList(){
        const url=constants.url+"/v1/userbehavior/user?uuid="+constants.uuid+"&userId="+constants.userId+"&userOpType=10";
        const urlSigned = getSingedUrl(url, constants.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": constants.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                try {
                    AsyncStorage.setItem(
                        'userActionList',
                        JSON.stringify(responseJson.data),
                        (error)=>{
                            console.log(error);
                            if (error){
                                console.log(error)
                            }else{
                                console.log("存值成功!");
                                if(this.props.ischange=='true'){
                                    // this.props.change()
                                    this.props.removeItem(this.props.id)
                                }
                            }
                        }
                    );
                } catch (error){
                    // alert('失败'+error);
                }
                this.setState({
                    data:responseJson.data
                });
            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }


    //关注、收藏、点赞
    changeBtn(reverse){
        let post_params={
            userId:constants.userId,
            operateType:this.props.operateType,
            operateId:this.props.id,
            reverse:reverse
        };
        const url=constants.url+"/v1/userbehavior/"+this.props.collect+"?uuid="+constants.uuid;
        const urlSigned = getSingedUrl(url, constants.uuid);
        const dataEncrypt = getEncryptParam(post_params);
        fetch(urlSigned,{
            method: "POST",
            headers: {
                "Http-App-Token": constants.token,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:`param=${dataEncrypt.param}`,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                console.log(reverse)
                if( reverse == '1' ){
                    if(responseJson.code==0){
                        if (Platform.OS === "android") {
                            ToastAndroid.show('关注成功', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('关注成功');
                        }
                        this.getActionList();
                        this.setState({
                            attend:'true'
                        });
                    }else {
                        if (Platform.OS === "android") {
                            ToastAndroid.show('关注失败', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('关注失败');
                        }
                    }
                }else if( reverse == '2' ){
                    if(responseJson.code==0){
                        if (Platform.OS === "android") {
                            ToastAndroid.show('取关成功', ToastAndroid.SHORT);
                        } else if (Platform.OS === "ios") {
                            AlertIOS.alert('取关成功');
                        }
                        this.getActionList();
                        this.setState({
                            attend:'false'
                        });
                    }
                }

            })
            .catch((err) => {
                console.error('数据请求失败');
            });


    }

    render() {
        if(this.state.attend == 'true'){
            return (
            <View>
                <TouchableWithoutFeedback onPress={()=> this.changeBtn('2')}>
                    <View style={styles.att_btn}>
                        <Text style={{color:'#999',fontSize:11,lineHeight:20,textAlign:'center'}}>{this.props.subtitle}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            );
        }
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=> this.changeBtn('1')}>
                    <View style={styles.att_btn}>
                        <Text style={{color:'#ff8080',fontSize:11,lineHeight:20,textAlign:'center'}}>+{this.props.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    att_btn:{
        height:25,
        width:50,
        borderWidth:0.5,
        borderColor:'#f2f2f2',
        borderRadius:5
    }
});