import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon, IonRippleEffect} from '@ionic/react';
import {closeOutline, timeSharp} from 'ionicons/icons'
import { render } from '@testing-library/react';
import { db } from '../firebase';

interface GroceryProps {
    listId: String;
    // items: Map<String, Object>;
    editable?: boolean;
    checkable?: boolean;
}

interface State {
    items: Map<String, Object>,
    newValue: String,
    name: String,
    listRef: firebase.database.Reference
}

class GroceryList extends React.Component<GroceryProps, State> {  
    private newEntry: React.RefObject<HTMLIonInputElement>;
    
    constructor(props: GroceryProps) {
        super(props)
        let listId = this.props.listId;
        let listRef = db.ref('/lists/' + listId);
        listRef.on('value', (items: any) => {
            let itemData = items.val();
            let itemsList = itemData.items;
            this.setState({
                name: itemData.name,
                items: itemsList
            });
        });
        this.newEntry = React.createRef() 
        this.state = {
            newValue: '',
            items: new Map<String, Object>(),
            name: 'Loading',
            listRef: listRef
        }          
    }

    

    render() {
            return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonInput color="primary" value={this.state.name.toString()} onIonChange={(e) => {this.setState({name: (e.detail.value ?? '').toString()})}}></IonInput>
                </IonItem>
                
                {Object.entries(this.state.items).map(([key, value], count) => {
                    var hash = Object.keys(this.state.items)[count]
                    return (
                        <IonItem>
                            {!this.props.editable && <IonLabel>{value.name}</IonLabel>}
                            {this.props.checkable && <IonCheckbox slot="start" />}
                            {this.props.editable && <IonInput value={value.name} onIonChange={(e) => {
                                let newItems = JSON.parse(JSON.stringify(this.state.items))
                                newItems[hash].name = (e.detail.value ?? '').toString()
                                this.setState({
                                    items: newItems
                                })                  
                            }}/>}
                            {this.props.editable && <IonIcon icon={closeOutline} onClick={e => {
                                let newItems = JSON.parse(JSON.stringify(this.state.items))
                                delete newItems[hash]
                                this.setState({
                                    items: newItems
                                })
                            }}/>}
                        </IonItem>
                    );
                })}
            </IonList>

            {this.props.editable &&
                <IonItem>
                    <IonInput value={this.state.newValue.toString()} ref={this.newEntry} placeholder="Add Grocery Item" color='#ffffff' onKeyPress={(e) => {
                        if(e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return'){
                            this.state.listRef.push({
                                "items": (this.newEntry.current?.value ?? '').toString()
                            })
                        }
                    }} />
                </IonItem>
                
            } 
        </IonContent>
    );
    }
    
    };

export default GroceryList;