/**
 * Created by Administrator on 2017/10/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    AsyncStorage,
    TouchableWithoutFeedback
} from 'react-native';
import AttBtn from './att_btn';
var count=0;
export default class myColumn  extends Component {
    constructor(props){
        super(props);
        this.state={
            attend:'true',
            list:this.props.lists,
            newColumn:{},
            count:0
        }
        this.renderItem=this.renderItem.bind(this);
        this.removeItem=this.removeItem.bind(this);
    }
    //页面跳转传值
    _pressRow(item){
        this.props.navigate('ColumnDetail',{id:item,removeItem:this.removeItem})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({list: nextProps.lists});
    }
    //取消关注后移除该项
    removeItem(){
        this.props.change()
    }

    //初始化我的关注
    renderItem(newColumn){
        let column=this.props.data;
        let newArr=[];
        for(var item in newColumn){
            newArr.push (
                <View key={item}>
                    <TouchableWithoutFeedback onPress = {this._pressRow.bind(this,item)}>
                        <View style={{flex:1,flexDirection:'row',padding:15,borderBottomColor:'#f2f2f2',borderBottomWidth:0.5}}>
                            <View style={{flex:1,marginRight:10}}>
                                <Image style={{width:60,height:44}} source={{uri:column[item].group_img}}/>
                            </View>
                            <View style={{flex:3,justifyContent:'space-between'}}>
                                <View><Text style={{fontSize:13,lineHeight:13,color:'#262626'}}>{column[item].group_name}</Text></View>
                                <View><Text style={{fontSize:11,}} numberOfLines={2}>{column[item].group_content}</Text></View>
                            </View>
                            <View style={{flex:1,marginTop:10,alignItems:'flex-end'}}>
                                {/*<AttBtn title="关注" subtitle="已关注" id={item} ischange="true" change={this.props.change} attend={this.state.attend} collect="care" operateType="6" />*/}
                                <AttBtn title="关注" subtitle="已关注" ischange="true" content={column[item]} removeItem={this.removeItem} id={item} attend={this.state.attend} collect="care" operateType="6" />

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        };
        return newArr;
    }

    render() {
        let column=this.props.data;
        let newColumn={};
        let list=this.state.list;
        for( var item in column ){
            if(list.length !==0){
                if(list.indexOf(item)!==-1){
                    newColumn[item]=column[item];
                }
            }
        }
        let count=0;
        for(var i in newColumn){
            count++;
        }
        if(count !== 0){
            return (
                <View>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{paddingLeft:15,paddingTop:15}}>
                            <Text style={{fontSize:11}}>我的关注</Text>
                        </View>
                        {this.renderItem(newColumn)}
                    </View>
                </View>
            );
        }else{
            return (
                <View>
                    <View style={{flex:1,height:175,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                        <View>
                            <Text>“暂未关注专栏”</Text>
                        </View>
                    </View>
                </View>
            );
        }



    }
}
const styles = StyleSheet.create({

});