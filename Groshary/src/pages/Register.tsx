import React, { useState } from 'react';
import './Register.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import {auth} from '../firebase';

const Register: React.FC = () => {
	const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ formErrors, setFormErrors ] = useState({});

  const submit = async () => {
    try {
      await login({
        email,
        password
      });
    } catch (e) {
      setFormErrors(e);
    }
  }
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
  const handlePassChange = (e: FormEvent<HTMLIonInputElement>) => {
    const txt = e.currentTarget.value;
    if (txt != undefined) {
      setPassword(txt ? txt : '')
    }
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.currentTarget.value;
    if (txt != undefined) {
      setEmail(txt ? txt : '')
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
            	<IonInput value={email} onIonChange={(e) => setEmail(e.target.value)} />         	
            </IonItem>
         	<IonItem>
            	<IonLabel position="floating">Password</IonLabel>
            	<IonInput value={password} onInput={handlePassChange} />
         	</IonItem>
         	<IonButton expand="block" onClick={ () => register() }>
           Register
           </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Register;
