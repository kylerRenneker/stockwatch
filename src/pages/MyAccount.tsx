import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./MyAccount.css";

const MyAccount = () => {
  React.useEffect(() => {}, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Account Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Hello World
        {/* {JSON.stringify(acountInfo)} */}
      </IonContent>
    </IonPage>
  );
};

export default MyAccount;
