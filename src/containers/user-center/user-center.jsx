import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserCenter extends Component {
  render () {
    return (
      <div>UserCenter</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(UserCenter)