
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
    StatusBar,
    AsyncStorage
} from 'react-native';

import Header from './answer/answer_top';
import Wenda from './answer/wenda';
import Column from './column/column';
// import Column from './answer/zhuanlan'
export default class MinePage extends Component {
    constructor(props){
        super(props);
        this.state={
            changePage:'true',
            isRefreshing: false,
            problemLimit:4
        };
    }

    componentDidMount() {
        this.setState({
            user:JSON.parse(this.props.user)
        })
    }
    changestate(newState){
        this.setState({
            changePage:newState
        });
    }

    render() {
        return (
            <View style={{paddingBottom:50}}>
                <Header hasborder={this.state.changePage} changestate={this.changestate.bind(this)} />
                {
                    this.state.changePage == 'true' ? (
                        <Wenda problemLimit={this.state.problemLimit} navigate={this.props.navigate}/>
                    ) : (
                        <Column navigate={this.props.navigate}/>
                    )
                }
            </View>
        );

    }
}
const styles = StyleSheet.create({

});

