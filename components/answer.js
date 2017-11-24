
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
            problemLimit:4
        };
    }

    changestate(newState){
        this.setState({
            changePage:newState
        });
    }
    _onScroll(event) {
        // if(this.state.loadMore){
        //     return;
        // }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
            this.setState({
                loadMore:true
            });
        }
    }

    _onRefresh(){
        alert('刷新成功')
    }

    _renderLoadMore() {
        // if (this.state.baseDatas == null || this.state.baseDatas.recommondMerchant == null) {
        //     return;
        // }
        let that=this;
        this.timer = setTimeout(
            () => {},
            1000
        );
        if(this.state.requestDate){

        }
        return (
            <LoadingMore
                isLoading={this.state.loadMore}
                onLoading={()=>{
                    alert('fdfdfd');
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
                        <Wenda problemLimit={this.state.problemLimit} navigate={this.props.navigate}/>
                    ) : (
                        <Column navigate={this.props.navigate}/>
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

