import React, { Component } from 'react';
import {View,Text,Image,StyleSheet,AsyncStorage,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
    start=()=>{
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall();
        });
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Image source={require('../../images/slide1.jpg')} style={styles.image}/>
                </View>
                <View style={styles.slide2}>
                    <Image source={require('../../images/slide2.jpg')} style={styles.image}/>
                </View>
                <View style={styles.slide3}>
                    <Image source={require('../../images/slide3.jpg')} style={styles.image}/>
                    <TouchableOpacity style={styles.start}  onPress={this.start}>
                        <Text style={{color: '#fff'}}>开始体验</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        )
    }
}

const styles=StyleSheet.create({
    wrapper:{},
    slide1: {
        flex: 1,
        height:'100%',
        alignItems: 'center'
    },
    slide2: {
        flex: 1,
        height:'100%',
        alignItems: 'center'
    },
    slide3: {
        flex: 1,
        height:'100%',
        alignItems: 'center'
    },
    start:{
        position: 'absolute',
        bottom: 100,
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 20
    },
    image:{
        width:'100%',
        height:'100%'
    }
})