// 引入客户端io
import io from 'socket.io-client'
import {AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSG,
  RECEIVE_CHAT_MSGS,
  MSG_READ} from "./action-type";
import {reqLogin, reqRegister, reqUpdateUser, reqGetUser,reqUserList, reqMsgList, reqReadMsg} from "../api/index";

//错误信息
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
const authSuccess = (data) => ({type:AUTH_SUCCESS,data:data})
// 接收用户信息的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户信息
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表信息的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
// 接收消息列表的同步action
const receiveChatMsgs = ({users, chatMsgs, myId}) => ({type: RECEIVE_CHAT_MSGS, data: {users, chatMsgs, myId}})
// 接收一个消息的同步action
const receiveChatMsg = (chatMsg, myId) => ({type: RECEIVE_CHAT_MSG, data: {chatMsg, myId}})
const msgRead = ({count,targetId,myId}) => ({type: MSG_READ, data: {count,targetId,myId}})
//注册
export  function register({username,password,rePassword,type}) {
  return async dispatch => {
      if(!username || !password ||  !type){
        return dispatch(errorMsg('用户名密码必须输入'))
      }
      if(password!== rePassword){
        return dispatch(errorMsg('两次密码输入不一致'))
      }
      const result= await reqRegister({username,password,type})
      if(result.data.code===0){
        // 异步获取消息列表
        getChatMsgs(dispatch, result.data.data._id)
        //返回正确的信息
        dispatch(authSuccess(result.data.data))
      }else if(result.data.code===1){
        dispatch(errorMsg(result.data.msg))
      }
  }
}
//登录
export function login({username,password}) {
  if(!username || !password ){
    return errorMsg('用户名密码不能为空')
  }
  return async dispatch =>{
    const result = await reqLogin({username,password})
    console.log(result.data)
    if(result.data.code===0){
      // 异步获取消息列表
      getChatMsgs(dispatch, result.data.data._id)
      //返回正确的信息
      dispatch(authSuccess(result.data.data))
    }else if(result.data.code===1){
      //返回失败的信息
      dispatch(errorMsg(result.data.msg))
    }
  }
}
//更新数据
export function updateUser (user) {
  return async dispatch => {
    // 1. 发送异步ajax请求
    const response = await reqUpdateUser(user)
    const result = response.data
    // 2. 根据结果分发同步action
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
//获取异步用户的数据
export function getUser(){
  return async dispatch =>{
    const res = await reqGetUser()
    const result = res.data
    if(result.code===0){
      // 异步获取消息列表
      getChatMsgs(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
}
//获取异步用户列表
export function getUserList(type) {
  return async dispatch =>{
    const res = await reqUserList(type)
    const result = res.data
    if(result.code===0){
      dispatch(receiveUserList(result.data))
    }else{
      dispatch(receiveUserList(result.msg))
    }
  }
}
//发聊天消息的异步action
export function sendMsg({content,from,to}) {
  return dispatch =>{
    // 浏览器向服务器发消息
    io.socket.emit('sendMessage',{content,from,to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}
/*
初始化客户端的socketIO
只有当登陆成功后才能调用
只用执行一次
 */
function initSocketIO(dispatch, myId) {
  io.myId = myId
  if(!io.socket){
    // 连接服务器, 得到代表连接的socket对象
    io.socket = io('ws://localhost:8000')
    //接收服务器发过来的消息
    io.socket.on('receiveMessage', (chatMsg) => {
      console.log('浏览器接收到服务器返回的信息', chatMsg)
      // 只有当是我发的或者是发给我的消息, 分发一个接收chatMsg的同步action
      if(chatMsg.from===io.myId || chatMsg.to===io.myId){
        dispatch(receiveChatMsg(chatMsg,io.myId))
      }
    })

  }
}
/*
异步获取消息列表
要求: 必须在登陆成功后才能执行
 */
async function getChatMsgs(dispatch,myId) {
  initSocketIO(dispatch,myId)
  const res = await reqMsgList()
  const result = res.data
  if(result.code===0){
    const {users, chatMsgs} = result.data
    dispatch(receiveChatMsgs({users, chatMsgs, myId}))
  }
}
/*将未读消息设为已读*/
export function readMsg(targetId,myId){
  return async dispatch =>{
    const res =await reqReadMsg(targetId)
    const result = res.data
    if(result.code===0){
      const count = result.data
      dispatch(msgRead({count,targetId,myId}))
    }
  }
}