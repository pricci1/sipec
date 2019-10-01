import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIProvider } from "./components/APIProvider";

import ListadoBajaDIIO from "./pages/listadoBajaDIIO";
import StockDIIOEstablecimiento from "./pages/stockDIIOEstablecimiento";

import SIPECTable from "./components/AnimalMoves/SIPECtable";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <APIProvider>
      <div>
        <header className="bg-dark">
          <Navbar />
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <main className="col-10">
              {/* <ListadoBajaDIIO /> */}
              <StockDIIOEstablecimiento />
            </main>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
