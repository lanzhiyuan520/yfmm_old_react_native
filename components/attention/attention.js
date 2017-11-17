import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import Talent from "./talent"
import Specialist from "./specialist"
import Column from "./column"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Attention extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "我的关注",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <ScrollableTabView
                    initialPage={0}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarActiveTextColor="#333"
                    tabBarInactiveTextColor="#666"
                    tabBarBackgroundColor="#fff"
                >
                    <Talent tabLabel="达人" navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
                    <Specialist tabLabel="专家" navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
                    <Column tabLabel="专栏" navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
                </ScrollableTabView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})