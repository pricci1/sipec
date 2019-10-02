import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DIIOMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PucharseListDiio from "../components/Diio/PucharseListDiio";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import CreateAnimalMoves from "../components/AnimalMoves/CreateAnimalMoves"

const props = { headers: ["a", "b"], data: ["data a", "data b"] };
const MenuRouter = () => (
  <>
    <div style={{ padding: "0px" }} className="col-2">
      <Sidebar />
    </div>
    <main className="col-10">
      <Router>
        <DiioMenu path="/diio">
          <PucharseListDiio props={props} path="lista-compra" />
          <NotAppliedDroppedDiio path="baja-diios" />
        </DiioMenu>
        <AnimalMovementMenu path="/movimientos">
          <CreateAnimalMoves path='create_animal_moves' />
        </AnimalMovementMenu>
      </Router>
    </main>
  </>
);
export default MenuRouter;
