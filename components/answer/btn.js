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

    //改变按钮的选中状态
    changeBtn(order){
        this.setState({
            checked:order
        })
        this.props.getService(order);
    }

    render(){
        return(
            <View  style={{flex:1,flexDirection:'row',marginBottom:30,justifyContent:'flex-start',flexWrap:'wrap'}}>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('0')}>
                    <View style={this.state.checked =='0'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='0'?styles.checked_font:styles.unchecked_font}>不限</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('1')}>
                    <View style={this.state.checked =='1'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked=='1'?styles.checked_font:styles.unchecked_font}>孕期护理</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('2')}>
                    <View style={this.state.checked =='2'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='2'?styles.checked_font:styles.unchecked_font}>妇产护理</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('3')}>
                    <View style={this.state.checked =='3'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='3'?styles.checked_font:styles.unchecked_font}>新生儿护理</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('4')}>
                    <View style={this.state.checked =='4'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='4'?styles.checked_font:styles.unchecked_font}>母乳指导</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.changeBtn('5')}>
                    <View style={this.state.checked =='5'?styles.checked:styles.unchecked}>
                        <Text style={this.state.checked =='5'?styles.checked_font:styles.unchecked_font}>育儿专家</Text>
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
        paddingHorizontal:10,
        height:30,
        borderRadius:5,
        justifyContent:'center',
        marginBottom:10,
        marginRight:10
    },
    unchecked_font:{
        color:'#ff8080',
        fontSize:12,
        textAlign:'center'
    },
    checked:{
        borderWidth:0.5,
        borderColor:'#f2f2f2',
        paddingHorizontal:10,
        height:30,
        borderRadius:5,
        justifyContent:'center',
        backgroundColor:'#ff8080',
        marginBottom:10,
        marginRight:10
    },
    checked_font:{
        color:'#fff',
        fontSize:12,
        textAlign:'center'
    },
});