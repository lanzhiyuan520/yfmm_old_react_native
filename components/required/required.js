import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Button
} from 'react-native';
import RequiredList from "../requiredList/requiredList"
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from "react-native-scrollable-tab-view"
import ActionSheet from 'react-native-actionsheet'
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '微信朋友圈', '微信好友', '复制到剪切板']
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getKeywordsByUserStatus} from "../tools/tools"
import { TabNavigator } from "react-navigation";
export default class Required extends Component{
    static navigationOptions = ({navigation}) => ({
            title: "每日推荐",
            headerTitleStyle:{
                alignSelf:'center',
                color:"#333",
                fontSize:15
            },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#f5f5f5"
        },
        headerRight: <TouchableWithoutFeedback onPress={()=>{navigation.state.params.navigatePress()}}><FontAwesome name="share-alt" style={{fontSize: 20, color: "#ff8080",marginRight:10}}/></TouchableWithoutFeedback>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state = {
            index:1
        }
        this.fun=this.fun.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
        this.nav_list = this.nav_list.bind(this)
    }
    componentDidMount(){
        this.nav_list()
    }
    nav_list(){
        var user = this.props.navigation.state.params.user
        this.props.navigation.setParams({navigatePress:this.showActionSheet})
    }
    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        if(i==0){
            alert("点了取消")
        } else if(i==1){
            alert("点了微信朋友圈")
        } else if(i==2){
            alert("点了微信好友")
        } else if(i==3){
            alert("点了剪切板")
        }

    }
    fun(obj){
        this.setState({
            index:obj.i+1
        })
    }
    render(){
        return(
            <View style={{flex:1}}>

                <ScrollableTabView
                    initialPage={0}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarActiveTextColor="#333"
                    tabBarInactiveTextColor="#666"
                    tabBarBackgroundColor="#fff"
                    onChangeTab={(obj)=>{
                        this.fun(obj)
                    }}
                >
                    <RequiredList tabLabel="孕1月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕2月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕3月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕4月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕5月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕6月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕7月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕8月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕9月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕10月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕11月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <RequiredList tabLabel="孕12月" user={this.props.navigation.state.params.user} index={this.state.index}/>
                </ScrollableTabView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        )
    }
}
