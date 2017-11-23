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
    AlertIOS
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from './../constants';
export default class AnswerList extends Component {
    constructor(props){
        super(props);
        this.state={
            admire:false,
            num:this.props.num
        }
        this. getActionList=this. getActionList.bind(this);
    }

    componentDidMount(){
        const id=this.props.id;
        this. getActionList(id);
    }

    //获取用户的点赞 - 关注 - 收藏 list
    getActionList(id){
        fetch(constants.url+"/v1/userbehavior/user?uuid="+constants.uuid+"&userId="+constants.userId+"&userOpType=10")
            .then((response) => response.json())
            .then((responseJson) => {
                //获取真实数据后打开
                // result=responseJson.data;
                // if(result.dianzan.huida.dataList.indexOf(id) !== -1){
                //     this.setState({
                //         admire:true,
                //     })
                // }
            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }

    //点赞改变颜色
    changeHand(reverse){
            let formData = new FormData();
            formData.append('userId',constants.userId);
            formData.append('operateType','1');
            formData.append('operateId',this.props.id);
            formData.append('reverse',reverse);
            fetch(constants.url+"/v1/userbehavior/like?uuId="+constants.uuid,{
                method: "POST",
                body:formData,
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