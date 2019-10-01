import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import DiioTable from "../components/Diio/PucharseListDiio";
import { Router, Link } from "@reach/router";
import NewPucharseDiio from "../components/Diio/NewPucharseDiio";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import PucharseListDiio from "../components/Diio/PucharseListDiio";
const MenuDiio = () => {
  const props = { headers: ["a", "b"], data: ["data a", "data b"] };
  return (
    <div>
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Link to="/consulta-diio/diios-no-aplicados">
            <Button>Inventario</Button>
          </Link>
          <Link to="/consulta-diio/nueva-compra">
            <Button>Compra</Button>
          </Link>
        </ButtonGroup>
      </div>
      <DiioTable props={props} />
      <Router>
        <NewPucharseDiio path="/consulta-diio/nueva-compra" />
        <NotAppliedDroppedDiio path="/consulta-diio/diios-no-aplicados" />
      </Router>
    </div>
  );
};

export default MenuDiio;
