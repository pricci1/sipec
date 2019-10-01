import React from "react";
import { Link, Location } from "@reach/router";
import "./sidebar.css";

const Sidebar = () => {
  const pageLinks = [
    { text: "Administración DIIOs", linkTo: "/consulta-diio" },
    { text: "Administración animal con DIIO", linkTo: "/animal-diio" },
    { text: "Establecimiento", linkTo: "/establecimientos" },
    { text: "Existencias animales", linkTo: "/existencias" },
    { text: "Movimientos animales", linkTo: "/movimientos" }
  ];

  return (
    <Location>
      {({ location: { pathname } }) => (
        <nav className="bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {pageLinks.map(({ text, linkTo }, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === linkTo ? "active" : ""
                    }`}
                    to={linkTo}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </Location>
  );
};

export default Sidebar;
