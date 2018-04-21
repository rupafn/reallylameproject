import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class Photomodal extends Component {
  render() {
    return (

      <Modal
        show={this.props.show}
        className="modal-custom"
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            Place Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="trvl-img-modal" style={ { backgroundImage: `url(${this.props.photourl})` } }  ></div>
        <div className="trvl-description-modal">
              <p>Some description here</p>

              <Button className="btn-user" ><i className="fa fa-heart"></i></Button>
              <Button className="btn-user" ><i className="fa fa-exclamation"></i></Button>



        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

export default Photomodal;
