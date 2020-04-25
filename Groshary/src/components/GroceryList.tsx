import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon} from '@ionic/react';
import {pencilOutline, construct, timeSharp} from 'ionicons/icons'
import { render } from '@testing-library/react';

interface GroceryProps {
    items: Array<String>;
    editable?: boolean;
    checkable?: boolean;
}

interface State {
    list: Array<String>,
    newValue: String
}

class GroceryList extends React.Component<GroceryProps, State> {  
    private newEntry: React.RefObject<HTMLIonInputElement>;
    
    constructor(props: GroceryProps) {
        super(props)
        this.newEntry = React.createRef()
        this.state = {
            list: this.props.items,
            newValue: ''
        }
    }

    render() {
            return (
        <IonContent>
            <IonList>
                {this.state.list.map((item, count) => {
                    return (
                        <IonItem>
                            {!this.props.editable && <IonLabel>{item}</IonLabel>}
                            {this.props.checkable && <IonCheckbox slot="start" />}    
                            {this.props.editable && <IonInput value={item.toString()} onIonChange={(e) => {
                                this.state.list[count] = (e.detail.value ?? '').toString();
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