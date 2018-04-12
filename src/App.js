import React, { Component } from 'react';
import Header from './include/Header';
import Login from './views/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Login/>

      </div>
    );
  }
}

export default App;
