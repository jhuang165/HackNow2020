import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import GroceryList from '../components/GroceryList'
import { db } from '../firebase';

interface Tab3Props {
  location: {
    state: String
  };
}
interface Tab3State {
  name: String;
  items: Map<String, Object>;
}

class Tab3 extends React.Component<Tab3Props, Tab3State> {
  constructor(props: Tab3Props) {
    super(props);
    this.state = {
      name: 'Loading...',
      items: new Map<String, Object>()
    };
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>View List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">View List</IonTitle>
            </IonToolbar>
          </IonHeader>
          <GroceryList listId={this.props.location.state} checkable={true} editable={true}/>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
