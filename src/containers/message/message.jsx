import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
const Brief = Item.Brief
class Message extends Component {
  getChatMsgs = (chatMsgs, myId)=>{
    /*
  从chatMsgs中找出每个聊天中的最后一个msg组成的数组
  1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
  2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中
  3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
  4. 对lastMsgs数组进行排序
   */
    //创建一个容器对象
    const lastMsgObjs = {}
    //遍历数组
    chatMsgs.forEach((msg)=>{
      //对当前msg进行统计
      if(!msg.read && msg.to===myId){
        msg.unReadCount=1
      }else{
        msg.unReadCount=0
      }
      const chatId = msg.chat_id
      //获取当前组的lastMsg
      const lastMsg = lastMsgObjs[chatId]
      if(!lastMsg){//当前msg是当前组的最后的lastmsg
        lastMsgObjs[chatId] = msg
      }else{//同组有两条msg比较哪条的时间更晚
        //统计之前的未读消息shul
        const unReadCount = msg.unReadCount + lastMsg.unReadCount
        if(msg.create_time > lastMsg.create_time){
          lastMsgObjs[chatId] = msg
        }
        //为lastMsgs更新未读
        lastMsgObjs[chatId].unReadCount = unReadCount
      }
    })
    //根据key取出所有数组的val
    const lastMsgs = Object.values(lastMsgObjs)
    //排序
    lastMsgs.sort((msg1,msg2)=>{// 如果结果大于0, 后面排到前面
      return msg2.create_time > msg1.create_time//降序
    })
    return lastMsgs
  }
  render () {
    const myId = this.props.user._id
    const {users, chatMsgs} = this.props.chats
    const lastMsgs = this.getChatMsgs(chatMsgs, myId)
    return (
      <div>
        <List className='margin'>
          <QueueAnim type='top'>
          {lastMsgs.map((msg,index)=>{
            //得到目标用户的id
            const targetId = myId === msg.from ? msg.to : msg.from
            const targetUser = users[targetId]
            return  < Item
                        key={msg._id}
                        extra={<Badge text={msg.unReadCount}/>}
                        thumb={require(`../../assets/images/${targetUser.header}.png`)}
                        arrow='horizontal'
                        onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                    >
                      {targetUser.username}
                      <Brief>{msg.content}</Brief>
                  </Item>
          }
          )
          }
          </QueueAnim>
        </List>

      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chats: state.chats}),
  {}
)(Message)