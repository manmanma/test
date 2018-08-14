import {AUTH_SUCCESS,ERROR_MSG} from "./action-type";
import {reqLogin,reqRegister} from "../api/index";
//错误信息
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
const authSuccess = (data) => ({type:AUTH_SUCCESS,data:data})
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