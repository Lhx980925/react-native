import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput, 
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';
import Button from 'react-native-button';

export default class Login extends Component {
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
  login = ()=>{
    if(this.state.username==''){
      Alert.alert('用户名输入错误!','用户名不能为空!')
    }else if(this.state.pwd==''){
      Alert.alert('密码输入错误!','密码不能为空!')
    }else{
      this.setState({
        isloading:true
      })
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd
      }).then(res=>{
        AsyncStorage.setItem('user',JSON.stringify(res.data));
        AsyncStorage.getItem('users')
        .then((res)=>{
          if(res){
            let user=JSON.parse(res);
            if(this.state.username==user.username && this.state.pwd==user.pwd){
              this.setState({
                isloading:false
              })
              Actions.home();
              DeviceEventEmitter.emit('name',this.state.username);
            }else{
              this.setState({
                isloading:false
              })
              Alert.alert('用户名或密码错误!','请重新输入!')
            }
          }else{
            this.setState({
              isloading:false
            })
            Alert.alert('帐号不存在!','请先进行注册哦!')
          }
        })
      })
    }
  } 
    
  render() {
    let now=0;
    BackHandler.addEventListener('back',()=>{
      if(new Date().getTime()-now<2000){
        BackHandler.exitApp();
      }else{
        ToastAndroid.show('确定要退出吗',2000);
        now = new Date().getTime();
      }
      return true;
    });
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View style={{ alignItems: 'center'}}>
          <Text style={{fontSize:30,marginBottom:50}}>用户登录</Text>
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
            onPress={this.login}>
            <Text>登录</Text>
          </TouchableOpacity>
        </View>
        {
            this.state.isloading?
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text>正在登录</Text>
                <ActivityIndicator size='large' color='red'/>
            </View>:null
        }
        <Button onPress={()=>Actions.join()} style={{marginTop:10}}>注册</Button>
      </View>
    );
  }
}