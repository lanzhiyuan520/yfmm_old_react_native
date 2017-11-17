/**
 * Created by Administrator on 2017/10/23.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
import ExpertList from './experts_list';
import ProblemList from './problem_list'

export default class MinePage extends Component {

    componentWillMount(){
        console.log(this.props.problemLimit)
    }

    render() {
        return (
            <View>
                <View style={styles.top_container}>
                    <View style={{flex:1,flexDirection:'row',paddingTop:20,paddingLeft:33}}>
                        <View><Image source={{uri:'http://cdn.ayi800.com/app_wenda/wenda.png'}} style={styles.top_pic}/></View>
                        <View style={{flex:1,alignItems:'center'}}>
                            <View><Text>免费问答，快速提问</Text></View>
                            <View style={{width:70,height:24,borderColor:'#ff8080',borderWidth:1,borderRadius:12,marginTop:16}} >
                                <Text style={{textAlign:'center',lineHeight:18,color:'#ff8080',fontSize:10}}>我要提问</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ExpertList navigate={this.props.navigate}/>
                <ProblemList problemLimit={this.props.problemLimit} navigate={this.props.navigate} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    top_container:{
        backgroundColor:'#f9f1ea',
        height:130,
        marginBottom:15
    },
    top_pic:{
        width:122,
        height:95
    }
});