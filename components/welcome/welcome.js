import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    View,
    AsyncStorage
} from 'react-native';

let image1 = require('./yindao1.jpg');
let image2 = require('./yindao2.jpg');
let image3 = require('./yindao3.jpg');

var {width} = Dimensions.get('window')
var {height} = Dimensions.get('window')
export default class Welcome extends Component {
    static navigationOptions = {
        title: 'Welcome',
        header:null
    };
    constructor() {
        super();
        this.state={

        }
    };
    componentDidMount(){

    }
    render() {
        return (
            <View>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        bounces={false}
                        pagingEnabled={true}
                        horizontal={true}>
                        <Image source={image1} style={styles.backgroundImage} />
                        <Image source={image2} style={styles.backgroundImage} />
                        <Image source={image3} style={styles.backgroundImage} >
                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("Login")}}>
                                <View style={{width:width,alignItems:"center",height:height}}>
                                    <View style={{
                                        width:120,
                                        height:40,
                                        borderColor:"#fff",
                                        borderWidth:1,
                                        borderRadius:20,
                                        justifyContent:"center",
                                        alignItems:"center",
                                        position:"absolute",
                                        bottom:70
                                    }}>
                                        <Text style={{color:"#fff",fontSize:16,backgroundColor:"transparent"}}>立即体验</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Image>
                    </ScrollView>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    contentContainer: {
        width: width*3,
        height:height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
});
