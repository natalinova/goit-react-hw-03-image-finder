import React, { Component } from 'react'

export default class Button extends Component {
    state = {
        amount:''
    }
  handleLoad = () => {
    console.log(this.props)
  this.props.onClick()
}

  render() {
    return (
        <button className='Button' onClick={this.handleLoad}>Load more images</button>
    )
  }
}
