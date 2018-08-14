import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {WingBlank,WhiteSpace,NavBar,List,InputItem,Button} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {login} from "../../redux/actions";

class Login extends Component{
  state = {
    username: '',
    password: ''
  }
  handleChange = (name,val)=>{
    this.setState({
      [name]: val
    })
  }
  toRegister = ()=>{
    this.props.history.replace('register')
  }
  login = ()=>{
    this.props.login(this.state)
    /*reqLogin(this.state).then(response=>{
      console.log(response.data)
    })*/
  }
  render(){
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar type='primary'>用户登录</NavBar>
        <WhiteSpace/>
        <Logo />
        <WhiteSpace/>
        <WingBlank>
          <List>
            {msg ? <p style={{color:'red',textAlign:'center'}}>{msg}</p> : null}
            <InputItem type="text" placeholder='请输入用户名' onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder='请输入密码' onChange={(val)=>this.handleChange('password',val)}>密码：</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;录</Button>
            <Button onClick={this.toRegister}>还没有账号?去注册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect(
  state => ({user:state.user}),
  {login}
)(Login)
