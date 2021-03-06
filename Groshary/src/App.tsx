import React, {useState} from 'react';
import RcIf, {RcElse} from 'rc-if';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Login from './pages/Login';
import Register from './pages/Register';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import {getPlatforms} from '@ionic/react';
import { auth } from './firebase';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(
    false
  )

  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("USER LOGGED IN");
      setLoggedIn(true);
    } else {
      // User is signed out.
      // ...
      console.log("USER LOGGED OUT");
      setLoggedIn(false);
    }
  });

    if(loggedIn){
      console.log("Logged IN from app!")
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route path="/tab3" component={Tab3} exact={true} />
              <Route path="/tab4" component={Tab4} exact={true} />
              <Route render={() => <Redirect to="/tab2" />} />
            </IonRouterOutlet>
            <IonTabBar slot={(getPlatforms().includes('desktop') || getPlatforms().includes('pwa')) ? 'top' : 'bottom'}>
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Make a List</IonLabel>
              </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>View Lists</IonLabel>
              </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
              <IonIcon icon={square} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  } else {
    console.log("Logged out from app!")
    return(
      <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;
