import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Login from "./components/User/Login";
// import NewPurchaseDiio from "./components/Diio/NewPucharseDiio"

import { APIProvider } from "./components/APIProvider";

// import SIPECTable from "./components/AnimalMoves/SIPECtable";

import Sipec from "./routes/Sipec";

const App = () => {
  return (
    <APIProvider>
      <Sipec />
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
