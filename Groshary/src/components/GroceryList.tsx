import React from 'react';
import { IonList, IonItem, IonInput, IonContent} from '@ionic/react';

interface GroceryProps {
    items: Array<String>;
    editable: boolean;
}

const GroceryList: React.FC<GroceryProps> = ({items, editable}) => (
    <IonContent>
        <IonList>
            {items.map(item => {
                return (
                    <IonItem>{item}</IonItem>
                );
            })}
        </IonList>

        {editable &&
            <IonItem>
                <IonInput defaultValue="Add Grocery Item"/>
            </IonItem>
            
        }
    </IonContent>
)

export default GroceryList;