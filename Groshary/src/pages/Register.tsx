import React, { useState } from 'react';
import './Register.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import {auth} from '../firebase';

const Register: React.FC = () => {
	var email = "";
	var password = "";
	function register() {
		auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage);
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
            	<IonInput value={email}></IonInput>
         	</IonItem>
         	<IonItem>
            	<IonLabel position="floating">Password</IonLabel>
            	<IonInput value={password}></IonInput>
         	</IonItem>
         	<IonButton expand="block" onClick={ () => register() }>
           Register
           </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Login;
