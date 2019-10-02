import React from "react";
import { Link } from "@reach/router";
import { Navbar } from "react-bootstrap";

const DiioMenu = ({ children }) => (
  <div>
    <Navbar bg="light">
      <Link
        to="lista-compra"
        className="btn btn-danger"
        style={{ textDecoration: "none", color: "#000" }}
      >
        Compra
      </Link>
      <Link
        to="inventario"
        className="btn btn-danger"
        style={{ textDecoration: "none", color: "#000" }}
      >
        Inventario
      </Link>
      <Link
        to="baja-diios"
        className="btn btn-danger"
        style={{ textDecoration: "none", color: "#000" }}
      >
        DIIOS de Baja
      </Link>
    </Navbar>
    {children}
  </div>
);
export default DiioMenu;
