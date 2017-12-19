import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Alert,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
var {width} = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Service extends Component{
    static navigationOptions = ({navigation}) => ({

        title: "服务条款",
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
        headerLeft: <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}><FontAwesome name="angle-left" style={{fontSize: 35, color: "#ff8080",marginLeft:10}}/></TouchableWithoutFeedback>,
    });
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <ScrollView>
                <View style={{width:width,backgroundColor:"#fff",borderTopColor:"#f2f2f2",borderTopWidth:1,paddingRight:10,paddingLeft:10}}>
                    <View style={{width:width,marginBottom:10,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#000",fontSize:17,lineHeight:35}}>有福妈妈APP用户协议</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>“有福妈妈”为北京浩思麦信息技术有限公司注册所有的商标，有福妈妈APP的服务所有权和运作权归北京浩思麦信息技术有限公司所有。</Text>
                    </View>
                    <View>
                        <Text style={{color:"#000",fontSize:14,fontWeight:"bold",lineHeight:25}}>
                            一、接受条款
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.text}>
                            1、有福妈妈特别提醒用户，《有福妈妈APP用户协议》（以下简称“本协议”）为您与有福妈妈APP平台经营者之间所订立的契约，具有法律效力。您在注册使用有福妈妈APP提供的各项服务之前，应仔细阅读本协议的各项条款。您一旦注册使用有福妈妈APP服务，即视为您已了解并完全同意本协议各项内容，包括有福妈妈对本协议随时所做的任何修改，并成为有福妈妈APP用户（以下简称“您”或“用户”）。
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        2、用户必须自行准备如下设备和承担如下开支：
                    </Text>
                    <Text style={styles.text}>
                        2.1上网设备，包括但不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；
                    </Text>
                    <Text style={styles.text}>
                        2.2上网开支，包括但不限于网络接入费、上网设备租用费、手机流量费等。
                    </Text>
                    <Text style={styles.text}>
                        3、有福妈妈APP有权不断更新和改进服务，包括增加、删除某项服务或暂停、彻底停止某项服务等。
                    </Text>
                    <Text style={{color:"#000",fontSize:14,fontWeight:"bold",lineHeight:25}}>
                        二、用户注册及使用
                    </Text>
                    <Text style={styles.text}>
                        1、注册资格
                    </Text>
                    <Text style={styles.text}>
                        用户须为能够独立承担法律责任的自然人、法人或其他组织。用户完成注册程序或其他有福妈妈平台同意的方式实际使用本平台服务时，即视为用户确认具备主体资格，能够独立承担法律责任。若因用户不具备主体资格，而导致的一切后果，由用户及其监护人自行承担。
                    </Text>
                    <Text style={styles.text}>
                        2、使用责任
                    </Text>
                    <Text style={styles.text}>
                        用户注册成功，有福妈妈APP将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。
                    </Text>
                    <Text style={styles.text}>
                        3、隐私保护
                    </Text>
                    <Text style={styles.text}>
                        3.1个人隐私信息指可以用于对用户进行个人辨识或涉及个人通信的信息，包括姓名、地址、手机号码、IP 地址，电子邮件地址等个人信息及子女信息。用户同意有福妈妈APP为提供更好的服务，向您搜集姓名、地址、手机号码等个人信息及子女的相关信息，用户保证其提供的注册资料真实、准确、完整、合法有效，用户个人信息如有变动的，应及时更新个人信息。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果。
                    </Text>
                    <Text style={styles.text}>
                        3.2有福妈妈会采取合理的措施保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或用户同意等原因外，有福妈妈未经用户同意不向除合作以外的第三方公开、透露用户个人隐私信息。
                    </Text>
                    <Text style={styles.text}>
                        3.3为了改善有福妈妈APP的技术和服务，我们将可能会收集、使用用户的个人隐私信息，以提供更好的用户体验和服务质量。
                    </Text>
                    <Text style={styles.text}>
                        4、使用规则
                    </Text>
                    <Text style={styles.text}>
                        4.1用户在使用有福妈妈APP服务过程中实施的所有行为均应遵守中华人民共和国法律、法规等规范性文件及有福妈妈APP各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。如果违反前述承诺，产生任何法律后果，用户应以自己的名义独立承担所有的法律责任，并确保有福妈妈免于因此遭受任何损失。
                    </Text>
                    <Text style={styles.text}>
                        4.2用户应该严格遵守有福妈妈APP的一切规则，不得出现恶意注册、恶意点评等违规行为，一经发现，有福妈妈有权取消用户资格，同时该用户须承担由此给有福妈妈带来的所有损失。
                    </Text>
                    <Text style={styles.text}>
                        4.3 用户在使用有福妈妈APP网络服务过程中，必须遵循以下原则：
                    </Text>
                    <Text style={styles.text}>
                        4.3.1 遵守中国有关的法律、法规；
                    </Text>
                    <Text style={styles.text}>
                        4.3.2 不得为任何非法目的而使用网络服务系统；
                    </Text>
                    <Text style={styles.text}>
                        4.3.3 遵守所有与网络服务有关的网络协议、规定和程序；
                    </Text>
                    <Text style={styles.text}>
                        4.3.4不得利有福妈妈网络服务系统进行任何可能对互联网的正常运转造成不利影响的行为；
                    </Text>
                    <Text style={styles.text}>
                        4.3.5 不得传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；
                    </Text>
                    <Text style={styles.text}>
                        4.3.6 不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
                    </Text>
                    <Text style={styles.text}>
                        4.3.7 不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；
                    </Text>
                    <Text style={styles.text}>
                        4.4.有福妈妈保有删除APP内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
                    </Text>
                    <Text style={styles.text}>
                        4.5若用户未遵守以上规定的，有福妈妈有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
                    </Text>
                    <Text style={{color:"#000",fontSize:14,fontWeight:"bold",lineHeight:25}}>
                        三、法律责任与免责声明
                    </Text>
                    <Text style={styles.text}>
                        1、有福妈妈将会尽其商业上的合理努力以保护用户的设备资源及通讯的隐私性和完整性，但是，用户承认和同意有福妈妈不能就此事提供任何保证
                    </Text>
                    <Text style={styles.text}>
                        2、有福妈妈可以根据用户的使用状态和行为，为了改进“有福妈妈APP”的功能、用户体验和服务，开发或调整软件功能。
                    </Text>
                    <Text style={styles.text}>
                        3、有福妈妈为保障业务发展和调整的自主权，有权随时自行修改或中断软件服务而不需通知用户。
                    </Text>
                    <Text style={styles.text}>
                        4、在任何情况下因使用或不能使用“有福妈妈APP”所产生的直接、间接、偶然、特殊及后续的损害及风险，有福妈妈不承担任何责任。
                    </Text>
                    <Text style={styles.text}>
                        5、有福妈妈不对有福妈妈APP所涉及的技术及信息的有效性、准确性、可靠性、稳定性和及时性作出任何承诺和保证。如因不可抗力或其它有福妈妈无法控制的原因使APP系统崩溃或无法正常使用导致服务中断、数据丟失以及其他的损失和风险的，有福妈妈不承担责任，但有福妈妈将协助处理相关事宜。
                    </Text>
                    <Text style={styles.text}>
                        6、用户应充分理解个体差异与孕产期等各方面因素的不确定性，以及理解有福妈妈APP并非医疗权威，如用户及子女出现非正常指征，应及时就医获得有效诊断，因用户自身原因仅参考“有福妈妈APP”而延误治疗，有福妈妈不承担任何责任。
                    </Text>
                    <Text style={styles.text}>
                        在本协议中未声明的其他一切权利，本报仍归有福妈妈所有。有福妈妈有对本协议的最终解释权利。
                    </Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        color:"#333",fontSize:14,lineHeight:28
    }
})