import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { Modal, Button } from 'react-bootstrap';
import Photomodal from './includes/Photomodal';
const google = window.google;

class Photos extends Component {

  constructor(props){

    super(props);
    this.state = {
      photos:[],
      placename:"test",
      show: false,
      url:""
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){

      let url = window.location.href;
      let string = url.split("=");
      let placeid= string[1];
      let map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13
          });
      let service = new google.maps.places.PlacesService(map);

      this.getPlaceDetails(service,placeid);




  }

  getPlaceDetails(service,placeid) {
    var request = {placeId: placeid};

    service.getDetails(request, (result, status)=> {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }

      this.setState({
        photos: result.photos,
        placename: result.name
      });


    });
  }

  getPhotos(){
    if(this.state.photos.length==0){return}
    let i =0;
    let arr = [];
    for(i=0; i<this.state.photos.length; i++){
      let photourl = this.state.photos[i].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
      arr.push(photourl);
      }
      return arr;

  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(url) {
   // e.stopPropagation();
   this.setState({
     show: true,
     photo_url:url
   });
   console.log(url);
 }

  render() {
  var listItems =null;
   if(this.state!=null ){
     let photos = this.getPhotos();
     if(photos){
       listItems = photos.map((url,i) =>
           <LazyLoad key={i} className="lazy-img" height={300} width={300}   >
               <div className="trvl-img" style={ { backgroundImage: `url(${url})` } }  onClick={this.handleShow.bind(this,url)}></div>
           </LazyLoad>
       );
     } else{
       listItems= []
     }

   }

    return (
        <div className="container-fluid">
            <div className="wrapper-photos">
            <h1 className="f1">{this.state? this.state.placename : ""}</h1>
              {listItems}

        <Photomodal photourl={this.state.photo_url} show={this.state.show} handleClose={this.handleClose.bind(this)}/>
            </div>
        </div>
    );
  }
}

export default Photos;
