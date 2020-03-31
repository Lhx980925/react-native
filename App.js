import React,{useState,useEffect} from 'react';
import {View,AsyncStorage} from 'react-native';
import {Router,Scene,Tabs,Modal,Overlay,Lightbox} from 'react-native-router-flux';
import {Icon} from '@ant-design/react-native';
import List from 'react-native-cli/myApp/src/list/List';
import Service from 'react-native-cli/myApp/src/home/Service';
import Myself from 'react-native-cli/myApp/src/myself/Myself';
import Publish from 'react-native-cli/myApp/src/myself/Publish';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Join from './src/common/Join';

console.disableYellowBox=true;

const App = () => {
    let [isLogin,setLogin]=useState(false);
    let [isFirstInstall,setFirstInstall]=useState(true);

    let init=()=>{
        AsyncStorage.getItem('isInstall').then((res)=>{
            if(res){
                setFirstInstall(false);
            }
        })
      
        AsyncStorage.getItem('user').then((res)=>{
            console.log(res);
            let user=JSON.parse(res);
            if(!user){ //根据返回状态进行判断，正确时跳转首页
                SplashScreen.hide();
            }
            if(user&&user.token){
                setLogin(true);
                SplashScreen.hide();
            }
        })
    }
    useEffect(()=>{
        init();
    },[])

    let afterInstall=()=>{
        setFirstInstall(false)
    }
    if(isFirstInstall){
        return <View style={{flex:1}}>
            <SwiperPage afterInstall={afterInstall}/>
        </View>
    }

    return (
        <Router 
            backAndroidHandler={()=>{
                if(Actions.currentScene != 'hom'){
                Actions.pop();
                return true;
                }else{
                    if(new Date().getTime()-now<2000){
                        BackHandler.exitApp();
                    }else{
                        ToastAndroid.show('确定要退出吗',100);
                        now = new Date().getTime();
                        return true;
                    }
                }
            }}
        >
            <Overlay>
                <Modal key="modal" hideNavBar>
                    <Lightbox key="lightbox">
                        <Scene key="root">
                            {/* 实现 Tabs */}
                            <Tabs key='tabbar' hideNavBar 
                            activeTintColor='#f23030' inactiveTintColor='#979797' 
                            tabBarStyle={{backgroundColor:'#ffffff'}}>
                                {/* 服务 */}
                                <Scene key='home' hideNavBar title='首页' icon={({focused})=>
                                <Icon color={focused?'#f23030':'#979797'} name="home" size={25}/>} component={Service}/>
                                {/* 商品分类 */}
                                <Scene key='list' hideNavBar hideDrawerButton title='商品分类' icon={({focused})=>
                                <Icon color={focused?'#f23030':'#979797'} name="appstore" size={25}/>} component={List}/>
                                {/* 个人中心 */}
                                <Scene key='myself' hideNavBar hideDrawerButton title='个人中心' icon={({focused})=>
                                <Icon color={focused?'#f23030':'#979797'} name="user" size={25}/>}>
                                    <Scene key='my' component={Myself}/>
                                    <Scene key='publish' hideTabBar component={Publish}/>
                                </Scene>
                            </Tabs>
                        </Scene>
                    </Lightbox>
                    <Scene initial={!isLogin} key="login" component={Login}/>
                    <Scene key='join' component={Join}/>
                </Modal>
            </Overlay>
        </Router>
    );
};

export default App;