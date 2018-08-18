import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
class NavFooter extends Component{
  static propTypes={
    navList:PropTypes.array.isRequired,
    unReadCount:PropTypes.number.isRequired
  }
  render(){
    const path = this.props.location.pathname
    const navList = this.props.navList.filter(nav=>!nav.hide)
    return (
      <TabBar>
        {
          navList.map((nav,index)=>(
          <TabBar.Item key={index}
                       badge={nav.path==='/message' ? this.props.unReadCount : 0}
                       icon={{uri:require(`../../assets/nav/${nav.icon}.png`)}}
                       selectedIcon={{uri:require(`../../assets/nav/${nav.icon}-selected.png`)}}
                       title={nav.title}
                       selected={path===nav.path}
                       onPress={()=>{this.props.history.replace(nav.path)}}
          />

        ))
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter);