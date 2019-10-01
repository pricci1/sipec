import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="#">
        SIPEC
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="#">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
