import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
  static propTypes= {
    userList:PropTypes.array.isRequired
  }
  render(){
    const {userList} = this.props
    return (
      <WingBlank className='margin'>
        <QueueAnim type='left'>
        {userList.map((user,index)=>
          <div key={index}>
            <WhiteSpace/>
            <Card  onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
              <Header
                thumb={require(`../../assets/images/${user.header?user.header:'头像1'}.png`)}
                extra={user.username}
              />
              <Body>
              {user.post ? <div>职位: {user.post}</div> : ''}
              {user.company ? <div>公司: {user.company}</div> : ''}
              {user.salary ? <div>月薪: {user.salary}</div> : ''}
              {user.info ? <div>描述: {user.info}</div> : ''}
              </Body>
            </Card>
          </div>
        )}
        </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList);