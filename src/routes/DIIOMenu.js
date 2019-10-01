import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import DiioTable from "../components/Diio/PucharseListDiio";
import { Router, Link } from "@reach/router";
import NewPucharseDiio from "../components/Diio/NewPucharseDiio";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import Menu from "../components/Menu/Menu";

const DiioMenu = () => {
  const props = [
    { text: "Administración DIIOs", linkTo: "/consulta-diio" },
    { text: "Administración animal con DIIO", linkTo: "/animal-diio" },
    { text: "Establecimiento", linkTo: "/establecimientos" },
    { text: "Existencias animales", linkTo: "/existencias" },
    { text: "Movimientos animales", linkTo: "/movimientos" }
  ];
  return (
    <div>
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Link to="/consulta-diio/index">
            <Button>Inventario</Button>
          </Link>
          <Link to="/consulta-diio/diios-no-aplicados">
            <Button>Inventario</Button>
          </Link>
          <Link to="/consulta-diio/nueva-compra">
            <Button>Compra</Button>
          </Link>
        </ButtonGroup>
      </div>
      <div>
        <Router>
          <DiioTable path="/consulta-diio/index" props={props} />
          <NewPucharseDiio path="/consulta-diio/nueva-compra" />
          <NotAppliedDroppedDiio path="/consulta-diio/diios-no-aplicados" />
        </Router>
      </div>
    </div>
  );
};

export default DiioMenu;
