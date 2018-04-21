import React, { Component } from 'react';
import { Button } from 'react-bootstrap';




class Map extends Component {

  constructor(props) {

		super(props);
		let location = {
			lat: 48.858608,
			lng: 2.294471
		};


		this.state = {
			location
		};
	}

  componentWillMount() {
		// console.log(<SearchBox/>);
    const google = window.google;
	}

  onChange() {

      console.log(this.state);
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


  render() {
    return (
        <div className="form-group form-control">
          <input
            id="searchTextField"
            type="text"
            className="form-control"
            placeholder="Search for a place"
          />
          <input
            type="hidden"
            id="placeid"
          />

          <a href={this.state.hrflink}  className="btn btn-primary" onClick={this.onChange.bind(this)}>Search</a>
        </div>

    );
  }
}

export default Map;
