import React, { useState, useEffect, useContext } from "react";
import { Link, Location } from "@reach/router";
import { ButtonGroup } from "react-bootstrap";
import "./DIIOMenu.css";
import "./ArrowButtons.css";
import { getEstablishmentByIdApi } from "../lib/ApiEstablishment";
import APIContext from "../components/APIProvider";

const menuLinks = [
  { text: "Personas", linkTo: "personas" },
  { text: "Especies", linkTo: "especies" },
  { text: "Rubros", linkTo: "rubros" },
  { text: "Otros datos", linkTo: "otros-datos" }
];

const MyEstablishmentMenu = ({ children, establishmentId }) => {
  const api = useContext(APIContext);
  const [establishmentName, setEstablishmentName] = useState("");
  useEffect(() => {
    getEstablishmentById();
  }, [establishmentName]);

  async function getEstablishmentById() {
    const data = await getEstablishmentByIdApi(api, establishmentId);
    if (!data) {
      setEstablishmentName("Default");
    } else {
      setEstablishmentName(data.name);
    }
  }
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
