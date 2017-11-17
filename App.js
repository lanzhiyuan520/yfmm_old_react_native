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
    Image
} from 'react-native';
import Home from "./components/Home"
import Answer from "./components/answer"
import Find from "./components/Find"
import My from "./components/My"
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
          selectedTab:'首页',
      }
  }

    componentDidMount(){
        console.log(this.props.navigation);
        WeChat.registerApp('wx825ecd9a849eef9d');
    }

    _renderTabarItems(selectedTab,icon,selectedIcon,Component,navigate){
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
              <Component navigate={navigate} />
            </TabNavigator.Item>
        )

    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View  style={styles.container}>
        <TabNavigator>
            {this._renderTabarItems('首页',require('./img/home2.png'),require('./img/home.png'),Home,navigate)}
            {this._renderTabarItems('问答',require('./img/answer2.png'),require('./img/answer.png'),Answer,navigate)}
            {this._renderTabarItems('发现',require('./img/find2.png'),require('./img/find.png'),Find,navigate)}
            {this._renderTabarItems('我的',require('./img/my2.png'),require('./img/my.png'),My,navigate)}
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

