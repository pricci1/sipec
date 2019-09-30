import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import APIContext from "../components/APIProvider";

const Sipec = () => {
  const api = useContext(APIContext);

  if (api.token != null && api.token != "null") {
    return (
      <div>
        <header className="bg-dark">
          <Navbar />
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <main className="col-10">main context {api.token}</main>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <header className="bg-dark">
        <Navbar />
        <p></p>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3"></div>
          <main className="col-6">
            <Login />
          </main>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Sipec;
