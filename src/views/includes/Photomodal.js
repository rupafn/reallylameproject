import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
class Photomodal extends Component {

  constructor(props) {

    super(props);


    this.state = {
      tags: [],
      tagStr:[],
      disabled: false,
      test: null
    };
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

  onChange(e) {
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


  render() {
    var listItems = this.state.tags;
    return (

      <Modal
        show={this.props.show}
        className="modal-custom"
        container={this}
        aria-labelledby="contained-modal-title"
        style={customStyles}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
                Enter the details of your discovery.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="trvl-description-modal">
            <div className="form-control entry-form">
              <input
                type="text"
                className=" text-center input-css"
                placeholder="Name of Eatery"
                required="true"
              />
              </div>
              <div className="form-control entry-form">
              <input
                type="text"
                className=" text-center input-css"
                placeholder="Location"
                required="true"
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
                onKeyPress={this.onChange.bind(this)}
                disabled = {(this.state.disabled)? "disabled" : ""}
              />
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

export default Photomodal;
