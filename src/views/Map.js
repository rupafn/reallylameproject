import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Places from './Places.js';





class Map extends Component {

  constructor(props) {

		super(props);


		this.state = {
			places: null
		};
	}

  componentWillMount() {
		// console.log(<SearchBox/>);
    const google = window.google;
	}



  render() {
    return (
        <div>
          {this.props.places==null? "":<Places places = {this.props.places}/>}


        </div>

    );
  }
}

export default Map;
