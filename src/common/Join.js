import React, { Component } from 'react';
import {View,Text,TextInput,TouchableOpacity,AsyncStorage,Alert,ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import { Icon } from '@ant-design/react-native';
import {myFetch} from '../utils';

export default class Join extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    join = ()=>{
        if(this.state.username==''){
            Alert.alert('用户名输入错误!','用户名不能为空!')
        }else if(this.state.pwd==''){
            Alert.alert('密码输入错误!','密码不能为空!')
        }else{
            this.setState({
                isloading:true
            })
            myFetch.post('/join',{
                username:this.state.username,
                pwd:this.state.pwd
            }).then(res=>{
                if(res.data.token==1){
                    this.setState({
                        isloading:false
                    })
                    Alert.alert('用户名输入错误!','该用户名已存在!');
                }else{
                    Alert.alert('注册成功!','转回登录页面!');
                    AsyncStorage.setItem('users',JSON.stringify(res.data))
                    .then(()=>{
                        this.setState({
                            isloading:false
                        })
                        Actions.login();
                    })
                }
            })
        }
    } 
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize:30,marginBottom:50}}>用户注册</Text>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput placeholder="用户名" 
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="eye" color="red"/>
                        <TextInput 
                            onChangeText={this.pwdhandle}
                            placeholder="密码" 
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.join}>
                        <Text>注册</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isloading?
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text>正在注册</Text>
                        <ActivityIndicator size='large' color='red'/>
                    </View>:null
                }
                <Button onPress={()=>Actions.pop()} style={{marginTop:10}}>返回</Button>
            </View>
        )
    }
}
