/**
 * Created by Administrator on 2017/10/16.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

export default class Newtop extends Component {
    constructor(props){
        super(props);
        this.state={
            hasborder:this.props.hasborder
        };
    }
    changeTrue(){
        this.setState({
            hasborder:'true'
        });
        this.props.changestate('true');
    }
    changeFlase(){
        this.setState({
            hasborder:false
        });
        this.props.changestate('false');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowstyle}>
                    <View style={styles.mainContainer}></View>
                    <TouchableWithoutFeedback  onPress={ ()=> this.changeTrue() }><View style={this.state.hasborder?styles.border:styles.subContainer}><Text style={{lineHeight:30}}>问答</Text></View></TouchableWithoutFeedback>
                    <View style={styles.subContainer}></View>
                    <TouchableWithoutFeedback onPress={ ()=> this.changeFlase() }><View style={this.state.hasborder?styles.subContainer:styles.border}><Text style={{lineHeight:30}}>专栏</Text></View></TouchableWithoutFeedback>
                    <View style={styles.mainContainer}></View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        height:48,
    },
    rowstyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    mainContainer:{
        flexGrow:16,
        alignItems: 'center',
    },
    subContainer:{
        flexGrow:1,
        alignItems: 'center',
    },
    border:{
        borderBottomColor:'#ff8080',
        borderBottomWidth:2,
        flexGrow:1,
        alignItems: 'center',
    }
});