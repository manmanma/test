import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {List,InputItem,WingBlank,TextareaItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
class DashenInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 个人简介
    post: '', // 求职岗位
  }
  setHeader = (header)=>{
    this.setState({header})
  }
  handleChange = (name,val) => {
    this.setState({[name]: val})
  }
  updateUserInfo = ()=>{
    this.props.updateUser(this.state)
  }
  render(){
    // 如果用户的信息已经完善, 跳转到/laoban
    const {header} = this.props.user
    if(header) {
      return <Redirect to='/dashen'/>
    }
    return (
      <div>
        <WingBlank>
          <HeaderSelector setHeader={this.setHeader} />
          <List>
            <InputItem type="text" onChange={val => this.handleChange('post',val)}>
              求职岗位:</InputItem>
            <TextareaItem title="个人介绍:"
                          rows={3}
                          onChange={val=> this.handleChange('info',val)}
            />
            <Button type='primary' onClick={this.updateUserInfo}>保存</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser}
)(DashenInfo);