import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Button,
    AsyncStorage
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
import Variable from "../Variable/Variable"
import {Circle,friends} from "../fenxiang/fenxiang"
import Share from './../commen/share';
import {requestTodayView} from "../api"
import Header from "../commen/header"
export default class Required extends Component{
    static navigationOptions = ({navigation}) => ({
         header:null
    });
    constructor(props){
        super(props)
        this.state = {
            index:null,
            status:null,
            yuezi:["月1天","月2天","月3天","月4天","月5天","月6天","月7天","月8天","月9天","月10天","月11天","月12天","月13天","月14天","月15天","月16天","月17天","月18天","月19天","月20天","月21天","月22天","月23天","月24天","月25天","月26天","月27天","月28天","月29天","月30天","月31天","月32天","月33天","月34天","月35天","月36天","月37天","月38天","月39天","月40天","月41天","月42天",],
            yuer:["育2月","育3月","育4月","育5月","育6月","育7月","育8月","育9月","育10月","育11月","育12月",],
            yunqi:["孕1周","孕2周","孕3周","孕4周","孕5周","孕6周","孕7周","孕8周","孕9周","孕10周","孕11周","孕12周","孕13周","孕14周","孕15周","孕16周","孕17周","孕18周","孕19周","孕20周","孕21周","孕22周","孕23周","孕24周","孕25周","孕26周","孕27周","孕28周","孕29周","孕30周","孕31周","孕32周","孕33周","孕34周","孕35周","孕36周","孕37周","孕38周","孕39周","孕40周",],
            sta:null,
            show:false,
            hello:null,
            data:[]
        }
        this.fun=this.fun.bind(this)
        this.shareShow = this.shareShow.bind(this)
    }
    componentWillMount(){
        //判断用户状态改变导航
            if(this.props.navigation.state.params.status == 1){
                    this.state.sta=this.state.yunqi
                this.state.index = 1
            }else if(this.props.navigation.state.params.status == 2){
                this.state.sta=this.state.yuezi
                this.state.index = 1
            }else if(this.props.navigation.state.params.status == 3){
                this.state.sta=this.state.yuer
                this.state.index = 2
            }

    }
    //切换导航获取不同的数据
    fun(obj){
        this.setState(
            {show:false}
        )
        if(this.props.navigation.state.params.status ==3){
            this.setState({
                index:obj.i+2
            })
        }else{
            this.setState({
                index:obj.i+1
            })
        }
    }
    //控制分享组件显示
    shareShow(){
        var user = this.props.navigation.state.params.user
        AsyncStorage.getItem("user_data",(error,result)=>{
            result = JSON.parse(result)
            //获取今日建议的文章
            requestTodayView(this.state.index,result.status,user.uuid,user.token,(responseText)=>{
                this.setState({
                    data:responseText.data.articleData
                })
            })
        })
        this.setState({
            show:true
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Header share='true' title={"每日推荐"}  heart={this.state.heart} back="true"  navigation={this.props.navigation} shareShow={()=>this.shareShow()} />
                <ScrollableTabView
                    initialPage={0}
                    scrollWithoutAnimation={true}
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarPosition='top'
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarActiveTextColor="#333"
                    tabBarInactiveTextColor="#666"
                    tabBarBackgroundColor="#fff"
                    onChangeTab={(obj)=>{
                        this.fun(obj)
                    }}
                >
                   {
                       this.state.sta.map((tab,i)=>{
                           return (
                               <RequiredList ref="list" navigation={this.props.navigation} key={i} tabLabel={tab} user={this.props.navigation.state.params.user} index={this.state.index}/>
                           )
                       })
                    }
                </ScrollableTabView>
                <Share show={this.state.show} id={this.state.data.id} url="article" title={this.state.data.title} type="999" />
            </View>
        )
    }
}

