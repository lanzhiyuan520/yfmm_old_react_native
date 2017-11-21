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
import {Circle,friends} from "../fenxiang/fenxiang"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import *as wechat from 'react-native-wechat';
export default class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            heart:true
        }
    }

    changeHeart(){
        if(this.state.heart){
            this.setState({
                heart:false
            })
        }else{
            this.setState({
                heart:true
            })
        }
    }

    componentDidMount (){
        wechat.registerApp('wx825ecd9a849eef9d')
    }

    shareWechat(){
        this.props.shareShow();
    }

    renderHeart(){
        if(this.state.heart){
            return(
                <View>
                    <FontAwesome name="heart-o" style={{fontSize:15,color:"#ff8080",marginRight:8}} />
                </View>
            )
        }else {
            return(
                <View>
                    <FontAwesome name="heart" style={{fontSize:15,color:"#ff8080",marginRight:8}} />
                </View>
            )
        }
    }

    hasRight() {
        if (this.props.share) {
            return (
                <TouchableWithoutFeedback onPress={() => this.shareWechat()}>
                    <View style={[styles.sub_container, styles.pr]}>
                        <FontAwesome name="share-alt" style={{fontSize: 15, color: "#ff8080",}}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }else if (this.props.heart=="true") {
            return (
                    <View style={[styles.sub_container, styles.pr]}>
                        <TouchableWithoutFeedback onPress={() =>  this.changeHeart()}>
                            {this.renderHeart()}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.shareWechat()}>
                             <FontAwesome name="share-alt" style={{fontSize: 15, color: "#ff8080",}}/>
                        </TouchableWithoutFeedback>
                    </View>
            )
        }else{
            return (
                <TouchableWithoutFeedback>
                    <View style={[styles.sub_container, styles.pr]}>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    goBack(){
        if( this.props.changeBtn){
            this.props.changeBtn();
            this.props.navigation.goBack(null);
        }else{
            this.props.navigation.goBack(null);
        }

    }

    hasLeft(){
        if (this.props.back=="true") {
            return (
                <TouchableWithoutFeedback onPress={()=> this.goBack()}>
                    <View style={[styles.sub_container,styles.pl]}>
                        <FontAwesome name="angle-left" style={{fontSize:30,color:"#ff8080"}} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }else {
            return (
                <TouchableWithoutFeedback onPress={() => alert(4)}>
                    <View style={[styles.sub_container, styles.pr]}>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    render(){

        return(

            <View style={styles.container}>
                <View style={{flex:1,flexDirection:'row',height:40}}>
                    {this.hasLeft()}
                    <View style={[styles.sub_container,styles.center]}><Text>{this.props.title}</Text></View>
                    {this.hasRight()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:40,
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1
    },
    sub_container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    pl:{
        paddingLeft:15
    },
    pr:{
        paddingRight:15,
        justifyContent:'flex-end'
    },
    center:{
        justifyContent:'center'
    }
});