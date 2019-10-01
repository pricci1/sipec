import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DiioMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";

const MenuRouter = () => (
  <>
    <div className="col-2">
      <Sidebar />
    </div>
    <main className="col-10">
      <Router>
        <DiioMenu path="/consulta-diio" />
        <AnimalMovementMenu path="/movimientos" />
      </Router>
    </main>
  </>
);
export default MenuRouter;
