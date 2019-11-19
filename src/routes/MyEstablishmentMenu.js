import React, { useState, useEffect } from "react";
import { Link, Location } from "@reach/router";
import { ButtonGroup } from "react-bootstrap";
import "./DIIOMenu.css";
import "./ArrowButtons.css";

const menuLinks = [
  { text: "Personas", linkTo: "personas" },
  { text: "Especies", linkTo: "especies" },
  { text: "Rubros", linkTo: "rubros" },
  { text: "Otros datos", linkTo: "otros-datos" }
];

const MyEstablishmentMenu = ({ children, establishmentId }) => {
  const [establishmentName, setEstablishmentName] = useState();
  useEffect(() => {
    // TODO: Get establishment's name from backend (using establishmentId)
    setTimeout(() => {
      setEstablishmentName("Estancia Las Palmas");
    }, 500);
  }, []);
  return (
    <div>
      <div className="row">
        <div className=" d-flex flex-column">
          <Location>
            {({ location: { pathname } }) => {
              return (
                <>
                  <ul className="arrows">
                    <li>
                      <Link to="/establecimientos/mis-establecimientos">
                        Establecimientos Asociados &nbsp;
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        {establishmentName || "Cargando nombre..."} &nbsp;
                      </Link>
                    </li>
                  </ul>
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
                </>
              );
            }}
          </Location>
        </div>
        <div className="col-md-4"></div>
      </div>
      {children}
    </div>
  );
};

export default MyEstablishmentMenu;
