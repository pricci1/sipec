import React, { useState } from "react";
import { Link } from "@reach/router";
import "./sidebar.css";

const Sidebar = () => {
  const [visible, setVisible] = useState(true);

  return (
    <nav
      className="bg-light sidebar"
      style={{ width: visible ? "100%" : "5%" }}
    >
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/consulta-diio">
              Administración DIIOs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Administración animal con DIIO
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Establecimiento
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Existencias animales
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Movimientos animales
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
