import React from "react";
import { Link } from "@reach/router";
import { ButtonGroup } from "react-bootstrap";

const DiioMenu = ({ children }) => (
  <div>
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-6 d-flex flex-column">
        <ButtonGroup>
          <Link
            to="lista-compra"
            className="btn btn-danger"
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            Lista Compra
          </Link>
          <Link
            to="compra"
            className="btn btn-danger"
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            Compra
          </Link>
          <Link
            to="inventario"
            className="btn btn-danger"
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            Inventario
          </Link>
          <Link
            to="baja-diios"
            className="btn btn-danger"
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            DIIOS de Baja
          </Link>
        </ButtonGroup>
      </div>
      <div className="col-md-4"></div>
    </div>
    {children}
  </div>
);
export default DiioMenu;
