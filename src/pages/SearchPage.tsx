import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const SearchPage = (props: any) => {
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    console.log("props: ", props);
    console.log("searchText: ", searchText);
  }, [searchText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Securities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          animated
        ></IonSearchbar>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
