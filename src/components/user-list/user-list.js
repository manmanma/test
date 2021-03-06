import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
  static propTypes= {
    userList:PropTypes.array.isRequired
  }
  render(){
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom:50,marginTop:50}}>
        {userList.map((user,index)=>
          <div key={index} onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
            <WhiteSpace/>
            <Card>
              <Header
                thumb={require(`../../assets/images/${user.header}.png`)}
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

      </WingBlank>
    )
  }
}
export default withRouter(UserList);