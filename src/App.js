import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import from "./Components"
const App = () => {
  return (
    <div>
      <header className="bg-dark">
        <Link to="/">SIPEC</Link>
        <br />
        <span>Navbar here</span>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-info">Sidebar here</div>
          
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
