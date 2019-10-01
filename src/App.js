import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/User/Login";
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
            <main className="col-10">
              Main content here
              <Login />
            </main>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
