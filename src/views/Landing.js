import React, { Component } from 'react';

import Map from './Map';
import { GoogleMap, Marker, SearchBox } from "react-google-maps"

class Landing extends Component {

  componentDidMount() {
    // console.log(window.google);
	}
  render() {
    return (

        <div className="container-fluid landing-img">

          <div className="wrapper">
          <form className="input-search">
                  <Map/>

          </form>

          </div>

        </div>


    );
  }
}

export default Landing;
