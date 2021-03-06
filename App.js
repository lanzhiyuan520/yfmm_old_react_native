/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as WeChat from 'react-native-wechat';
import {
  Platform,
  StyleSheet,
    Dimensions,
  Text,
  View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    AsyncStorage,
    ToastAndroid,
    BackHandler,
    StatusBar
} from 'react-native';
var {width} = Dimensions.get('window')
import Home from "./components/Home"
import Answer from "./components/answer"
import Find from "./components/Find"
import My from "./components/My"
import {init_user_behavior} from "./components/api"
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import TabNavigator from 'react-native-tab-navigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bounces} from "./components/bounces/bounces"
import Getui from 'react-native-getui'
export default class App extends Component<{}> {
    static navigationOptions = {
        title: 'Welcome',
        header:null,
        gesturesEnabled:false
    };
  constructor(props){
    super(props);
      this.state = {
          selectedTab:this.props.navigation.state.params.selectedTab,
          user_data:{}
      }
      this.find=this.find.bind(this)
      this.behavior=this.behavior.bind(this)
  }

    componentWillMount() {
        //判断机型并监听物理返回键
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
        //订阅消息通知
        var { NativeAppEventEmitter } = require('react-native');
        var resigsteClientIdSub = NativeAppEventEmitter.addListener(
            'registeClientId',
            (clientId) => {
                /*Alert.alert(clientId);*/
            }
        )
        var receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'receiveRemoteNotification',
            (msg) => {
                //消息类型分为 APNs 和 payload 透传消息，具体的消息体格式会有差异
                switch (msg.type) {
                    case "apns":
                        Alert.alert('APNs 消息通知',JSON.stringify(notification))
                        break;
                    case "payload":
                        this.props.navigation.navigate("Xfdetailed",{
                            id:263,
                            user:this.props.navigation.state.params.user
                        })
                        /*Alert.alert('消息通知',JSON.stringify(msg),[
                            {text:'取消',onPress:()=>{}},
                            {text:'查看',onPress:()=>{
                                    this.props.navigation.navigate("Xfdetailed",{
                                        id:263,
                                        user:this.props.navigation.state.params.user
                                    })
                                }}
                        ])*/
                        break;
                    default:
                }
            }
        );

        var clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'clickRemoteNotification',
            (notification) => {
                Alert.alert('点击通知',JSON.stringify(notification))
            }
        );
    }
    componentWillUnMount() {
        //记得在此处移除监听
        receiveRemoteNotificationSub.remove()
        clickRemoteNotificationSub.remove()
        resigsteClientIdSub.remove()
    }
    //更改底部导航位置
    find () {
        this.setState({
            selectedTab: "发现"
        })
    }
    //双击退出应用
    onBackAndroid(){
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
        }
        this.lastBackPressed = Date.now();
        bounces('再按一次退出应用');
        return true;
    }
    componentDidMount() {
        WeChat.registerApp('wx825ecd9a849eef9d');
        //获取用户信息
        var user = JSON.parse(this.props.navigation.state.params.user)
        //获取用户行为
        init_user_behavior(user,this.behavior)
        //隐藏键盘
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }
    //用户行为获取成功并存储
    behavior(responseText){
        AsyncStorage.setItem("user_behavior",JSON.stringify(responseText.data))
    }

    _renderTabarItems(selectedTab,icon,selectedIcon,Component,navigate,find,user,navigation){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: selectedTab })}
            >
              <Component navigate={navigate} find={find} user={user} navigation={navigation} />
            </TabNavigator.Item>
        )

    }
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View  style={styles.container}>
          <StatusBar hidden={false} style={{height:40}} />
          <TabNavigator>
              {this._renderTabarItems('首页',require('./img/home2.png'),require('./img/home.png'),Home,navigate,this.find,this.props.navigation.state.params.user,this.props.navigation)}
              {this._renderTabarItems('问答',require('./img/answer2.png'),require('./img/answer.png'),Answer,navigate,this.find,this.props.navigation.state.params.user,this.props.navigation)}
              {this._renderTabarItems('发现',require('./img/find2.png'),require('./img/find.png'),Find,navigate,this.find,this.props.navigation.state.params.user,this.props.navigation)}
              {this._renderTabarItems('我的',require('./img/my2.png'),require('./img/my.png'),My,navigate,this.find,this.props.navigation.state.params.user,this.props.navigation)}
          </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f8f8f8',
        paddingTop:(Platform.OS === 'ios' ? 20 : 0)
    },
    tabText:{
        color:'#000000',
        fontSize:10
    },
    selectedTabText:{
        color:'#ff8089'
    },
    icon:{
        width:20,
        height:20
    },
    statusBar: {
        height:20
    }
})

