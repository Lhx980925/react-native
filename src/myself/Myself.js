import React, { Component } from 'react';
import {View,Text,ScrollView,Image,AsyncStorage,DeviceEventEmitter} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: '更换头像',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从相册中选择图片',
    customButtons: [{ name: 'fb', title: '从Facebook中选择图片' }],
    cancelButtonTitle:'取消',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            avatarSource:{},
            username:''
        }
    }
    componentDidMount(){
        DeviceEventEmitter.addListener('name',(param)=>{
            this.setState({
                username:param
            })
        });
        AsyncStorage.getItem('path').then((res)=>{
            if(res){
                this.setState({
                    avatarSource:{uri:res}
                })
            }else{
                this.setState({
                    avatarSource:require('../../images/kasa.jpg')
                })
            }
        });
        AsyncStorage.getItem('user').then((res)=>{
            let user=JSON.parse(res);
            this.setState({
                username:user.username
            })
        });
    }
    takephoto=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
                AsyncStorage.setItem('path',response.uri);
            }
        });
    }

    out=()=>{
        AsyncStorage.removeItem('user').then(()=>{
            Actions.login();
        })
    }

    del=()=>{
        AsyncStorage.removeItem('isInstall');
    }
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{height:250,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center'}}>
                        <Button onPress={this.takephoto}>
                            <Image source={this.state.avatarSource} style={{width:130,height:130,borderRadius:65,borderWidth:2,borderColor:'#fff'}}/>
                        </Button>
                        <Text style={{color:'#fff',fontSize:20,marginTop:10}}>{this.state.username}</Text>
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <Button>
                            <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#eeeeee'}}>
                                <Icon style={{marginLeft:20}} name="user" size={30}/>
                                <Text style={{marginLeft:10}}>我的个人中心</Text>
                            </View>
                        </Button>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="setting" size={30}/>
                                        <Text style={{marginTop:10}}>账户管理</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="eye" size={30}/>
                                        <Text style={{marginTop:10}}>收货地址</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="idcard" size={30}/>
                                        <Text style={{marginTop:10}}>我的信息</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="profile" size={30}/>
                                        <Text style={{marginTop:10}}>我的订单</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="qrcode" size={30}/>
                                        <Text style={{marginTop:10}}>我的二维码</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="pay-circle" size={30}/>
                                        <Text style={{marginTop:10}}>我的积分</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>
                        <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                            <Button>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="star" size={30}/>
                                    <Text style={{marginTop:10}}>我的收藏</Text>
                                </View>
                            </Button>
                        </View>
                    </View>
                    <View View style={{backgroundColor:'white',marginTop:10}}>
                        <Button>
                            <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#eeeeee'}}>
                                <Icon style={{marginLeft:20}} name="tag" size={30}/>
                                <Text style={{marginLeft:10}}>E族活动</Text>
                            </View>
                        </Button>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="tool" size={30}/>
                                        <Text style={{marginTop:10}}>居家维修保养</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="car" size={30}/>
                                        <Text style={{marginTop:10}}>出行接送</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="user" size={30}/>
                                        <Text style={{marginTop:10}}>我的受赠人</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="home" size={30}/>
                                        <Text style={{marginTop:10}}>我的住宿优惠</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="flag" size={30}/>
                                        <Text style={{marginTop:10}}>我的活动</Text>
                                    </View>
                                </Button>
                            </View>
                            <View style={{width:'33%',height:100,justifyContent:'center',alignItems:'center'}}>
                                <Button onPress={()=>Actions.publish()}>
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="form" size={30}/>
                                        <Text style={{marginTop:10}}>我的发布</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems:'center',height:50,justifyContent:'center',flexDirection:'row'}}>
                        <Text style={{color:'#f23030'}}>{this.state.username} | </Text>
                        <Button onPress={this.out} style={{color:'#f23030',fontSize:14}}>退出</Button>
                    </View>
                    <Button onPress={this.del} style={{fontSize:14}}>清除引导页状态</Button>
                </ScrollView>
            </View>
        )
    }

    componentWillUnmount(){
        DeviceEventEmitter.remove();
    };
}