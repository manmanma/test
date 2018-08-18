import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_CHAT_MSG, RECEIVE_CHAT_MSGS, MSG_READ} from "./action-type";
import {getRedirectPath} from '../utils'
const initUser = {
  username: '', // 用户名
  type: '', // 类型
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动跳转的路由path
}
function user(state= initUser,action) {
  switch (action.type){
    case AUTH_SUCCESS://认证成功
      const user=action.data
      //debugger
      //console.log(user)
      return {...user,redirectTo: getRedirectPath(user.type,user.header)}
    case ERROR_MSG://错误信息提示
      return {...state,msg: action.data}
    case RECEIVE_USER://接收用户
      return action.data
    case RESET_USER://重置用户
      return {...initUser, msg: action.data}
    default:
      return state;
  }
}
const initUserList = []
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}
const initChatMsgs = {
  users: {}, // 所有用户信息对象的对象容器: key是user的_id, value是{username, header}
  chatMsgs: [], // 当前用户相关的所有chatMsg的数组
  unReadCount: 0, // 总的未读数量
}
function chats(state = initChatMsgs,action) {
  switch (action.type){
    case RECEIVE_CHAT_MSGS:
      var {users, chatMsgs, myId} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal,msg)=> preTotal + (!msg.read && msg.to===myId ? 1 : 0),0),
      }
    case RECEIVE_CHAT_MSG:
      var {chatMsg, myId} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===myId ? 1: 0),
      }
    case MSG_READ:
      const {count,targetId,myId} = action.data
      return {
        users: state.users,
        // 将哪些msg的read从false变为true
        chatMsgs: state.chatMsgs.map(msg=> {
          if (msg.from === targetId && msg.to === myId && !msg.read ) {
            return {...msg,read:true}
          }else{
            return msg
          }
        }),
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}
export default combineReducers({
  user,
  userList,
  chats
});