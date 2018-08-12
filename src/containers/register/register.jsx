import React,{Component} from 'react'
import {WingBlank,WhiteSpace,NavBar,List,InputItem,Radio,Button} from 'antd-mobile'
import Logo from '../../components/logo/logo'
export default class Register extends Component{
  state = {
    username: '',
    password: '',
    rePassword: '',
    type: 'dashen'
  }
  handleChange = (name,val)=>{
    this.setState({
      [name]: val
    })
  }
  toLogin = ()=>{
    this.store.history.replace('login')
  }
  register = ()=>{
    console.log(this.state)
  }
  render(){
    const {type} = this.state;
    return (
      <div>
        <NavBar type='primary'>用户注册</NavBar>
        <WhiteSpace/>
        <Logo />
        <WhiteSpace/>
        <WingBlank>
        <List>
          <InputItem type="text" placeholder='请输入用户名' onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder='请输入密码' onChange={(val)=>this.handleChange('password',val)}>密码：</InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder='请再输入密码' onChange={(val)=>this.handleChange('rePassword',val)}>确认密码：</InputItem>
          <WhiteSpace/>
          <List.Item>
            用户类型：&nbsp;&nbsp;
            <Radio cheked={type==='dashen'} onChange={()=>this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio cheked={type==='laoban'} onChange={()=>this.handleChange('type','laoban')}>老板</Radio>
          </List.Item>
          <WhiteSpace/>
          <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;册</Button>
          <Button onClick={this.toLogin}>已有账号</Button>
        </List>
        </WingBlank>
      </div>
    );
  }
}