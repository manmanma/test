/*
包含n个接口请求函数的模块
每个函数返回的都是promise对象
 */
import ajax from './ajax'
export  const reqRegister = user => ajax('/register', user, 'POST')
export  const reqLogin = user => ajax('/login', user, 'POST')
export  const reqUpdateUser = user => ajax('/update', user, 'POST')
export  const reqGetUser = () => ajax('/user')
export  const reqUserList = (type) => ajax('/userlist', {type})
export  const reqMsgList = () => ajax('/msglist')
export  const reqReadMsg = (from) => ajax('/readmsg', {from},'POST')
