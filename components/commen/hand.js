/**
 * Created by Administrator on 2017/11/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Platform,
    ToastAndroid,
    AlertIOS,
    AsyncStorage
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from './../constants';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class AnswerList extends Component {
    constructor(props){
        super(props);
        this.state={
            admire:false,
            num:this.props.num,
            user:{}
        }
        this. getActionList=this. getActionList.bind(this);
    }

    componentDidMount(){
        const id=this.props.id;
        this. _loadInitialUser(id);
    }

    //获取用户信息
    async _loadInitialUser(id){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.getActionList(id)
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    //获取用户的点赞 - 关注 - 收藏 list
    getActionList(id){
        const url=constants.url+"/v1/userbehavior/user?uuid="+this.state.user.uuid+"&userId="+this.state.user.id+"&userOpType=10";
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //获取真实数据后打开
                result=responseJson.data;
                if(result.dianzan.huida.dataList.indexOf(id) !== -1){
                    this.setState({
                        admire:true,
                    })
                }
            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }

    //点赞改变颜色
    changeHand(reverse){
            let post_params={
                userId:this.state.user.id,
                operateType:'1',
                operateId:this.props.id,
                reverse:reverse
            };
            const url=constants.url+"/v1/userbehavior/like?uuid="+this.state.user.uuid;
            const urlSigned = getSingedUrl(url, this.state.user.uuid);
            const dataEncrypt = getEncryptParam(post_params);
            fetch(urlSigned,{
                method: "POST",
                headers: {
                    "Http-App-Token": this.state.user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body:`param=${dataEncrypt.param}`,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if( reverse == '1' ){
                        if(responseJson.code==0){
                            if (Platform.OS === "android") {
                                ToastAndroid.show('点赞成功', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('点赞成功');
                            }
                            this.setState({
                                admire:true,
                                num:parseInt(this.state.num)+1
                            })
                        }else {
                            if (Platform.OS === "android") {
                                ToastAndroid.show('点赞失败', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('点赞失败');
                            }
                        }
                    }else if( reverse == '2' ){
                        if(responseJson.code==0){
                            if (Platform.OS === "android") {
                                ToastAndroid.show('取关成功', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('取关成功');
                            }
                            this.setState({
                                admire:false,
                                num:parseInt(this.state.num)-1
                            })
                        }
                    }

                })
                .catch((err) => {
                    console.error('数据请求失败');
                });
    }
    render() {
        if(this.state.admire){
            return (
                <View>
                    <TouchableWithoutFeedback onPress={()=> this.changeHand('2')}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome name="thumbs-o-up" style={styles.hand} />
                            <Text>{this.state.num}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }else {
            return (
                <View>
                    <TouchableWithoutFeedback onPress={()=> this.changeHand('1')}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome name="thumbs-o-up" style={styles.un_hand} />
                            <Text>{this.state.num}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }

    }
}



const styles = StyleSheet.create({

    hand:{
        fontSize:15,
        color:"#ff8080",
        marginRight:5
    },
    un_hand:{
        fontSize:15,
        color:"#999",
        marginRight:5
    }
});