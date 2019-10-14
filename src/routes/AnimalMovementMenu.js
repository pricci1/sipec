import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "@reach/router";

const AnimalMovementMenu = ({ children }) => {
  return (
    <div>
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Link
            to="create_animal_moves"
            className="btn btn-primary"
            style={{ margin: 5 }}
          >
            Crear movimiento animal
          </Link>
          <Link
            to="animal_moves"
            className="btn btn-primary"
            style={{ margin: 5 }}
          >
            Listado de movimiento animal
          </Link>
        </ButtonGroup>
      </div>
      {children}
    </div>
  );
};

export default AnimalMovementMenu;
