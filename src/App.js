import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import DiioTable from "./components/Diio/PucharseListDiio";

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
            <DiioTable headers={[/*Aquí van los headers de la tabla (como en el playpen)*/]} data={[/*Aquí va la data (como en el playpen)*/]}/>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
