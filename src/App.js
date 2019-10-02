import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Login from "./components/User/Login";
// import NewPurchaseDiio from "./components/Diio/NewPucharseDiio"
import NotAppliedDroppedDiio from "./components/Diio/NotAppliedDroppedDiio";
import { APIProvider } from "./components/APIProvider";

import ListadoBajaDIIO from "./pages/listadoBajaDIIO";
import StockDIIOEstablecimiento from "./pages/stockDIIOEstablecimiento";

// import SIPECTable from "./components/AnimalMoves/SIPECtable";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Sipec from "./routes/Sipec";

const App = () => {
  return (
    <APIProvider>
      <Sipec />
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
