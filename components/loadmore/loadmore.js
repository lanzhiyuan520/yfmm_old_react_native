import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
export default class Loadmore extends Component{
    render(){
        return(
            <TouchableWithoutFeedback onPress={()=>{this.props.render_list()}}>
                <View style={{
                    width:width,
                    height:45,
                    backgroundColor:"#fcfcfc",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }} >
                    <Text>{this.props.btn}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}