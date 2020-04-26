import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import GroceryList from '../components/GroceryList'

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New List</IonTitle>
          </IonToolbar>
        </IonHeader>
      <GroceryList listId='new' editable={true} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
