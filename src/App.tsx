import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { homeOutline, searchOutline } from "ionicons/icons/index";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import MyAccount from "./pages/MyAccount";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  const [socket, setSocket] = React.useState() as any;

  React.useEffect(() => {
    // alert("app rendered");

    if (!socket) {
      const socket = new WebSocket("wss://data.alpaca.markets/stream");
      setSocket(socket);
      // Connection opened
      // socket.onopen = function (event) {
      //   // alert("[open] Connection established");
      //   // alert("Sending to server");
      //   socket.send(
      //     `{"action": "authenticate","data": {"key_id": "PKWIOH5CLUJPJNZ4LGNG", "secret_key": "gAml4ex90rslHRASLQsrXAhqmw66MtRmrKiR7tCZ"}}`
      //   );
      //   socket.send('{"action": "listen", "data": {"streams": ["Q.GME"]}}');
      // };

      // Listen for messages
      // socket.addEventListener("message", function (event) {
      //   let data = JSON.parse(event.data);
      //   console.log("Message from server ", data);
      //   if (data?.data?.p && data?.data?.p !== price) {
      //     setNewPrice(data?.data?.p);
      //   }
      // });
    }
  }, [setSocket]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonTabs>
            <IonRouterOutlet id="main">
              <Route
                path="/home"
                exact={true}
                render={() => <Home socket={socket} />}
              />
              <Route path="/MyAccount" component={MyAccount} exact={true} />
              <Route path="/search" component={SearchPage} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} className="primary-icon-color" />
              </IonTabButton>
              <IonTabButton tab="search" href="/search">
                <IonIcon icon={searchOutline} className="primary-icon-color" />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
