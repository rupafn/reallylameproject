import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Photomodal from '../views/includes/Photomodal';
import logo from '../logo.svg';
import '../css/App.css';

class Navigation extends Component {
  constructor(props) {

		super(props);
		let location = {
			lat: 48.858608,
			lng: 2.294471
		};


		this.state = {
			location,
      show: false,
		};
	}

  componentWillMount() {
		// console.log(<SearchBox/>);
    const google = window.google;
	}

  onChange() {
    //query for places to eat in this location
    this.setState({
      show: true
    });
  }


  componentDidMount() {
    const refs = {};
    setTimeout(()=>{

    const google=window.google ;
    let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });
    let input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    this.setState({
      autocomplete: autocomplete,
      map: map
    });
    autocomplete.addListener('place_changed', ()=>{
         var place = autocomplete.getPlace();
         let placeid = place.photos;

         this.setState({
           photos: place.photos,
           placeid: place.place_id,
           hrflink: "photos?placeid="+place.place_id
         })
         if (!place.geometry) {
           return;
         }
       });

     }, 1000);

  }

  handleClose() {
    this.setState({ show: false });
  }



  handleShow() {
   // e.stopPropagation();
   this.setState({
     show: true
   });

 }


  render() {
    return (


      <div className=" form-group form-control form-control-cust">
        <p>Find a halal eatery near you</p>
        <input
          id="searchTextField"
          type="text"
          className="form-control text-center"
          placeholder="Search for a place "
          onKeyPress={this.onChange.bind(this)}
        />
        <input
          type="hidden"
          id="placeid"
        />

        <Button  className="btn btn-primary halal-entry" onClick={this.onChange.bind(this)}>Enter my halal place</Button>
        <Photomodal
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}/>
       </div>






    );
  }
}

export default Navigation;
