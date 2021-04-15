import {
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import { personCircleOutline } from "ionicons/icons/index";
import Alpaca from "@alpacahq/alpaca-trade-api";
// import AnimatedNumber from "animated-number-react";

// const Alpaca = require("@alpacahq/alpaca-trade-api");

// const streamMarketData = (
//   price: any,
//   setNewPrice: any,
//   setInitialLoad?: any
// ) => {
//   // Create WebSocket connection.
//   const socket = new WebSocket("wss://data.alpaca.markets/stream");

//   // Connection opened
//   socket.addEventListener("open", function (event) {
//     // alert("[open] Connection established");
//     // alert("Sending to server");
//     socket.send(
//       `{"action": "authenticate","data": {"key_id": "PKWIOH5CLUJPJNZ4LGNG", "secret_key": "gAml4ex90rslHRASLQsrXAhqmw66MtRmrKiR7tCZ"}}`
//     );
//     socket.send('{"action": "listen", "data": {"streams": ["Q.GME"]}}');
//   });

//   // Listen for messages
//   socket.addEventListener("message", function (event) {
//     let data = JSON.parse(event.data);
//     console.log("Message from server ", data);
//     if (data?.data?.p && data?.data?.p !== price) {
//       setNewPrice(data?.data?.p);
//       setInitialLoad(false);
//     }
//   });

// };

const Home = (props: any) => {
  // const [acountInfo, setAcountInfo] = React.useState(null);
  const [price, setPrice] = React.useState(0);
  const [newPrice, setNewPrice] = React.useState(0);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [lastQuote, setLastQuote] = React.useState(null) as any;

  const alpaca = new Alpaca({
    keyId: "AKF644WLGH3C7FNQ9EQ2",
    secretKey: "WSS7cv58Sn5bKXSeYJKPgw33GbRPN38JPxnBh5ih",
    paper: true,
    usePolygon: false,
  });

  let getLastQuote = async () => {
    try {
      let res = await alpaca.getLastQuote("GME");
      if (res.status !== "success") {
        throw new Error(res.status);
      } else {
        setLastQuote(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    console.log("lastQuote: ", lastQuote);
  });

  // console.log(response);

  React.useEffect(() => {
    if (newPrice !== price && !initialLoad) {
      setPrice(newPrice);
    }
  }, [newPrice]);

  React.useEffect(() => {
    try {
      // const alpaca = new Alpaca({
      //   keyId: "PKWIOH5CLUJPJNZ4LGNG",
      //   secretKey: "gAml4ex90rslHRASLQsrXAhqmw66MtRmrKiR7tCZ",
      //   paper: true,
      //   usePolygon: false,
      // });

      // alpaca
      //   .getPortfolioHistory({
      //     dateStart: new Date(),
      //     dateEnd: new Date(),
      //     period: "1D",
      //     timeFrame: "1Min",
      //   })
      //   .then((res: any) => {
      //     console.log("Portfolio History: ", res);
      //   });

      // alpaca.getAccount().then((account: any) => {
      //   console.log("Current Account:", account);
      //   setAcountInfo(account);
      // });

      fetch("https://data.alpaca.markets/v1/last_quote/stocks/GME", {
        headers: {
          "APCA-API-KEY-ID": "AKF644WLGH3C7FNQ9EQ2",
          "APCA-API-SECRET-KEY": "WSS7cv58Sn5bKXSeYJKPgw33GbRPN38JPxnBh5ih",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPrice(data?.last?.bidprice);
          setInitialLoad(false);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    console.log(window.location);

    props.socket.onopen = function (event) {
      props.socket.send(
        `{"action": "authenticate","data": {"key_id": "AKF644WLGH3C7FNQ9EQ2", "secret_key": "WSS7cv58Sn5bKXSeYJKPgw33GbRPN38JPxnBh5ih"}}`
      );
      props.socket.send('{"action": "listen", "data": {"streams": ["Q.GME"]}}');
    };

    props.socket.addEventListener("message", function (event) {
      let data = JSON.parse(event.data);
      console.log("Message from server ", data);
      if (data?.data?.p && data?.data?.p !== price) {
        setNewPrice(data?.data?.p);
      }
    });
  }, []);

  // const formatPrice = (price) => {
  //   return price.toFixed(2);
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="home-header" style={{ padding: "0px 10px" }}>
          <IonTitle className={"list-title"} slot="start">
            <h1 style={{ padding: "0 0 10px 0 " }}>Stock List</h1>
          </IonTitle>
          <IonRouterLink slot="end" routerLink="/MyAccount">
            <IonIcon
              className="testicon primary-icon-color"
              size="large"
              icon={personCircleOutline}
            />
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.4rem",
                fontWeight: 600,
                padding: "10px 0px",
              }}
            >
              <span>GME</span>
              {/* {price && (
                <AnimatedNumber value={price} formatValue={formatPrice} />
              )} */}
              <span>{price && price.toFixed(2)}</span>
            </div>
          </IonLabel>

          {/* <IonLabel slot="end">{price && price.toFixed(2)}</IonLabel> */}
        </IonItem>
        <IonItem>
          <IonLabel>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.4rem",
                fontWeight: 600,
                padding: "10px 0px",
              }}
            >
              <IonButton onClick={getLastQuote}>Get LQ</IonButton>
              <span>GME Last Ask Price: </span>
              {/* {price && (
                <AnimatedNumber value={price} formatValue={formatPrice} />
              )} */}
              <span>{lastQuote?.last?.askprice.toFixed(2)}</span>
            </div>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
