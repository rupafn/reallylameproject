import React, { Component } from 'react';
import { withScriptjs,
withGoogleMap,
GoogleMap,
Marker, SearchBox, StandaloneSearchBox  } from "react-google-maps";

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");

const google = window.google;

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

  componentDidMount() {
		// console.log(<SearchBox/>);
	}

  componentWillMount() {
    const refs = {}

    this.setState({
      places: [],
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();

        this.setState({
          places,
        });
      },
    })
  }


  render() {
    return (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search for a place"
          />
        </StandaloneSearchBox>
        <ol>
          {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
            <li key={place_id}>
              {formatted_address}
              {" at "}
              ({location.lat()}, {location.lng()})
            </li>
          )}
        </ol>
      </div>

    );
  }
}

export default Map;
