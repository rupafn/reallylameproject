import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Map from './Map';
import { GoogleMap, Marker, SearchBox } from "react-google-maps"

class Login extends Component {

  componentDidMount() {
    // console.log(window.google);
	}
  render() {
    return (

        <div className="container-fluid landing-img">
          <div className="wrapper">
          <form className="input-search">
            <div className="form-group form-control">
                  <Map/>
                  <Button type="submit" bsStyle="primary">Search</Button>
            </div>
          </form>

          </div>

        </div>


    );
  }
}

export default Login;
