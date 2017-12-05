/**
 * Created by Administrator on 2017/10/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import {setSpText} from './../UiStyle';
import {scaleSize} from './../UiStyle';
import constants from './../constants';
import PublishProblem from './publish_problem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExpertsList from './../Experts/ExpertsList';
import {getSingedUrl,getEncryptParam,decrypt} from "./../tools/tools";
export default class ExpertList extends Component {
    constructor(props){
        super(props);
        this.state={
            oldAry:[],
            navigation:this.props.navigation
        };
    }
    componentWillMount(){
        this.requestData()
    }
    requestData(){
        const url=constants.url+"/v1/professionals?uuid="+constants.uuid+"&offset=0&limit=4";
        const urlSigned = getSingedUrl(url, constants.uuid);
        console.log(urlSigned)
        fetch(urlSigned,{
            method:"GET",
            headers:{
                "Http-App-Token":constants.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    oldAry:responseJson.data
                })
            })
            .catch(() => {
                console.error('数据请求失败！');
            });
    }
    renderItem(){
        var itemAry=[];
        this.state.oldAry.map( (item,index)=> {
            itemAry.push(
                <TouchableWithoutFeedback key={index} onPress={()=> {this.props.navigate('PublishProblem',{navigate:this.props.navigate})} }>
                    <View style={styles.container}>
                        <View>
                            <Image style={{width:scaleSize(100),height:scaleSize(100),borderRadius:scaleSize(50)}} source={{uri:item.img}}/>
                        </View>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                        <View>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={styles.ask_btn}>
                            <Text style={{lineHeight:20,textAlign:'center',color:'#ff8480'}}>去问TA</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
        return itemAry;
    }
    render() {
        return (
            <View style={[styles.scroll_box]}>
                <View style={styles.article_item}>
                    <View style={{flex:1}}><Text style={styles.font_12}>专家推荐</Text></View>
                    <View style={{flex:1}}>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigate('ExpertsList', {navigate: this.props.navigate, user: constants.user})}>
                            <FontAwesome name="angle-right" style={styles.font_10} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView style={styles.scroll_pic} horizontal>
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container:{
        borderWidth:0.5,
        width:135,
        height:162,
        borderColor:'#f2f2f2',
        marginRight:10,
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingTop:15,
        paddingBottom:15
    },
    scroll_box:{
        backgroundColor:'#fff',
        marginBottom:15,
        height:220,
    },
    font_10:{
        fontSize:18,
        lineHeight:13,
        textAlign:'right'
    },
    font_12:{
        fontSize:12
    },
    black_color:{
        color:'#262626'
    },
    article_item:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        paddingBottom:0
    },
    scroll_pic:{
        backgroundColor:'#fff',
        height:162,
        marginTop:-142,
        marginLeft:15,
        marginRight:5
    },
    ask_btn:{
        width:70,
        height:25,
        borderWidth:1,
        borderColor:'#f2f2f2',
        borderRadius:3
    }
});