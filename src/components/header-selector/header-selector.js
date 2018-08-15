import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Grid, List} from 'antd-mobile'
class HeaderSelector extends Component{
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }
  state = {
    icon: null, // 当前选择的头像图片对象
  }
  constructor(props){
    super(props)
    this.headerList = []
    for(var i=0;i<20;i++){
      let text=`头像${i+1}`
      let icon= require(`../../assets/images/${text}.png`)
      this.headerList.push({icon,text})
    }
  }
  selectHeader = ({icon,text}) =>{
    // 设置当前头像图片对象
    this.setState({icon})
    // 设置头像名称
    this.props.setHeader(text)
  }
  render(){
    const {icon} = this.state
    // 根据状态中的icon决定显示的头部界面
    const head = icon ? <div>已选择头像:<img src={icon} alt='headIcon'/></div>  : '请选择头像'
    return (
      <div>
        <List renderHeader={ ()=>head }>
          <Grid data={this.headerList}
                columnNum={5}
                onClick={this.selectHeader}
          />
        </List>
      </div>
    );
  }
}
export default HeaderSelector;