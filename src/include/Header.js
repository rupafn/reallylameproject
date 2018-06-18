import React, { Component } from 'react';
import logo from '../logo.png';
import '../css/App.css';
import Navigation from './Navigation'

class Header extends Component {
  render() {
    return (

        <header className="App-header">

          <Navigation restorePlaces= {this.props.restorePlaces}/>
        </header>

    );
  }
}

export default Header;
