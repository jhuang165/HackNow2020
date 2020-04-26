import React from 'react';
import './GroceryLists.css';
import { IonList, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonItemGroup } from '@ionic/react';
import { db, auth } from '../firebase';
import { Link } from 'react-router-dom';
import { getGeohash } from '../geohash';
import { inMiles } from 'geohash-distance';
import { closeOutline } from 'ionicons/icons';

interface Props {
}
interface State {
    loading: Boolean;
    listNames: Map<string, Object>;
}

class GroceryLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            listNames: new Map<string, Object>()
        };
    }

    componentDidMount() {
        let listsRef = db.ref('/lists/');
        getGeohash().then(geohash => {
            console.log("GEOHASH: " + geohash);
            listsRef.on('value', lists => {
                let listNames = new Map<string, Object>();
                let data = lists.val();
                let keys = Object.keys(data ?? []);
                keys.sort((a: string, b: string) => {
                    if (data[a].geohash === undefined) return 1;
                    if (data[b].geohash === undefined) return -1;
                    return inMiles(data[a].geohash, geohash) - inMiles(data[b].geohash, geohash);
                });
                keys.forEach(key => {
                    let dist = data[key].geohash !== undefined ? parseInt(inMiles(data[key].geohash, geohash)) : undefined;
                    listNames.set(key, { name: data[key].name, distance: dist, createdBy: data[key].createdBy });
                });
                this.setState({ listNames, loading: false });
            })
        });
    }
    render() {
        let uid = auth.currentUser?.uid;
        return (
            <IonList>
                { this.state.loading ?
                <IonItem>
                    Loading...
                </IonItem>
                :
                (this.state.listNames.size == 0 ?
                <IonItem>
                    No lists yet!
                </IonItem>
                :
                Array.from(this.state.listNames).map(([key, val]) => {
                    console.log(val);
                    return (
                    <IonItem>
                        <Link to={{ pathname: '/tab3', state: key }}>
                            <IonLabel color="primary">{val['name']}</IonLabel>
                        </Link>
                            <IonLabel class="distance">{val['distance'] !== undefined ? val['distance'] + " miles away" : "unknown location"}</IonLabel>
                        {val['createdBy'] === uid && <IonButton expand="block" color="danger" onClick={e => {
                            // delete item
                            e.stopPropagation();
                            e.preventDefault();
                            db.ref('/lists/').child(key).remove();
                        }}>
                        <IonIcon icon={closeOutline} />
                        </IonButton>}
                    </IonItem>
                    )
                }))
                }
            </IonList>
        );
    }
}

export default GroceryLists;
