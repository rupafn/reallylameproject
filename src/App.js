import React, { Component } from 'react';
import Header from './include/Header';
import Login from './views/Login';
import LandingPage from './views/Landing';
import Photos from './views/Photos';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (

      <Router>
          <div className="App">
            <Header/>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/photos" component={Photos} />
          </div>
      </Router>

    );
  }
}

export default App;
