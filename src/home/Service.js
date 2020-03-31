import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';

const {width}=Dimensions.get('window');
const s=width/640;

export default class Home extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.search}>
                            <Icon style={{color:'white',marginLeft:10}} name="search"/>
                            <TextInput style={{width:490*s,height:50*s,padding:0,paddingLeft:10,color:'white'}} 
                            placeholder="请输入您要搜索的关键字"/>
                        </View>
                        <Icon style={{color:'white',marginLeft:10}} name="shop" size={30}/>
                    </View>
                    <View style={{height:250}}>
                        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
                            <View style={styles.slide1}>
                                <Image style={{height:250,width:490}} source={require('../../images/lunbo.png')}/>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={{height:250,width:490}} source={require('../../images/lunbo.png')}/>
                            </View>
                            <View style={styles.slide3}>
                                <Image style={{height:250,width:490}} source={require('../../images/lunbo.png')}/>
                            </View>
                        </Swiper>
                    </View>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:80,marginTop:10}}>
                            <Button>
                                <Image source={require('../../images/fuwu1.png')} style={{height:70,width:70,marginLeft:10}}/>
                                <Text style={{marginLeft:20,fontSize:17}}>居家维修保养</Text>
                                <Icon style={{marginLeft:230}} name="right"/>
                            </Button>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:80,marginTop:10}}>
                            <Button>
                                <Image source={require('../../images/fuwu2.png')} style={{height:70,width:70,marginLeft:10}}/>
                                <Text style={{marginLeft:20,fontSize:17}}>住宿优惠</Text>
                                <Icon style={{marginLeft:262}} name="right"/>
                            </Button>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:80,marginTop:10}}>
                            <Button>
                                <Image source={require('../../images/fuwu3.png')} style={{height:70,width:70,marginLeft:10}}/>
                                <Text style={{marginLeft:20,fontSize:17}}>出行接送</Text>
                                <Icon style={{marginLeft:262}} name="right"/>
                            </Button>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:80,marginTop:10}}>
                            <Button>
                                <Image source={require('../../images/fuwu4.png')} style={{height:70,width:70,marginLeft:10}}/>
                                <Text style={{marginLeft:20,fontSize:17}}>E族活动</Text>
                                <Icon style={{marginLeft:267}} name="right"/>
                            </Button>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Button style={{width:350,height:50,backgroundColor:'#f23030',textAlignVertical:'center',color:'#fff',borderRadius:10,marginTop:15}}>
                            发布需求
                        </Button>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                            <Icon style={{color:'#818181'}} name="copyright"/>
                            <Text style={{color:'#818181'}}>E族之家 版权所有</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    header:{
        height:70*s,
        backgroundColor:'#f23030',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    search:{
        width:528*s,
        height:50*s,
        borderRadius:25*s,
        backgroundColor:'#fbb8b8',
        flexDirection:'row',
        alignItems:'center'
    }
}) 