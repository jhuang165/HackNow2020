import React, { useState } from 'react';
import './Register.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import {auth} from '../firebase';

const Register: React.FC = () => {
	const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
	function register() {
		auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage + " " + email);

		});
	}
  /*
  const handleChange = (e: Event) => {
    const inputElem = e.target as HTMLIonInputElement;
    const txt = inputElem.value;
    if (txt != undefined) {
      setEmail(txt ? txt : '')
    }
  }*/
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
    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
         	<IonButton expand="block" onClick={ () => register() }>
           Register
           </IonButton>
           <IonButton id="change_screen_button" color="warning" fill="outline" href="/login">Already have an account? Login here</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Register;
