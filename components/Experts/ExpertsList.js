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
import Load from "../loading/loading"
import Header from './../commen/header';
export default class ExpertsList extends Component{
    static navigationOptions = ({navigation}) => ({
        header:null
    });
    constructor(props){
        super(props)
        this.state = {
            index:1,
            loading:true
        }
        this.index=this.index.bind(this)
        this.load=this.load.bind(this)
    }
    componentDidMount(){

    }
    //切换导航来显示不同的专家列表
    index(obj){
        this.setState({
            index:obj.i+1
        })
    }
    load(num){
        if (num == 1){
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
            <View style={{flex:1}}>
                <Header title="专家列表" back="true" navigation={this.props.navigation}/>
                <Load loading={this.state.loading} />
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
                    <Experts tabLabel="孕期护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index} load={this.load}/>
                    <Experts tabLabel="妇产护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index} load={this.load}/>
                    <Experts tabLabel="新生儿护理" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index} load={this.load}/>
                    <Experts tabLabel="母乳指导" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index} load={this.load}/>
                    <Experts tabLabel="育儿专家" navigate={this.props.navigation.state.params.navigate} user={this.props.navigation.state.params.user} index={this.state.index} load={this.load}/>
                </ScrollableTabView>
            </View>
        )
    }
}