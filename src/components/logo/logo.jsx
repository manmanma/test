import React,{Component} from 'react'
import logo from './images/logo.JPG'
import './logo.less'
export default class Logo extends Component{
  render(){
    return (
      <div className='log-container'>
        <img src={logo} alt="logo" className='logo'/>
      </div>
    );
  }
}