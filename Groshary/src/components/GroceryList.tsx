import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon, IonRippleEffect} from '@ionic/react';
import {closeOutline, timeSharp} from 'ionicons/icons'
import { render } from '@testing-library/react';

interface GroceryProps {
    items: Map<String, Object>;
    editable?: boolean;
    checkable?: boolean;
}

interface State {
    list: Map<String, Object>,
    newValue: String,
    listName: String
}

class GroceryList extends React.Component<GroceryProps, State> {  
    private newEntry: React.RefObject<HTMLIonInputElement>;
    
    constructor(props: GroceryProps) {
        super(props)
        this.newEntry = React.createRef()
        this.state = {
            list: this.props.items,
            newValue: '',
            listName: 'New Grocery List'
        }
    }

    render() {
            return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonInput color="primary" value={this.state.listName.toString()} onIonChange={(e) => {this.setState({listName: (e.detail.value ?? '').toString()})}}></IonInput>
                </IonItem>
                

                {this.state.list.forEach((da, ha) => {
                    return (
                        <IonItem>
                            {!this.props.editable && <IonLabel>{da.name}</IonLabel>}
                            {this.props.checkable && <IonCheckbox slot="start" />}    
                            {this.props.editable && <IonInput value={da.count.toString()} onIonChange={(e) => {
                                this.state.list.set('hash', {count: da.count, name: (e.detail.value ?? '').toString()})
                            }}/>}
                            {this.props.editable && <IonIcon icon={closeOutline} onClick={e => {
                                this.setState({
                                    list: this.state.list.delete(ha)
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
                            this.setState({
                                list: this.state.list.concat([(this.newEntry.current?.value ?? '').toString()])
                            })
                            //this.newEntry.current?.value = ''
                        }
                    }} />
                </IonItem>
                
            }
        </IonContent>
    );
    }
    
    };

export default GroceryList;