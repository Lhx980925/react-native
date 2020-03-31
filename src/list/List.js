import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import {Icon} from '@ant-design/react-native';

const {width}=Dimensions.get('window');
const s=width/640;

const goods=[
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food2.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food2.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        img:require('../../images/food2.png')
    }
]

export default class Test extends Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput style={{width:490*s,height:50*s,padding:0,paddingLeft:10}} 
                        placeholder="请输入商品名称"/>
                        <Icon name="search" size={25}/>
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={{fontSize:17}}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:17}}>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:17}}>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:17}}>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:17}}>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{backgroundColor:"#F4F4F4"}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image resizeMode="contain"
                            style={{height:290*s,marginTop:60*s}} 
                            source={item.img}/>
                            <Text style={{marginTop:20}}>{item.title}</Text>
                            <Text style={{width:'100%',color:'red',marginTop:10}}>
                                36.00
                            </Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    header:{
        height:70*s,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1/3,
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        width:544*s,
        height:50*s,
        backgroundColor:'#EEEEEE',
        flexDirection:'row',
        alignItems:'center'
    },
    nav:{
        height:55*s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    good:{
        width:290*s,
        backgroundColor:'#fff',
        marginLeft:20*s,
        marginTop:20*s,
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20
    }
});