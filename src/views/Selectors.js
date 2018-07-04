import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

const google = window.google;
class Selectors extends Component {

  constructor(props){

    super(props);

  }
  componentWillMount() {
		// console.log(<SearchBox/>);
    const google = window.google;
	}

  componentDidMount(){


  }

  handleClose() {
  }

  handleShow(url) {

 }

 getLocationsNearby(){
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((position)=> {
       var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
       };
       alert(pos.lat);
       });
     }


 }

  render() {


    return (

              <div className="selector-wrapper">
                  <Button className="btn-primary spot-btn" onClick={this.getLocationsNearby.bind(this)}>Nearby</Button>
                  <Button className="btn-primary spot-btn">In country</Button>
                  <Button className="btn-primary spot-btn">Enter a spot</Button>
              </div>

    );
  }
}

export default Selectors;
