import React from "react";
import { Link, Location } from "@reach/router";
import "./sidebar.css";

const Sidebar = () => {
  const pageLinks = [
    { text: "Administración DIIOs", linkTo: "/diio/lista-compra" },
    { text: "Administración animal con DIIO", linkTo: "/animal-diio/animales" },
    {
      text: "Establecimiento",
      linkTo: "/establecimientos/mis-establecimientos"
    },
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
                      pathname.split("/")[1] === linkTo.split("/")[1] ||
                      (pathname.split("/")[1] === "establecimiento" &&
                        linkTo.split("/")[1] === "establecimientos")
                        ? "active"
                        : ""
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
