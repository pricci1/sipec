import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import DiioTable from "../components/Diio/PucharseListDiio";
const AnimalMovementMenu = () => {
  const propsDiio = { headers: ["a", "b"], data: ["data a", "data b"] };
  return (
    <div>
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AnimalMovementMenu;
