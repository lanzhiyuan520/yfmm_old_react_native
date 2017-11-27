
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    RefreshControl,
    Button,
    ScrollView,
    StatusBar
} from 'react-native';

import Header from './answer/answer_top';
import Wenda from './answer/wenda';
import Column from './column/column';
import LoadingMore from './loading_more'
// import Column from './answer/zhuanlan'
export default class MinePage extends Component {
    constructor(props){
        super(props);
        this.state={
            changePage:'true',
            isRefreshing: false,
            loadMore:false,
            requestDate:true,
            problemLimit:4,
            replyOffset:0,
            columnOffset:0,
            actionNum:0,
            finish:false
        };
        this.isDown=this.isDown.bind(this);
    }

    changestate(newState){
        this.setState({
            changePage:newState
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
        }
    }
    //刷新函数
    _onRefresh(){
        alert('刷新成功')
    }
    //数据全部加载完成执行
    isDown(){
        console.log(5);
        // this.setState({
        //     finish:true
        // })
    }

    //加载更多
    _renderLoadMore() {
        return (
            <LoadingMore
                finish={this.state.finish}
                isLoading={this.state.loadMore}
                onLoading={()=>{
                    alert('正在加载...');
                }}
            />
        );
    }

    render() {
        return (
            <View style={{paddingBottom:50}}>
                <Header hasborder={this.state.changePage} changestate={this.changestate.bind(this)} />
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
                {
                    this.state.changePage == 'true' ? (
                        <Wenda isDown={this.isDown} actionNum={this.state.actionNum} replyOffset={this.state.replyOffset} problemLimit={this.state.problemLimit} navigate={this.props.navigate}/>
                    ) : (
                        <Column columnOffset={this.state.columnOffset} navigate={this.props.navigate}/>
                    )
                }
                    {this._renderLoadMore()}
                </ScrollView>
            </View>
        );

    }
}
const styles = StyleSheet.create({

});

