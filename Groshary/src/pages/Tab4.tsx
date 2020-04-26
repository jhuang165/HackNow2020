import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Tab4.css';
import GroceryList from '../components/GroceryList';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

const Tab4: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonButton expand="block" color="danger" onClick={e => {
        auth.signOut();
        history.push("/login");
      }}>LOG OUT</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
