/**
 * Created by Administrator on 2017/10/30.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
export default class Find extends Component{

    render(){

        return(
            <View style={styles.container}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.goBack(null)}>
                        <View style={[styles.sub_container,styles.pl]}>
                            <Text style={styles.pink}>取消</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.sub_container}></View>
                    <TouchableWithoutFeedback onPress={()=> this.props.public()}>
                        <View style={[styles.sub_container,styles.pr]}>
                            <Text style={{textAlign:'right',color:'#ff8080'}}>提交</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:40,
        backgroundColor:'#fff',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        marginTop:(Platform.OS === 'ios' ? 20 : 0)
    },
    sub_container:{
        flex:1,
        justifyContent:'center'
    },
    pl:{
        paddingLeft:15
    },
    pr:{
        paddingRight:15
    },
    pink:{
        color:'#ff8080'
    }
});