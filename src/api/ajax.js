import axios from 'axios'
export default function ajax(url= '',data= {},type= 'GET'){
  if(type==='GET'){
    //处理url
    let urlData= ''
    Object.keys(data).forEach( key =>{
      urlData+= key + '=' + data[key] + '&'
    })
    if(urlData!==''){
      //urlData = urlData.substring(0,urlData.lastIndexOf('&'))
      urlData = urlData.substring(0,urlData.length-1)
      url+= '?' + urlData
    }
    return axios.get(url)
  }else if(type==='POST'){
    return axios.post(url,data)
  }
}