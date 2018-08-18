import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/actions'
const Item = List.Item

class Chat extends Component {
  state ={
    content: '',
    isShow:false
  }
  sendMsg = ()=>{
    //发送者id
    const from = this.props.user._id//我的id
    //目标用户id
    const to = this.props.match.params.userid
    const {content}= this.state
    if(!content.trim()) {
      return
    }
    this.props.sendMsg({from,to,content})
    // 清空输入
    this.setState({content: '',isShow: false})
  }
  componentWillMount () {
    this.emojis = ['😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤',
      '😃', '😁', '😂', '😅', '😐', '😍', '❤']
    this.emojis = this.emojis.map(value => ({text: value}))

  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate () {
    console.log(123)
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount(){
    const myId = this.props.user._id// 我的id
    const targetId = this.props.match.params.userid//目标用户id
    this.props.readMsg(targetId,myId)
  }
  toggleEmojis = ()=>{
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow){
      setTimeout(() =>{
        window.dispatchEvent(new Event('resize'))
      },0)
    }
  }
  render () {
    const {user} = this.props
    const myId = user._id// 我的id
    const targetId = this.props.match.params.userid//目标用户id
    const chatId = [myId, targetId].sort().join('_') // 当前聊天的ID
    const {users,chatMsgs} = this.props.chats
    // users数据还没有获取到, 只能显示loading
    if(!users[myId]){
      return <div>loading</div>
    }
    // 从chatMsgs中过滤出我与当前目标用户的聊天
    const msgs = chatMsgs.filter((msg)=> msg.chat_id===chatId)
    // 目标用户的头像图片对象
    const targetIcon = require(`../../assets/images/${users[targetId].header}.png`)
    return (
      <div id='chat-page'>
        <NavBar
          className='fix-top'
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
        >{users[targetId].username}</NavBar>
        <List className='margin'>
          {msgs.map((msg,index)=>{
            if(msg.to===myId) { // 别人发给我的
              return (<Item
                key={msg._id}
                thumb={targetIcon}
              >
                {msg.content}
              </Item>)
            }else{
              return (
                <Item
                  key={msg._id}
                  className='chat-me'
                  extra='我'
                >
                  {msg.content}
                </Item>
              )
            }
          })}
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val=>this.setState({content:val})}
            onFocus={() => this.setState({isShow: false})}//获取焦点隐藏表情
            value={this.state.content}
            extra={
              <span>
                <span onClick={this.toggleEmojis} style={{marginRight: 10}}>😃</span>
                <span onClick={this.sendMsg}>发送</span>
              </span>
            }
          />
          {this.state.isShow
          ?(
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})
                }}
              />
            )
          : null}
        </div>
      </div>

    )
  }
}

export default connect(
  state => ({user: state.user, chats: state.chats}),
  {sendMsg,readMsg}
)(Chat)