import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import GroceryLists from '../components/GroceryLists';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GroceryLists />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
