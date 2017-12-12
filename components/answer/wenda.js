/**
 * Created by Administrator on 2017/10/23.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    TouchableWithoutFeedback,
    RefreshControl,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
var {width} = Dimensions.get('window');
import constants from './../constants';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
import ExpertList from './experts_list';
import ProblemList from './problem_list'
import PublishProblem from './publish_problem';
import LoadingMore from './../loading_more';
let count=0;
export default class MinePage extends Component {

    constructor(props){
        super(props);
        this.state={
            isRefreshing: false,
            loadMore:false,
            actionNum:0,
            user:{},
            finish:false,
            data:[],
            limit:this.props.problemLimit,
            sort:true,
            oldAry:[]
        };
        this.requestData=this.requestData.bind(this);
        this.changeSort=this.changeSort.bind(this);
    }

    componentDidMount(){
        const orderby='weight';
        const offset=0;
        this._loadInitialUser(orderby,offset);
    }

    //获取用户信息
    async _loadInitialUser(orderby,offset){
        var that=this;
        try{
            var value=await AsyncStorage.getItem('user');
            if(value!=null){
                result=JSON.parse(value);
                this.setState({
                    user:result
                });
                that.requestData(orderby,offset);
                that.requestExperts();
            }else{
                console.log('无数据')
            }
        }catch(error){
            this._appendMessage('AsyncStorage错误'+error.message);
        }
    }

    //最热最新按钮切换
    changeSort(orderby){
        if(orderby=='weight'){
            this.setState({
                data:[],
                sort:true,
                orderby:'weight',
                actionNum:0
            });
        }
        if(orderby=='create'){
            this.setState({
                data:[],
                sort:false,
                orderby:'create',
                actionNum:0
            });
        }
        var offset=0;
        this.requestData(orderby,offset)
    }
    //请求列表数据
    requestData(orderby,offset){
        const url=constants.url+"/v1/problem?type=1&orderby="+orderby+"&offset="+offset+"&limit=4&uuid="+this.state.user.uuid;
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers: {
                "Http-App-Token": this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let oldArr=this.state.data;
                let newArr=responseJson.data;
                if(newArr.length>0 && newArr.length<5){
                    count++;
                    if(count==1){
                        let allArr=[...oldArr,...newArr];
                        this.setState({
                            data:allArr
                        });
                    }
                    this.setState({
                        finish:true,
                        actionNum:this.state.actionNum-1
                    })
                }else {
                   let allArr=[...oldArr,...newArr];
                    this.setState({
                        data:allArr
                    });
                }
            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

    //请求专家列表
    requestExperts(){
        const url=constants.url+"/v1/professionals?uuid="+this.state.user.uuid+"&offset=0&limit=4";
        const urlSigned = getSingedUrl(url, this.state.user.uuid);
        fetch(urlSigned,{
            method:"GET",
            headers:{
                "Http-App-Token":this.state.user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    oldAry:responseJson.data
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }

    //监听列表滚到底部
    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
            this.setState({
                loadMore:true,
                actionNum:this.state.actionNum+1
            });
            let offset=(this.state.actionNum+1)*5;
            this.requestData(this.state.orderby,offset);
        }
    }
    //刷新函数
    _onRefresh(){
        const orderby='weight';
        const offset=0;
        if(this.state.data.length==0 || this.state.oldAry.length==0){
            this._loadInitialUser(orderby,offset);
        }
    }

    render() {
        return (
            <View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this._onRefresh()}
                            tintColor="#000"
                            title="加载中..."
                            titleColor="#000"
                            colors={['#999', '#999', '#999']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}
                >
                    <View style={styles.top_container}>
                        <View style={{flex:1,flexDirection:'row',paddingTop:20,paddingLeft:33}}>
                            <View><Image source={{uri:'http://cdn.ayi800.com/app_wenda/wenda.png'}} style={styles.top_pic}/></View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <View><Text>免费问答，快速提问</Text></View>
                                <TouchableWithoutFeedback onPress={()=> {this.props.navigate('PublishProblem',{navigate:this.props.navigate})} }>
                                <View style={{width:70,height:24,borderColor:'#ff8080',borderWidth:1,borderRadius:12,marginTop:16,overflow:'hidden'}} >
                                    <Text style={{textAlign:'center',lineHeight:18,color:'#ff8080',fontSize:10}}>我要提问</Text>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <ExpertList oldAry={this.state.oldAry} navigate={this.props.navigate}/>
                    <ProblemList changeSort={this.changeSort} sort={this.state.sort} requestData={this.requestData} data={this.state.data} isLoading={this.state.loadMore} actionNum={this.state.actionNum} navigate={this.props.navigate} />
                    <LoadingMore
                        finish={this.state.finish}
                        isLoading={this.state.loadMore}
                        onLoading={()=>{
                            let offset=(this.state.actionNum+1)*5;
                            this.requestData(this.state.orderby,offset);
                        }}
                    />
                    <View style={{height:40,width:width}}></View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    top_container:{
        backgroundColor:'#f9f1ea',
        height:130,
        marginBottom:15
    },
    top_pic:{
        width:122,
        height:95
    }
});