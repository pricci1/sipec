import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { APIProvider } from "./components/APIProvider";
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
            <main className="col-10">Main content here</main>
          </div>
=======
import NewPucharseDiio from "./components/Diio/NewPucharseDiio"
//import DiioTable from "./components/Diio/PucharseListDiio";
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
          <NewPucharseDiio/>
>>>>>>> 6510b6aed793211e56725052ea2f563e9c9e9436
        </div>
      </div>
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
