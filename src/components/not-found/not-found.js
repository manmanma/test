import React,{Component} from 'react';
class NotFound extends Component{
  render(){
    return (
      <div>
        <h3>找不到页面<a onClick={() => this.props.history.replace("/")}>返回首页</a></h3>

      </div>
    )
  }
}
export default NotFound;