import React from "react";
import { Link } from "@reach/router";
import "./Navbar.css";
import logo from "./Logo-SAG.jpg";

const Navbar = () => {
  return (
    <nav className="navbar flex-md-nowrap p-0">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="#">
        Sistema de información pecuaria SIPEC
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          <Link className="navbar-link" to="#">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
