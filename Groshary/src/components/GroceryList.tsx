import React from 'react';
import { IonList, IonItem, IonInput, IonContent, IonLabel, IonCheckbox, IonIcon, IonNote} from '@ionic/react';
import {closeOutline, timeSharp} from 'ionicons/icons'
import { render } from '@testing-library/react';
import { db, auth } from '../firebase';
import { getGeohash } from '../geohash';

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
    listRef: firebase.database.Reference,
    userUID?: String
}

class GroceryList extends React.Component<GroceryProps, State> {  
    private newEntryStr: React.RefObject<HTMLIonInputElement>;
    private newEntryNum: React.RefObject<HTMLIonInputElement>;

    
    constructor(props: GroceryProps) {
        super(props)
        this.newEntryStr = React.createRef() 
        this.newEntryNum = React.createRef()
        if (this.props.listId['direction'] !== undefined) {
            // they typed it in somehow
            this.context.history.replace('/tab2');
        }
        let listRef = this.setupListRef();
        let uid = auth.currentUser?.uid
        this.state = {
            newValue: '',
            items: new Map<String, Object>(),
            name: 'Loading',
            listRef: listRef,
            userUID: uid
        }
        if (this.props.listId == "new") {
            this.state.listRef.update({ 'createdBy': this.state.userUID });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.listId != prevProps.listId && typeof this.props.listId == "string") {
            console.log(this.props.listId);
            let listRef = this.setupListRef();
            this.setState({ listRef });
        }
    }

    setupListRef() {
        console.log(this.props.listId);
        if (this.props.listId == "new" || this.props.listId == null || this.props.listId == undefined) {
            var newref = db.ref('/lists/').push({
                name: "New List"
            })
            var listId = newref.key ?? ''
        } else {
            var listId = this.props.listId.toString();
        }
        let listRef = db.ref('/lists/' + listId);
        if (this.props.listId == 'new') {
            getGeohash().then(hash => {
                console.log("GOT! " + hash);
                this.state.listRef.update({ 'geohash': hash });
            })
        }
        listRef.on('value', (items: any) => {
            let itemData = items.val() ?? {items: new Map<String, Object>()};
            let itemsList = itemData.items ?? new Map<String, Object>();
            this.setState({
                name: itemData.name,
                items: itemsList
            });
        });
        
        return listRef;
    }    

    render() {
            return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonInput color="primary" value={this.state.name.toString()} onIonChange={(e) => {this.state.listRef.update({"name": (e.detail.value ?? '').toString()})}}/>
                </IonItem>
                
                {Object.entries(this.state.items).map(([key, value], count) => {
                    var hash = Object.keys(this.state.items)[count]
                    return (
                        <IonItem>
                            {this.props.checkable && <IonCheckbox checked={value.bought} slot="start" onIonChange={(e) => {
                                // (un)check
                                this.state.listRef.child('items').child(hash).update({ "bought": (e.detail.checked) }); 
                            }}/>}
                            {!this.props.editable && <IonLabel>{value.count}</IonLabel>}
                            {!this.props.editable && <IonLabel>{value.name}</IonLabel>}
                            {this.props.editable && <IonInput type="number" value={value.count} onIonChange={(e) => {
                                // change count
                                this.state.listRef.child('items').child(hash).update({ "count": (e.detail.value ?? '') }); 
                            }} />}                  
                            {this.props.editable && <IonInput value={value.name} onIonChange={(e) => {
                                // change name
                                this.state.listRef.child('items').child(hash).update({ "name": (e.detail.value ?? '').toString() }); 
                            }}/>}
                            
                            {this.props.editable && <IonIcon icon={closeOutline} onClick={e => {
                                // delete item
                                this.state.listRef.child('items').child(hash).remove();
                            }}/>}
                            
                        </IonItem>
                    );
                })}
            </IonList>

            {this.props.editable &&
                <IonItem>
                    <IonInput type="number" value={this.state.newValue.toString()} ref={this.newEntryNum} placeholder="How many items" color='#ffffff' onKeyPress={(e) => {
                            // hit enter from count box
                            if (this.newEntryNum.current?.value?.toString() == null || this.newEntryNum.current?.value?.toString() == '') {
                                var count = 1
                            } else {
                                count = parseInt(this.newEntryNum.current?.value?.toString() ?? "1")
                            }
                            if (e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return') {
                                this.state.listRef.child('items').push(
                                    { "count": count, "name": (this.newEntryStr.current?.value ?? '').toString(), "bought": false }
                                );
                            }
                    }} />
                    <IonInput value={this.state.newValue.toString()} ref={this.newEntryStr} placeholder="Add Grocery Item" color='#ffffff' onKeyPress={(e) => {
                        // hit enter from name box
                        if (this.newEntryNum.current?.value?.toString() == null || this.newEntryNum.current?.value?.toString() == ''){
                            var count = 1
                        } else {
                            count = parseInt(this.newEntryNum.current?.value?.toString() ?? "1")
                        }
                        if(e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'return'){
                            this.state.listRef.child('items').push(
                                { "count": count, "name": (this.newEntryStr.current?.value ?? '').toString(), "bought": false }
                            );
                        }
                    }} />
                </IonItem>
                
            } 
        </IonContent>
    );
    }
    
    };

export default GroceryList;