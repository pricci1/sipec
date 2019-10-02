import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/User/Login";
import Navbar from "../components/Navbar/Navbar";
import MenuRouter from "./MenuRouter";
const Sipec = () => {
  const [logged, setLogged] = useState(false);
  return (
    <div>
      <header className="bg-dark">
        <Navbar setLoggedOutCallback={setLogged} isLogged={logged} />
        <p></p>
      </header>
      <div className="container-fluid">
        <div className="row">
          {logged ? (
            <MenuRouter />
          ) : (
            <>
              <div className="col-3"></div>
              <main className="col-6">
                <Login setLoggedCallback={setLogged} />
              </main>
              <div className="col-3"></div>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sipec;
