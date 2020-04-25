import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox} from '@ionic/react';

interface GroceryProps {
    items: Array<String>;
    editable?: boolean;
    checkable?: boolean;
}


const GroceryList: React.FC<GroceryProps> = ({items, editable = false, checkable = false}) => (
    <IonContent>
        <IonList>
            {items.map(item => {
                return (
                    <IonItem>
                        {checkable && <IonCheckbox slot="start" />}
                        <IonLabel>{item}</IonLabel>
                    </IonItem>
                );
            })}
        </IonList>

        {editable &&
            <IonItem>
                <IonInput defaultValue="Add Grocery Item"/>
            </IonItem>
            
        }
    </IonContent>
);

export default GroceryList;