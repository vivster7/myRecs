import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
  render() {

    const { isCloseButton } = this.props;

    return (
      <button style={{
          fontSize: '150%',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          border: 'hidden',
          color: 'white',
          position: 'absolute',
          top: isCloseButton ? '65px' : '50px',
          right: isCloseButton ? '-20px' : '',
          transform: isCloseButton ? 'rotate(45deg)' : 'rotate(0deg)',
          background: isCloseButton ? 'red' : 'green',
        }}
        onClick={this.props.action}>
        +        
      </button>
    )
  }
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  isCloseButton: PropTypes.bool,
}


