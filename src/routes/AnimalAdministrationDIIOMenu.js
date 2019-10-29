import React from "react";
import { Link, Location } from "@reach/router";
import { ButtonGroup } from "react-bootstrap";
import "./DIIOMenu.css";

const menuLinks = [
  { text: "Animales", linkTo: "animales" },
  { text: "Cambio de DIIO", linkTo: "cambio-diio" },
  { text: "Muerte Animal", linkTo: "muerte-animal" },
  { text: "Consultar datos DIIO", linkTo: "consulta-un-diio" },
  { text: "Consultar datos grupo DIIO", linkTo: "consulta-grupo-diio" }
];

const AnimalAdministrationDIIOMenu = ({ children }) => (
  <div>
    <div className="row">
      <div className=" d-flex flex-column">
        <Location>
          {({ location: { pathname } }) => {
            return (
              <ButtonGroup>
                {menuLinks.map(({ text, linkTo }) => {
                  return (
                    <Link
                      key={linkTo}
                      className={`btn btn-danger ${
                        // get the last part of current path
                        pathname.split("/").slice(-1)[0] === linkTo
                          ? "active"
                          : ""
                      }`}
                      to={linkTo}
                    >
                      {text}
                    </Link>
                  );
                })}
              </ButtonGroup>
            );
          }}
        </Location>
      </div>
      <div className="col-md-4"></div>
    </div>
    {children}
  </div>
);

export default AnimalAdministrationDIIOMenu;
