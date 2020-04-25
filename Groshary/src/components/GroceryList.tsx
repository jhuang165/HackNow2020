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
    name: String
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
            name: 'Loading'
        }          
    }

    

    render() {
            return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonInput color="primary" value={this.state.name.toString()} onIonChange={(e) => {this.setState({name: (e.detail.value ?? '').toString()})}}></IonInput>
                </IonItem>
                
                {Object.entries(this.state.items).map(([key, value]) => {
                    console.log(key);
                    console.log(value)
                    return (
                        <IonItem>
                            {/* {!this.props.editable && <IonLabel>{val}</IonLabel>} */}
                            {/*{this.props.checkable && <IonCheckbox slot="start" />}    
                            {this.props.editable && <IonInput value={da.count.toString()} onIonChange={(e) => {
                                this.state.list.set('hash', {count: da.count, name: (e.detail.value ?? '').toString()})
                            }}/>}
                            {this.props.editable && <IonIcon icon={closeOutline} onClick={e => {
                                this.setState({
                                    list: this.state.list.delete(ha)
                                })
                            }}/>} */}
                        </IonItem>
                    );
                })}
            </IonList>

            {/* {this.props.editable &&
                <IonItem>
                    <IonInput value={this.state.newValue.toString()} ref={this.newEntry} placeholder="Add Grocery Item" color='#ffffff' onKeyPress={(e) => {
                        if(e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return'){
                            this.setState({
                                // list: this.state.list.concat([(this.newEntry.current?.value ?? '').toString()])
                            })
                            //this.newEntry.current?.value = ''
                        }
                    }} />
                </IonItem>
                
            } */}
        </IonContent>
    );
    }
    
    };

export default GroceryList;