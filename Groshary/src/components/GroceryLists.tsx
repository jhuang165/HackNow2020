import React from 'react';
import './GroceryLists.css';
import { IonList, IonItem } from '@ionic/react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

interface Props {
}
interface State {
    loading: Boolean;
    listNames: Map<String, String>;
}

class GroceryLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            listNames: new Map<String, String>()
        };
    }
    componentDidMount() {
        let listsRef = db.ref('/lists/');
        listsRef.on('value', lists => {
            let listNames = new Map<String, String>();
            let data = lists.val();
            let keys = Object.keys(data);
            keys.forEach(key => {
                listNames.set(key, data[key].name);
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
                Array.from(this.state.listNames).map(([key, val]) => {
                    return (
                    <Link to={{pathname: '/tab3', state: key}}>
                        <IonItem>
                            {val}
                        </IonItem>
                    </Link>
                    )
                })
                }
            </IonList>
        );
    }
}

export default GroceryLists;
