import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/User/Login";
import { APIProvider } from "./components/APIProvider";
import Navbar from "./components/Navbar/Navbar";
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
            <div style={{ padding: "0px" }} className="col-2">
              <Sidebar />
            </div>
            <main
              style={{ paddingTop: "25px", paddingRight: "25px" }}
              className="col-10"
            >
              <Login />
            </main>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
