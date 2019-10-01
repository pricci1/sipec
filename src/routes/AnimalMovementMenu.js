import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const AnimalMovementMenu = () => {
  return (
    <div>
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Button>Animales con DIIO</Button>
          <Button>Animales por lote</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AnimalMovementMenu;
