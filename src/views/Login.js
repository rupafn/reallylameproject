import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase'

class Login extends Component {


  componentWillMount(){
    var config = {
        apiKey: "AIzaSyBDTdGg-agdNGAM29hZXx6Vfz-m54qkdtc",
        authDomain: "myfirstapp-8fecb.firebaseapp.com",
        databaseURL: "https://m...content-available-to-author-only...o.com",
        projectId: "myfirstapp-8fecb",
        storageBucket: "myfirstapp-8fecb.appspot.com",
        messagingSenderId: "638414867485"
      };
      firebase.initializeApp(config);
  }
  componentDidMount(){

    // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
     var ui = new firebaseui.auth.AuthUI(firebase.auth());
     // The start method will wait until the DOM is loaded.
     ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
    return (

        <div className="container-fluid ">
            <div className="wrapper">
             <div className="login">
              <div id="firebaseui-auth-container"></div>
              </div>
            </div>
        </div>

    );
  }
}

export default Login;
