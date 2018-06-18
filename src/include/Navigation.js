import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Entrymodal from '../views/includes/Entrymodal';
import logo from '../logo.svg';
import '../css/App.css';

import firebase from 'firebase';
import 'firebase/database';


class Navigation extends Component {
  constructor(props) {

		super(props);
		let location = {
			lat: 48.858608,
			lng: 2.294471
		};


		this.state = {
      places:[],
			location,
      show: false,
      searchCountry:""
		};
	}

  componentDidMount(){
    this.InitMap();
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

  getEateryNearby(){

    let textinput = document.getElementById('searchTextField').value;

    if(textinput.length>0){
      firebase.database().ref('/places' ).orderByChild("country").equalTo(this.state.searchCountry).on("value", (snapshot)=>{
          // console.log(snapshot.val());
          if(Object.values(snapshot.val()).length>0){
            this.props.restorePlaces(snapshot.val());

          }
      });
    } else{
      firebase.database().ref('/places' ).once('value').then((snapshot)=> {
        if(Object.values(snapshot.val()).length>0){
          this.props.restorePlaces(snapshot.val());

        }

       });
    }


  }


  InitMap() {

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

         console.log(place);
         //get country
         var filtered_array = place.address_components.filter((address_component) =>{
               return address_component.types.includes("country");
           });
        var country = filtered_array.length ? filtered_array[0].long_name: "";
        this.setState({
          searchCountry: country
        });
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
          id = "searchTextField"
          type="text"
          className="form-control text-center"
          placeholder="Discover places near you"
        />
        <input
          type="hidden"
          id="placeid"
        />

        <Button  className="btn btn-primary halal-entry" onClick={this.getEateryNearby.bind(this)}>Search</Button>

        <br/>
        <p className="or-css">OR</p>
        <Button  className="btn btn-primary halal-entry" onClick={this.onChange.bind(this)}>Enter a halal restaurant</Button>
        <Entrymodal
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}/>
       </div>

    );
  }
}

export default Navigation;
