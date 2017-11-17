import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
<<<<<<< HEAD
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import Header from './commen/header';
import constants from './constants';
import VideoDetail from './find/video_detail';
var {width} = Dimensions.get('window');
export default class Find extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        }
    }

    componentWillMount(){
        this.requestData();
    }

    requestData(){
        fetch(constants.url+"/v1/article?uuid=6e76-933cad1-41a6130-3392c69-0ff2bd7&articleType=4&orderBy=createTimeDesc&limit=5&offset=0")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    dataSource:responseJson.data.dataList
                })
            })
            .catch(() => {
                console.error('数据请求失败');
            });
    }

    renderItem(item){
        return(
            <View>
                <TouchableWithoutFeedback onPress={()=>this.props.navigate('VideoDetail',{id:item.id,author:item})}>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Image source={{uri:item.banner}} style={styles.pic}/>
                            {/*<View style={styles.mask}></View>*/}
                        </View>
                        <View style={{flex:1,flexDirection:'row',marginVertical:5}}>
                            <View style={{marginRight:5}}>
                                <Text style={{color:'#999',fontSize:14}}>#{item.tags_name}</Text>
                            </View>
                            <View>
                                <Text style={{color:'#444',fontSize:14}}>{item.title}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{marginRight:5}}>
                                        <Image source={{uri:item.author_img}} style={{width:20,height:20,borderRadius:10}} />
                                    </View>
                                    <View>
                                        <Text style={{color:'#999',fontSize:12}}>{item.author_name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{color:'#999',fontSize:12}}>播放{item.visit_num}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render(){
        return(
            <View>
                <Header title="发现" back="false" />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => this.renderItem(item)}
                    style={{marginBottom:40}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: '#fff',
        marginBottom:10,
        height:'auto',
        padding:15
    },
    rightContainer: {
        flex:1
    },
    pic:{
        flex:1,
        height:180,
    },
    mask:{
        width:width,
        height:180,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        right:0,
        top:0,
    }
});
=======
    Image
} from 'react-native';

export default class Find extends Component{
    render(){
        return(
            <View>
                <Text>发现</Text>

            </View>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
}
>>>>>>> 33b91709abc2fff838f66293dbda3b5e3b203c88