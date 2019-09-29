import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/User/Login";
import { APIProvider } from "./components/APIProvider";

const App = () => {
  return (
    <APIProvider>
      <div>
        <header className="bg-dark">
          <Link to="/">SIPEC</Link>
          <br />
          <span>Navbar here</span>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 bg-info">Sidebar here</div>
            <main className="col-10 bg-light">
              Main content here <h2>Que?</h2>
              <Login></Login>
            </main>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
