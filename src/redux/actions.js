// 引入客户端io
import io from 'socket.io-client'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER, RECEIVE_USER_LIST} from "./action-type";
import {reqLogin, reqRegister, reqUpdateUser, reqGetUser,reqUserList} from "../api/index";

//错误信息
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
const authSuccess = (data) => ({type:AUTH_SUCCESS,data:data})
// 接收用户信息的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户信息
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表信息的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
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

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:8000')
//接收服务器发过来的消息
socket.on('receiveMessage',(chatMsg)=>{
  console.log('浏览器接收到服务器返回的信息',chatMsg)
})
export function sendMsg({content,from,to}) {
  return dispatch =>{
    // 浏览器向服务器发消息
    socket.emit('sendMessage',{content,from,to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}