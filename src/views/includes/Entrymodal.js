import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import firebase from 'firebase';
import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBkMNYEPhErsL1kTSBuX0TK-uv0mbiNLbY",
    authDomain: "reallylameprojec-1524211167233.firebaseapp.com",
    databaseURL: "https://reallylameprojec-1524211167233.firebaseio.com",
    projectId: "reallylameprojec-1524211167233",
    storageBucket: "reallylameprojec-1524211167233.appspot.com",
    messagingSenderId: "43717583867"
  });


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -100%)'
  }
};
class Entrymodal extends Component {

  constructor(props) {

    super(props);

    let latlng = {
			lat: 48.858608,
			lng: 2.294471
		};

    this.state = {
      tags: [],
      tagStr:[],
      disabled: false,
      latlng,
      location: "",
      placename:"",
      country:"",
      inputError: false,

    };
  }

  componentWillMount() {
		// console.log(<SearchBox/>);
    const google = window.google;
	}

  InitMap() {

    const refs = {};
    setTimeout(()=>{

    const google=window.google ;
    let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });
    let input = document.getElementById('searchLocation');

    var autocomplete = new google.maps.places.Autocomplete(input);

    // this.setState({
    //   autocomplete: autocomplete,
    //   map: map
    // });

    autocomplete.addListener('place_changed', ()=>{
         var place = autocomplete.getPlace();
         let placeid = place.photos;
         console.log(place.geometry.location.lat());

         if (!place.geometry) {
           return;
         }
         let latlng = {
           lat: place.geometry.location.lat(),
           lng: place.geometry.location.lng(),
        };
        ///set country
        var filtered_array = place.address_components.filter((address_component) =>{
              return address_component.types.includes("country");
          });
          var country = filtered_array.length ? filtered_array[0].long_name: "";


         this.setState({
           latlng,
           country: country
         })
       });

     }, 1000);

  }



   removeTag(tag, e){

     let i = 0;
     let tmpTag = [];
     for(i=0; i<this.state.tagStr.length; i++){
       if(this.state.tagStr[i]!=tag){
         tmpTag.push(this.state.tagStr[i]);
       }
     }
     let listItems = tmpTag.map((tag,i) =>
       <p key={i} className="catTags">{tag} <i className="fa fa-times cancelTag" onClick={this.removeTag.bind(this,tag)}></i></p>
     );
     this.setState({
       tagStr:tmpTag,
       tags: listItems
     });


       this.setState({
         disabled:false
       })


   }

   checkErrors(){
      let flag = false;
      if(this.state.placename==""){
        flag = true;
      }
      if(this.state.location==""){
        flag = true;
      }
      if(this.state.tagStr.length==0){
        flag = true;
      }
      if(flag){
        this.setState({
          inputError:flag
        });
        return false
      }
      return true;

   }


   handleSave(){

     if(this.checkErrors()){
       firebase.database().ref('/places').push({
         placename : this.state.placename,
         latlng : this.state.latlng,
         locationName : this.state.location,
         country: this.state.country,
         tags : this.state.tagStr,
       }).then(() =>{
           alert("location saved successfully");
           this.props.handleClose();
       }).catch((e)=>{
         alert("Error saving");
       });
     }



   }

   onChange(e){
     let key = e.target.name;
     let value = e.target.value;
     let obj ={};
     obj[key] = value
     this.setState({
      [key]:value
     });

   }


  onChangeTag(e) {
    //query for places to eat in this location
    //if more than 3 tags dont allow

    if (e.key === 'Enter') {
        let input = e.target.value;
        let tags = this.state.tagStr;
        tags.push(input);

        e.target.value = "";
        let listItems = tags.map((tag,i) =>
          <p key={i} className="catTags">{tag} <i className="fa fa-times cancelTag" onClick={this.removeTag.bind(this,tag)}></i></p>
        );
        this.setState({
          tags: listItems,
          tagStr: tags,
          test: input
        });

      }
      if(this.state.tagStr.length>=3){
        this.setState({
          disabled:true
        });
      } else{
        this.setState({
          disabled:false
        })
      }
      // <p className="catTags">{this.state.test} <i className="fa fa-times cancelTag"></i></p>
      // <p className="catTags">test <i className="fa fa-times cancelTag"></i></p>
  }

//save details of location in firebase
  makeEntry (){
        let lat = this.state.latlng.lat;
        let lng = this.state.latlng.lng;
        let inputplace = document.getElementById('placename').value;
        let inputlocation = document.getElementById('searchLocation').value;
        //get categoreies
        //insert into firebase



  }

  render() {
    if(this.props.show){
      this.InitMap();
    }
    var listItems = this.state.tags;
    return (

      <Modal
        show={this.props.show}
        className="modal-custom"
        container={this}
        aria-labelledby="contained-modal-title"
        style={customStyles}
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title">
                Enter details of your discovery.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="trvl-description-modal">
            <div className={`form-control entry-form ${this.state.placename=="" && this.state.inputError==true  ? 'error' : ''}`}>
              <input
                type="text"
                id="placename"
                className=" text-center input-css"
                placeholder="Name of Eatery"
                required="true"
                name= "placename"
                onChange = {this.onChange.bind(this)}
              />
              </div>
              <div className={`form-control entry-form ${this.state.location=="" && this.state.inputError==true  ? 'error' : ''}`}>

              <input
                id="searchLocation"
                type="text"
                className="text-center input-css "
                placeholder="Location"
                required="true"
                name = "location"
                onChange = {this.onChange.bind(this)}
              />
              <input
                type="hidden"
                id="lat"
                value= {this.state.latlng.lat}
              />
              <input
                type="hidden"
                id="lng"
                value= {this.state.latlng.lng}

              />
              </div>

              <div className="form-control entry-form text-center">
              {this.state.tags}

              <input
                id = "categoryTextField"
                type="text"
                className="text-center "
                placeholder="Categories (Max 3)"
                required="true"
                onKeyPress={this.onChangeTag.bind(this)}
                disabled = {(this.state.disabled)? "disabled" : ""}
              />

              </div>
              <div className="enter-halal">
              <Button  className=" btn btn-primary halal-entry  "  onClick={this.handleSave.bind(this)}>Save</Button>
              </div>
              <div className="error-wrapper">
              {this.state.placename=="" && this.state.inputError?<p className="error-text">*Please enter place name.</p>:""}

              {this.state.location=="" && this.state.inputError?<p className="error-text">*Please enter location.</p>:""}

              {this.state.tagStr.length==0 && this.state.inputError?<p className="error-text">*Please enter maximum 3 categories.</p>:""}

              </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

export default Entrymodal;
