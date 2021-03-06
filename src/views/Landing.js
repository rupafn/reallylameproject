import React, { Component } from 'react';
import Header from '../include/Header';
import Selectors from './Selectors';
import Map from './Map';
import { GoogleMap, Marker, SearchBox } from "react-google-maps"
import firebase from 'firebase';
import 'firebase/database';
class Landing extends Component {


  constructor(props) {

    super(props);


    this.state = {
      places: null
    };

    this.restorePlaces = this.restorePlaces.bind(this);
  }


  restorePlaces(places){
     this.setState({
       places: Object.values(places)
     });
  }


  componentDidMount() {
    // get places
    return firebase.database().ref('/places' ).on('value', (snapshot)=> {
      if(Object.values(snapshot.val()).length>0){
        this.setState({
          places: Object.values(snapshot.val())
        })
      }

     });
  }

  render() {
    return (

        <div className="container-fluid landing-img">
          <Header restorePlaces={this.restorePlaces.bind(this)} places = {this.state.places}/>
          <div className="wrapper">
              <div className = "wrapper-front">
                    <Selectors/>
              </div>
              <Map  places = {this.state.places} />
          </div>

        </div>


    );
  }
}

export default Landing;
