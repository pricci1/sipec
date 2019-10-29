import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DIIOMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PurchaseListDiioTab from "./DIIOMenuTabs/PurchaseListDiioTab";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import NewPurchaseDiio from "../components/Diio/NewPucharseDiio";
import StockDIIOEstablecimiento from "../pages/stockDIIOEstablecimiento";
import ListadoBajaDIIO from "../pages/listadoBajaDIIO";
import CreateAnimalMoves from "../components/AnimalMoves/CreateAnimalMoves";
import AnimalMoves from "../pages/AnimalMoves";
import AnimalAdministrationDIIOMenu from "./AnimalAdministrationDIIOMenu";
import ConsultDataSingleDiio from "../components/AnimalAdmin/ConsultDataSingleDiio";
import ConsultDataDiioRange from "../components/AnimalAdmin/ConsultDataDiioRange";

const MenuRouter = () => {
  return (
    <>
      <div style={{ padding: "0px" }} className="col-2">
        <Sidebar />
      </div>
      <main className="col-10">
        <Router>
          <DiioMenu path="/diio">
            <PurchaseListDiioTab path="lista-compra" />
            <NewPurchaseDiio path="compra" />
            <StockDIIOEstablecimiento path="inventario" />
            <NotAppliedDroppedDiio path="baja-diios" />
            <ListadoBajaDIIO path="lista-baja-diios" />
          </DiioMenu>
          <AnimalAdministrationDIIOMenu path="/animal-diio">
            <ConsultDataSingleDiio path="consulta-un-diio" />
            <ConsultDataDiioRange path="consulta-grupo-diio" />
          </AnimalAdministrationDIIOMenu>
          <AnimalMovementMenu path="/movimientos">
            <CreateAnimalMoves path="create_animal_moves" />
            <AnimalMoves path="animal_moves" />
          </AnimalMovementMenu>
        </Router>
      </main>
    </>
  );
};
export default MenuRouter;
