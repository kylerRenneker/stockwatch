import {  IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar, IonContent, IonIcon } from '@ionic/react';
import React from 'react';
import './Home.css';
import { personCircleOutline } from 'ionicons/icons/index'

const Alpaca = require('@alpacahq/alpaca-trade-api')

const Home: React.FC = () => {
  const [acountInfo, setAcountInfo] = React.useState(null)
    
  React.useEffect(() => {
      const alpaca = new Alpaca({
          keyId: 'PKWIOH5CLUJPJNZ4LGNG',
          secretKey: 'gAml4ex90rslHRASLQsrXAhqmw66MtRmrKiR7tCZ',
          paper: true,
          usePolygon: false
        })

        alpaca.getAccount().then((account: any) => {
          console.log('Current Account:', account)
          setAcountInfo(account)
        })
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='home-header' style={{padding: '0px 10px'}}>
          <IonTitle slot="start">Portfolio</IonTitle>
            <IonRouterLink slot="end" routerLink='/MyAccount'>
              <IonIcon className='testicon primary-icon-color' size='large' icon={personCircleOutline}/>
            </IonRouterLink>
            
        </IonToolbar>
      </IonHeader>
       
     
      <IonContent fullscreen>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
