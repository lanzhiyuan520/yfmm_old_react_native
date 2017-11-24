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
var data=[1,2,4,5]
export default class myColumn  extends Component {
    constructor(props){
        super(props);
        this.state={
            attend:'true',
            list:this.props.lists
        }
        this.renderItem=this.renderItem.bind(this);
        this.removeItem=this.removeItem.bind(this);
    }

    _pressRow(item){
        this.props.navigate('ColumnDetail',{id:item,removeItem:this.removeItem})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({list: nextProps.lists});
    }

    removeItem(){
        this.props.change()
    }

    renderItem(){
        let column=this.props.data;
        let newArr=[];
        let newColumn={};
        let list=this.state.list;
        for( var item in column ){
            if(list.length !==0){
                if(list.indexOf(item)!==-1){
                    newColumn[item]=column[item];
                }
            }

        }
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
                                <AttBtn title="关注" subtitle="已关注" ischange="true" removeItem={this.removeItem} id={item} attend={this.state.attend} collect="care" operateType="6" />

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        };
        return newArr;
    }

    render() {
        var that=this;
        const column=this.props.lists;
        const list =[...column];
        if(column.length !== 0){
            return (
                <View>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{paddingLeft:15,paddingTop:15}}>
                            <Text style={{fontSize:11}}>我的关注</Text>
                        </View>
                        {this.renderItem()}
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