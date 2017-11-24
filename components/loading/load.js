import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default class Load extends Component{
    render(){
        return(
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Bars size={10} color="#FDAAFF" />
            </View>
        )
    }
}