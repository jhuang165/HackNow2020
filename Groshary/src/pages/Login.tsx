import React, { useState } from 'react';
import './Login.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import {auth} from '../firebase';

const Login: React.FC = () => {
	const [ email, setEmail ] = useState('');
  	const [ password, setPassword ] = useState('');
	function login() {
		auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage);
		});
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
         	<IonButton color="warning" fill="outline" href="/register">Don't have an account? Register here</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Login;
