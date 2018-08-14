import React,{Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import Message from '../message/message';
import UserCenter from '../user-center/user-center';
import NavFooter from '../../components/nav-footer/nav-footer';
import NotFound from '../../components/not-found/not-found'
import {getUser} from "../../redux/actions";
import Cookies from 'js-cookie'
import {getRedirectPath} from '../../utils'
class Main extends Component {
  // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/usercenter', // 路由路径
      component: UserCenter,
      title: '用户中心',
      icon: 'usercenter',
      text: '个人',
    }
  ]
  componentDidMount(){
    // 只有当页面登陆过, 但当前还没有登陆, 才去发请求获取用户信息
    const userId=Cookies.get('userId')
    const {user} = this.props
    if(userId && !user._id){
      this.props.getUser()
    }
  }
  render() {
    // 1). 如果cookie中没有userid, 直接跳转到登陆页面
    const userId=Cookies.get('userId')
    if(!userId){
     return  <Redirect to='/login' />
    }
    // 2). state中的user中没有_id, 发请求获取当前用户信息
    const {user} = this.props
    if(!user._id){
      return <div>LOADING...</div>
    }
    // 得到当前请求的path
    const path = this.props.location.pathname
    //3). 判断请求的路径是否是/
    if(path==='/'){
      // 根据当前用户的相关信息, 自动跳转对应的界面
      return <Redirect to={getRedirectPath(user.type,user.header)}/>
    }
    // 4.得到当前导航的信息对象
    // find()返回的是第一次回调函数返回true的对应的元素, 如果没有一匹配的, 返回undefined
    const currentNav = this.navList.find((nav, index) => nav.path===path)
    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : ''}
        <Switch>
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route path='/laobaninfo' component={LaobanInfo} />

          <Route path='/laoban' component={Laoban} />
          <Route path='/dashen' component={Dashen} />
          <Route path='/message' component={Message} />
          <Route path='/usercenter' component={UserCenter} />
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter/> : ''}
      </div>
    );
  }
}
export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main)
