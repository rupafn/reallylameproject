import React, { Component } from 'react';

import Login from './views/Login';
import LandingPage from './views/Landing';
import Photos from './views/Photos';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (

      <Router>
          <div className="App">
            <Route exact path="/" component={LandingPage} />
          </div>
      </Router>

    );
  }
}

export default App;
