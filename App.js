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
  Text,
  View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    AsyncStorage,
    ToastAndroid,
    BackHandler
} from 'react-native';
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
export default class App extends Component<{}> {
    static navigationOptions = {
        title: 'Welcome',
        header:null
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

    componentDidMount(){
        console.log(this.props.navigation);
        WeChat.registerApp('wx825ecd9a849eef9d');
    }

    find () {
        this.setState({
            selectedTab: "发现"
        })
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }
    onBackAndroid(){
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }
    componentDidMount() {
        var user = JSON.parse(this.props.navigation.state.params.user)
        init_user_behavior(user,this.behavior)
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }
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
        backgroundColor:'#f8f8f8'
    },
    tabText:{
        color:'#000000',
        fontSize:10
    },
    selectedTabText:{
        color:'#D81E06'
    },
    icon:{
        width:20,
        height:20
    }
})

