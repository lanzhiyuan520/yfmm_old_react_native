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
import Load from "../loading/loading"
import Header from "../commen/header"
export default class Attention extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
    });
    constructor(props){
        super(props)
        this.state={
            loading:true
        }
        this.load = this.load.bind(this)
    }
    load(num){
        if(num==1){
            this.setState({
                loading:true
            })
        }else{
            this.setState({
                loading:false
            })
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <Header title="我的关注" back="true" navigation={this.props.navigation} />
                <Load loading={this.state.loading} />
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
                    <Talent tabLabel="达人" load={this.load} navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
                    <Specialist tabLabel="专家" load={this.load} navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
                    <Column tabLabel="专栏" load={this.load} navigate={this.props.navigation} user={this.props.navigation.state.params.user}/>
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