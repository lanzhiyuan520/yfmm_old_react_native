import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
export default class Loading extends Component{
    render(){
        return(
            <View>
                <ActivityIndicator
                    animating={this.props.loading}
                    size={35}
                    style={[styles.centering, styles.gray]}
                    color="#6c6c6c"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        position:"absolute",
        zIndex:5,
        top:height/2,
        left:width/2,
        marginLeft:-35,
        marginTop:-35,
    },
    gray: {
        backgroundColor: 'transparent'
    },
});
