import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import APIContext from "../components/APIProvider";
import MenuRouter from "./Menu";

const Sipec = () => {
  const api = useContext(APIContext);
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
            <>
              <div className="col-2">
                <Sidebar />
              </div>
              <main className="col-10">
                <MenuRouter />
              </main>
            </>
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
