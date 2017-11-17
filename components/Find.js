import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image
} from 'react-native';

export default class Find extends Component{
    render(){
        return(
            <View>
                <Text>发现</Text>

            </View>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
}
