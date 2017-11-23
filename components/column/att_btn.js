
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

    componentWillMount(){
        this.getActionList();
    }

    //获取用户的点赞 - 关注 - 收藏 list
    getActionList(){
        fetch(constants.url+"/v1/userbehavior/user?uuid="+constants.uuid+"&userId="+constants.userId+"&userOpType=10")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data);
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
                console.log(this.state.data);
            })
            .catch((err) => {
                console.error('数据请求失败');
            });
    }


    //关注、收藏、点赞
    changeBtn(reverse){
        let formData = new FormData();
        formData.append('userId',constants.userId);
        formData.append('operateType',this.props.operateType);
        formData.append('operateId',this.props.id);
        formData.append('reverse',reverse);
        fetch(constants.url+"/v1/userbehavior/"+this.props.collect+"?uuId="+constants.uuid,{
            method: "POST",
            body:formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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
    //从存储中获取
    // componentDidMount(){
    //     AsyncStorage.getItem('userActionList', (error, object) => {
    //         if (error) {
    //             console.log('Error:' + error.message);
    //         } else {
    //             console.log(object);
    //             object=JSON.parse(object);
    //             this.isCollect(object);
    //         }
    //     })
    // }

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