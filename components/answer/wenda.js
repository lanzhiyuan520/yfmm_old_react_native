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
    Dimensions
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
var {width} = Dimensions.get('window');
import ExpertList from './experts_list';
import ProblemList from './problem_list'
import PublishProblem from './publish_problem';
export default class MinePage extends Component {

    constructor(props){
        super(props);
        this.state={
            isRefreshing: false,
            loadMore:false,
            actionNum:0
        };
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
        }
    }
    //刷新函数
    _onRefresh(){

        alert('刷新成功')
    }

    render() {
        return (
            <View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this._onRefresh()}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
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
                                <View style={{width:70,height:24,borderColor:'#ff8080',borderWidth:1,borderRadius:12,marginTop:16}} >
                                    <Text style={{textAlign:'center',lineHeight:18,color:'#ff8080',fontSize:10}}>我要提问</Text>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <ExpertList navigate={this.props.navigate}/>
                    <ProblemList isLoading={this.state.loadMore} actionNum={this.state.actionNum} problemLimit={this.props.problemLimit} navigate={this.props.navigate} />
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