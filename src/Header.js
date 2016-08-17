import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1> My Records Viewer </h1>
        <a style={{float: 'right'}} href="/authorize" target="_blank">Login</a>
        {this.props.children}
      </header>
    );
  }
}

Header.propTypes = {}


