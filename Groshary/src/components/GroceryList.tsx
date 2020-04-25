import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon, IonNote} from '@ionic/react';
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
    private newEntryStr: React.RefObject<HTMLIonInputElement>;
    private newEntryNum: React.RefObject<HTMLIonInputElement>;

    
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
        this.newEntryStr = React.createRef() 
        this.newEntryNum = React.createRef()
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
                            {this.props.checkable && <IonCheckbox slot="start" />}
                            {!this.props.editable && <IonLabel>{value.count}</IonLabel>}
                            {!this.props.editable && <IonLabel>{value.name}</IonLabel>}
                            {this.props.editable && <IonInput type="number" value={value.count} onIonChange={(e) => {
                                let newItems = JSON.parse(JSON.stringify(this.state.items))
                                newItems[hash].count = (e.detail.value ?? '')
                                this.setState({
                                    items: newItems
                                })
                            }} />}                  
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
                    <IonInput type="number" value={this.state.newValue.toString()} ref={this.newEntryNum} placeholder="How many items" color='#ffffff' onKeyPress={(e) => {
                        if (e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return') {
                            this.state.listRef.push({
                                "items": (this.newEntryNum.current?.value ?? '').toString()
                            })
                        }
                    }} />
                    <IonInput value={this.state.newValue.toString()} ref={this.newEntryStr} placeholder="Add Grocery Item" color='#ffffff' onKeyPress={(e) => {
                        if(e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return'){
                            this.state.listRef.push({
                                "items": (this.newEntryStr.current?.value ?? '').toString()
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