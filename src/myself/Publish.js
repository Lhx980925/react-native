import React, { Component } from 'react';
import {View,Text,StyleSheet,ToastAndroid,ActivityIndicator} from 'react-native';
import {Icon} from '@ant-design/react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Publish extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            page:1,
            isloading:true
        }
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+this.state.page)
        .then((res)=>res.json())
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                if(Math.floor(Math.random()*2)==0){
                    res.data[i]['judge']="已回复"
                }else{
                    res.data[i]['judge']="待回复"
                }
            }
            this.setState({data:res.data,isloading:false});
        })
    }
    upPage=()=>{
        if(this.state.page>1){
            fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+Number(this.state.page-1))
            .then((res)=>res.json())
            .then((res)=>{
                for(var i=0;i<res.data.length;i++){
                    if(Math.floor(Math.random()*2)==0){
                        res.data[i]['judge']="已回复"
                    }else{
                        res.data[i]['judge']="待回复"
                    }
                }
                this.setState({data:res.data,page:this.state.page-1});
            })
        }else{
            ToastAndroid.show('到头了哦,不能再往上翻啦QAQ',100);
        }
    }
    nextPage=()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+Number(this.state.page+1))
        .then((res)=>res.json())
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                if(Math.floor(Math.random()*2)==0){
                    res.data[i]['judge']="已回复"
                }else{
                    res.data[i]['judge']="待回复"
                }
            }
            this.setState({data:res.data,page:this.state.page+1});
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.header}>
                    <View style={{width:'10%',alignItems:'center'}}>
                        <Button onPress={()=>Actions.pop()}>
                            <Icon name="left" style={{color:'#fff'}}/>
                        </Button>
                    </View>
                    <View style={{width:'80%',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:20}}>我的发布</Text>
                    </View>
                    <View style={{width:'10%',alignItems:'center'}}>
                        <Icon name="ellipsis" style={{color:'#fff'}} size={30}/>
                    </View>
                </View>
                {
                    this.state.isloading?
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size='large' color='red'/>
                    </View>:null
                }
                {
                    this.state.data.map((item)=>(
                        <View style={{flexDirection:'row',borderBottomColor:'#e8e8e8',borderBottomWidth:1/3,height:30,alignItems:'center'}}>
                            <View style={{width:"50%"}}>
                                <Text style={{marginLeft:10}}>{item.title.length>15?item.title.substring(0,15)+'...':item.title}</Text>
                            </View>
                            <View style={{width:"40%"}}>
                                <Text style={{marginLeft:70}}>{item.create_at.substring(0,10)}</Text>
                            </View>
                            <View style={{width:"10%"}}>
                                <Text style={{color:item.judge=='待回复'?'red':'black'}}>{item.judge}</Text>
                            </View>
                        </View>
                    ))
                }
                <View style={{flexDirection:'row',height:70,alignItems:'center'}}>
                    <View style={{width:"40%",alignItems:'center'}}>
                        <Button onPress={this.upPage} style={styles.btn}>上一页</Button>
                    </View>
                    <View style={{width:"20%",alignItems:'center'}}>
                        <Text>第{this.state.page}页</Text>
                    </View>
                    <View style={{width:"40%",alignItems:'center'}}>
                        <Button onPress={this.nextPage} style={styles.btn}>下一页</Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    header:{
        height:50,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1/3,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'red'
    },
    btn:{
        width:100,
        height:30,
        borderRadius:15,
        backgroundColor:'red',
        textAlignVertical:'center',
        color:'#fff'
    }
});