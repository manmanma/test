import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST} from "./action-type";
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
export default combineReducers({
  user,
  userList
});