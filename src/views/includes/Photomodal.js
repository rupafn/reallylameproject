import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import firebase from 'firebase/app';
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
class Photomodal extends Component {

  constructor(props) {

    super(props);


    this.state = {
      tags: [],
      tagStr:[],
      disabled: false,
      inputError: false,
      location: "",
      placename:"",
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

   checkErrors(){
      let flag = true;
      if(!this.state.placename){
        flag = false;


      }
      if(!this.state.location){
        flag = false;
      }
      if(!this.state.tagStr){
        flag = false;
      }
   }


   handleSave(){
     console.log("Teskltjslkt");
     this.checkErrors();

     // firebase.database().ref('/places').push({
     //   placeName: name,
     // });

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
        <form>
            <div className="form-control entry-form">
              <input
                type="text"
                className=" text-center input-css"
                placeholder="Name of Eatery"
                required="true"
                name= "placename"
              
                onChange = {this.onChange.bind(this)}
              />
              </div>
              <div className="form-control entry-form">
              <input
                type="text"
                className=" text-center input-css"
                placeholder="Location"
                required="true"
                name = "location"
                onChange = {this.onChange.bind(this)}
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
                <Button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</Button>
              </form>
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
