/*
包含n个工具函数的模块
 */
/*
得到跳转的路由路径
/dashen
/laoban
/dashen-info
/laoban-info
 */
export  function getRedirectPath(type,header) {
  let path=''
  if(type==='dashen'){
    path='/dashen'
  }else if(type==='laoban'){
    path='/laoban'
  }
  if(!header){
    path += 'info'
  }
  console.log(path)
  return path;
}