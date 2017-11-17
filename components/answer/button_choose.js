/**
 * Created by Administrator on 2017/10/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    TouchableWithoutFeedback
} from 'react-native';


export default class MinePage extends Component {

    constructor(props){
        super(props);
        this.state={
            sort:true,
        };
    }

    changeSort(orderby){
        if(orderby=='weight'){
            this.setState({
                sort:true,
                orderby:'weight'
            });
        }
        if(orderby=='create'){
            this.setState({
                sort:false,
                orderby:'create'
            });
        }
        this.props.requestData(orderby);
    }

    render() {
        return (
                <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:15,backgroundColor:'#fff',paddingTop:15}}>
                    <View>
                         <TouchableWithoutFeedback onPress={() => this.changeSort('weight')}><Text style={this.state.sort? styles.black_color:styles.light_color}>最热</Text></TouchableWithoutFeedback>
                    </View>
                    <View style={styles.division}></View>
                     <View>
                        <TouchableWithoutFeedback onPress={() => this.changeSort('create')}><Text style={this.state.sort? styles.light_color:styles.black_color}>最新</Text></TouchableWithoutFeedback>
                     </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    division:{
        width:2,
        height:15,
        backgroundColor:'#999',
        marginLeft:8,
        marginRight:8
    },
    black_color:{
        color:'#333',
        fontSize:12
    },
    light_color:{
        color:'#999',
        fontSize:12
    },
});