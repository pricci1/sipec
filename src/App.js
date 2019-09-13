import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <header className="bg-dark">
        <Navbar></Navbar>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <main className="col-10 bg-light">
            Main content here <h2>Que?</h2>
          </main>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
