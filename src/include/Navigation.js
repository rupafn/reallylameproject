import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class Navigation extends Component {
  render() {
    return (

        <nav className="nav nav-masthead nav-wrapper ">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link " href="login">Login</a>
          </nav>

    );
  }
}

export default Navigation;
