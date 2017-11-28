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
import constants from './../constants';
import Storage from 'react-native-storage';
export default class RecColumn  extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            attend:'false'
        }
        this.renderItem=this.renderItem.bind(this);
        this.removeItem=this.removeItem.bind(this);
    }


    changeitem(id){
        var obj={};
        let column=this.state.data;
        Object.keys(column).forEach(function(key,index) {
            if(key != id){
                obj[key] = column[key];
            }
        });
      this.setState({
          data:obj
      })
    }

    _pressRow(item){
        this.props.navigate('ColumnDetail',{id:item,removeItem:this.removeItem})
    }


    removeItem(){
        this.props.change()
    }

    renderItem(){
        let column=this.props.data;
        let newArr=[];
        let newColumn={};
        const that=this;
        for( var item in column ){
            if(this.props.list.indexOf(item)==-1){
                newColumn[item]=column[item];
            }
        }
        console.log(newColumn);
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
                                <AttBtn title="关注" subtitle="已关注" id={item} ischange="true" removeItem={this.removeItem} changeitem={that.changeitem.bind(that)} attend={this.state.attend} collect="care" operateType="6" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        };
        return newArr;
    }


    render() {
            return (
                <View style={{marginTop:10,marginBottom:10}}>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{paddingLeft:15,paddingTop:15}}>
                            <Text style={{fontSize:11}}>专家推荐</Text>
                        </View>
                        {this.renderItem()}
                    </View>
                </View>
            );
    }
}
const styles = StyleSheet.create({
    att_btn:{
        height:30,
        paddingVertical:10,
        paddingHorizontal:15,
        borderWidth:0.5,
        borderColor:'#f2f2f2',
        borderRadius:3
    }
});