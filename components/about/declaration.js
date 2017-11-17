import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class PersonalData extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "免责声明",
        headerTitleStyle:{
            alignSelf:'center',
            color:"#333",
            fontSize:15
        },
        headerStyle:{
            elevation: 0,
            backgroundColor:"#fff"
        },
        headerRight: <View></View>,
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 30, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <View style={{width:width,backgroundColor:"#fff",borderTopColor:"#f2f2f2",borderTopWidth:1,paddingRight:10,paddingLeft:10}}>
                    <Text style={styles.text} >
                        1、“有福妈妈”为北京浩思麦信息技术有限公司注册所有的商标，“有福妈妈APP”是由北京浩思麦信息技术有限公司开发，一切著作权、商标权、专利权、商业秘密等知识产权，以及相关的所有信息内容，包括但不限于图标、图表、色彩、界面设计、版面框架、数据、电子文档等均受中华人共和国著作权法、商标法、专利法、反不正当竞争法以及其他知识产权法律法规的保护，北京浩思麦信息技术有限公司依法享有相应的知识产权。
                    </Text>
                    <Text style={styles.text}>2、未经北京浩思麦信息技术有限公司书面同意，用户不得以任何目的使用或转让上述知识产权，北京浩思麦信息技术有限公司保留追究上述未经许可行为的权利。</Text>
                    <Text style={styles.text}>
                        3、本APP部分内容来自互联网，如主张知识产权，请来电或致函告之，本网站将采取适当措施，否则，与之有关的知识产权纠纷不承担任何责任。
                    </Text>
                    <Text style={styles.text}>联系电话：400-662-5800</Text>
                    <Text style={styles.text}>电子邮件：market@youfumama.com</Text>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:15,lineHeight:30
    }
})