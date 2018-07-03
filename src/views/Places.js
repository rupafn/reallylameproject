import React, { Component } from 'react';


class Places extends Component {

    constructor(props) {

  		super(props);


  		this.state = {
  			placesArray: []
  		};
  	}

  componentDidMount() {
    // console.log(window.google);
    console.log(this.props.places);
    this.setState({
      placesArray:this.props.places
    })

	}


  getListItems(){

    let listItems = this.props.places.map((place,key) =>
      <li key={key}>
      <div className="place">
            <div className="place-name"><h4>{place.placename} ({place.locationName})</h4></div>
            <div className="place-tags">
             {place.tags[0]?<p>{place.tags[0]}</p>:""}
             {place.tags[1]?<p>{place.tags[1]}</p>:""}
             {place.tags[2]?<p>{place.tags[2]}</p>:""}
            </div>
            <div className="place-country">
               <p>{place.country}</p>
            </div>
      </div>
      </li>
      );
      return listItems;
  }


  render() {

    return (

        <div className="container-fluid ">
        <ul className="listplaces">{this.getListItems()}</ul>

        </div>


    );
  }
}

export default Places;
