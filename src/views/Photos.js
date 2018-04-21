import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

const google = window.google;

class Photos extends Component {

  constructor(props){

    super(props);
    this.setState({
      photos:[]
    });
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
        photos: result.photos
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

  render() {
  var listItems =null;
   if(this.state!=null ){
     let photos = this.getPhotos();
     listItems = photos.map((url,i) =>
         <LazyLoad key={i} className="lazy-img" height={200} width={200} >
             <div className="trvl-img" style={ { backgroundImage: `url(${url})` } }></div>
         </LazyLoad>
     );
   }

    return (
        <div className="container-fluid">
            <div className="wrapper-photos">
              {listItems}

            </div>
        </div>
    );
  }
}

export default Photos;
