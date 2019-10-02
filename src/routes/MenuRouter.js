import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DIIOMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PucharseListDiio from "../components/Diio/PucharseListDiio";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";

const props = { headers: ["a", "b"], data: ["data a", "data b"] };
const MenuRouter = () => (
  <>
    <div className="col-2">
      <Sidebar />
    </div>
    <main className="col-10">
      <Router>
        <DiioMenu path="/diio">
          <PucharseListDiio props={props} path="lista-compra" />
          <NotAppliedDroppedDiio path="baja-diios" />
        </DiioMenu>
        <AnimalMovementMenu path="/movimiento-animal"></AnimalMovementMenu>
      </Router>
    </main>
  </>
);
export default MenuRouter;
