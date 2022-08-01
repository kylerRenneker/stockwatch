import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { homeOutline } from 'ionicons/icons/index'

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

import MyAccount from './pages/MyAccount'


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage>
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route path="/home" component={Home} exact={true} />
            <Route path='/MyAccount' component={MyAccount} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
          
    
      
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href='/home' >
              <IonIcon icon={homeOutline} className="primary-icon-color"/>
            </IonTabButton>
          </IonTabBar>
        
        </IonTabs>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
