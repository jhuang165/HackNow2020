import React, { useState } from 'react';
import './Login.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';

const Login: React.FC = () => {
	const [text, setText] = useState<string>();
  	const [number, setNumber] = useState<number>();
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
            	<IonInput value={text}></IonInput>
         	</IonItem>
         	<IonItem>
            	<IonLabel position="floating">Password</IonLabel>
            	<IonInput value={text}></IonInput>
         	</IonItem>
         	<IonButton expand="block">Login</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
    );

};

export default Login;
