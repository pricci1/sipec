import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DIIOMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PurchaseListDiioTab from "./DIIOMenuTabs/PurchaseListDiioTab"
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import NewPurchaseDiio from "../components/Diio/NewPucharseDiio";

const MenuRouter = () => {
  return (
    <>
      <div style={{ padding: "0px" }} className="col-2">
        <Sidebar />
      </div>
      <main className="col-10">
        <Router>
          <DiioMenu path="/diio">
            <PurchaseListDiioTab
              path="lista-compra"
            />
            <NewPurchaseDiio path="compra"/>
            <NotAppliedDroppedDiio path="baja-diios" />
          </DiioMenu>
          <AnimalMovementMenu path="/movimiento-animal"></AnimalMovementMenu>
        </Router>
      </main>
    </>
  );
};
export default MenuRouter;
