import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Login extends Component {
  render() {
    return (

        <div className="container-fluid landing-img">
          <div className="wrapper">
          <form className="input-search">
            <div className="form-group">
            <input className="form-control" type="text" placeholder="Search for a place"/>
            </div>
          </form>
          </div>

        </div>


    );
  }
}

export default Login;
