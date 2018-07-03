import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class Selectors extends Component {

  constructor(props){

    super(props);

  }
  componentWillMount(){

  }
  componentDidMount(){

  }

  handleClose() {
  }

  handleShow(url) {

 }

  render() {


    return (

              <div className="selector-wrapper">
                  <Button className="btn-primary spot-btn">Nearby</Button>
                  <Button className="btn-primary spot-btn">In country</Button>
                  <Button className="btn-primary spot-btn">Enter a spot</Button>
              </div>

    );
  }
}

export default Selectors;
