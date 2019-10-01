import React, { useContext } from "react";
import { Link } from "@reach/router";
import APIContext from "./APIProvider";

const Navbar = ({ setLoggedOutCallback, isLogged }) => {
  const api = useContext(APIContext);

  const logout = () => {
    api.logout;
    setLoggedOutCallback(false);
  };

  return (
    <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="#">
        SIPEC
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {isLogged ? (
            <Link className="nav-link" to="#" onClick={logout}>
              Log out
            </Link>
          ) : (
            <Link className="nav-link" to="#">
              Log in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;