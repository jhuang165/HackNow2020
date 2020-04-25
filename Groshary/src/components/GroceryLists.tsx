import React from 'react';
import './GroceryLists.css';
import { IonList, IonItem } from '@ionic/react';
import { db } from '../firebase';

interface Props {
}
interface State {
    loading: Boolean;
    listNames: Array<String>;
}
interface FirebaseList {
    items: Object;
    name: String;
}

class GroceryLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            listNames: []
        };
    }
    componentDidMount() {
        let listsRef = db.ref('/lists/');
        listsRef.on('value', lists => {
            let listNames: Array<String> = [];
            let data = lists.val();
            let keys = Object.keys(data);
            keys.forEach(key => {
                listNames.push(data[key].name);
            });
            this.setState({ listNames, loading: false });
        });
    }
    render() {
        return (
            <IonList>
                { this.state.loading ?
                <IonItem>
                    Loading...
                </IonItem>
                :
                this.state.listNames.map(listName => {
                    return (
                        <IonItem>
                            {listName}
                        </IonItem>
                    );
                })
                }
            </IonList>
        );
    }
}

export default GroceryLists;
