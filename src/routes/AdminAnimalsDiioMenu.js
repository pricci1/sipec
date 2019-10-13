import React from "react";
import { Link, Location } from "@reach/router";
import { ButtonGroup } from "react-bootstrap";

const menuLinks = [
  { text: "Muerte Animal", linkTo: "animal_death_registration" }
];
// const menuLinks2=[
//     { text: "Nueva muerte lml", linkTo: "new_diio_unsuscribe"}
// ];

const DiioMenu = ({ children }) => (
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
export default DiioMenu;
