import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
export default class Loading extends Component{
    render(){
        return(
            <View style={{
                position:"absolute",
                zIndex:5,
                top:height/2,
                left:width/2,
                marginLeft:-18,
                marginTop:-18
            }}>
                <ActivityIndicator
                    animating={this.props.loading}
                    size='large'
                    style={styles.gray}
                    color="#000"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    gray: {
        backgroundColor: 'transparent'
    },
});
