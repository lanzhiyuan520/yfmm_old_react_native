/**
 * Created by Administrator on 2017/10/31.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
export default class Find extends Component{

    constructor(props){
        super(props);
        this.state={
            checked:'0'
        }
    }

    changeBtn(order){
        this.setState({
            checked:order
        })
        this.props.getService(order);
    }

    render(){
        return(
            <View  style={{flex:1,flexDirection:'row',marginBottom:30,justifyContent:'space-around',flexWrap:'wrap'}}>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('0')}>
                    <View style={this.state.checked =='0'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='0'?styles.checked_font:styles.unchecked_font}>不限</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('1')}>
                    <View style={this.state.checked =='1'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked=='1'?styles.checked_font:styles.unchecked_font}>孕期</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('2')}>
                    <View style={this.state.checked =='2'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='2'?styles.checked_font:styles.unchecked_font}>育儿</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('3')}>
                    <View style={this.state.checked =='3'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='3'?styles.checked_font:styles.unchecked_font}>月子</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('4')}>
                    <View style={this.state.checked =='4'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='4'?styles.checked_font:styles.unchecked_font}>早教</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    unchecked:{
        borderWidth:0.5,
        borderColor:'#f2f2f2',
        width:53,
        height:30,
        borderRadius:5,
        justifyContent:'center'
    },
    unchecked_font:{
        color:'#ff8080',
        fontSize:12,
        textAlign:'center'
    },
    checked:{
        borderWidth:0.5,
        borderColor:'#f2f2f2',
        width:53,
        height:30,
        borderRadius:5,
        justifyContent:'center',
        backgroundColor:'#ff8080'
    },
    checked_font:{
        color:'#fff',
        fontSize:12,
        textAlign:'center'
    },
});