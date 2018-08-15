import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, Button, WhiteSpace, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
class UserCenter extends Component {
  logout = ()=>{
    Modal.alert('退出', '确认退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确认',
        onPress: () => {
          // 删除cookie中的userid
          Cookies.remove('userId')
          // 重置state中的user
          this.props.resetUser()
        }
      }
    ])
  }
  render () {
    const {username,post,info,header,salary, company} = this.props.user
    return (
      <div style={{marginBottom:50,marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />
        <List renderHeader={() => '相关信息'}>
          <List.Item multipleLine>
            {post ?<List.Item.Brief>职位: {post}</List.Item.Brief> : ''}
            {info ? <List.Item.Brief>简介: {info}</List.Item.Brief> : '' }
            {salary ? <List.Item.Brief>薪资: {salary}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>

      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {resetUser}
)(UserCenter)