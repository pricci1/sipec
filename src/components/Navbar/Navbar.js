import React, { useContext } from "react";
import { Link } from "@reach/router";
import "./Navbar.css";
import logo from "./logosag.png";
import APIContext from "../APIProvider";

const Navbar = ({ setLoggedOutCallback, isLogged }) => {
  const api = useContext(APIContext);

  const logout = () => {
    api.logout;
    setLoggedOutCallback(false);
  };

  return (
    <>
      <nav className="navbar p-0">
        <Link to="/" className="m-0 p-0" href>
          <img
            className="d-none d-md-inline"
            src={logo}
            height="120"
            alt="sag log"
          />
          <span className="navbar-brand ml-2" to="/">
            Sistema de información pecuaria SIPEC
          </span>
        </Link>
      </nav>
      {isLogged && (
        <div className="user-bar bg-secondary">
          <span className="ml-3 text-white ">{`${api.titular.name} ${api.titular.last_name}`}</span>
          <Link className="mr-3 text-white float-right" to="/" onClick={logout}>
            Cerrar Sesión
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
