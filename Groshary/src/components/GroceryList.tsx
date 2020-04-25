import React, {useState} from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon} from '@ionic/react';
import {pencilOutline} from 'ionicons/icons'

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
                        {!editable && <IonLabel>{item}</IonLabel>}
                        {editable && <IonInput value={item.toString()}></IonInput>}
                    </IonItem>
                );
            })}
        </IonList>

        {editable &&
            <IonItem>
                <IonInput placeholder="Add Grocery Item" color='#ffffff'/>
            </IonItem>
            
        }
    </IonContent>
);

export default GroceryList;