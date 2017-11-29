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
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import Experts from "./Experts"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class ExpertsList extends Component{
    static navigationOptions = ({navigation}) => ({

            title: "专家列表",
            headerTitleStyle:{
                alignSelf:'center',
                color:"#333",
                fontSize:15
            },
        headerStyle:{
            elevation: 0
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 40, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    constructor(props){
        super(props)
        this.state = {
            index:1
        }
        this.index=this.index.bind(this)
    }
    componentDidMount(){

    }
    //切换导航来显示不同的专家列表
    index(obj){
        this.setState({
            index:obj.i+1
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollableTabView
                    initialPage={0}
                    locked={true}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarActiveTextColor="#333"
                    tabBarInactiveTextColor="#666"
                    tabBarBackgroundColor="#fff"
                    onChangeTab={(obj)=>{
                        this.index(obj)
                    }}
                >
                    <Experts tabLabel="孕期护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <Experts tabLabel="妇产护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <Experts tabLabel="新生儿护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <Experts tabLabel="母乳指导" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index}/>
                    <Experts tabLabel="育儿专家" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index}/>
                </ScrollableTabView>
            </View>
        )
    }
}