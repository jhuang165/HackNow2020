import React, { useState } from 'react';
import './Login.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import {auth, provider} from '../firebase';
import { History, LocationState } from "history";
import { withRouter } from "react-router";

const Login: React.FC = () => {
	const [ email, setEmail ] = useState('');
  	const [ password, setPassword ] = useState('');

	function login() {
		var error = false;
		auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			error = true;
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage);
		});
		if (!error) {
      		window.history.pushState(null, "Main", "/tab2");
    	}
	}

	const handlePassChange = (e: React.ChangeEvent<HTMLIonInputElement>) => {
    const txt = e.currentTarget.value;
    if (txt != undefined) {
      let txt2 = txt as string;
      setPassword(txt2)
    }
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLIonInputElement>) => {
    const txt = e.currentTarget.value;
    if (txt != undefined) {
      let txt2 = txt as string;
      setEmail(txt2)
    }
  }
  function googleLogin() {
  	auth.signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  if (result != null) {
  		var cred = result.credential;
  		var user = result.user;
  		
  }
  // The signed-in user info.
  window.history.pushState(null, "Main", "/tab2");
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
  }
    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        	
          	<IonItem>
            	<IonLabel position="floating">Email</IonLabel>
            	<IonInput value={email} onInput={(e) => handleEmailChange(e as React.ChangeEvent<HTMLIonInputElement>)} />         	
            </IonItem>
         	<IonItem>
            	<IonLabel position="floating">Password</IonLabel>
            	<IonInput value={password} onInput={(e) => handlePassChange(e as React.ChangeEvent<HTMLIonInputElement>)} />
         	</IonItem>
         	<IonButton expand="block" onClick={ () => login() }>Login</IonButton>
         	<IonButton expand="block" color="success" onClick={() => googleLogin() }>Google Sign In</IonButton>
         	<IonButton id="change_screen_button" color="warning" fill="outline" href="/register">Register</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Login;
