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

class GroceryLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            listNames: []
        };
    }
    componentDidMount() {
        let listNames: Array<String> = [];
        var ref = db.ref('/users/blablah/');
        ref.on('value', function(snapshot) {
            // do something with snapshot.val()
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
