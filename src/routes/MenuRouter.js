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
import AdminAnimalsDiioMenu from "./AdminAnimalsDiioMenu";
import AnimalDeathRegistrationTab from "./AnimalAdministrationMenuTabs/AnimalDeathRegistrationTab";
import CreateNewAnimalDeath from "../components/AnimalAdministration/CreateNewAnimalDeath";

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
          <AdminAnimalsDiioMenu path="/admin-animales-diio">
            <AnimalDeathRegistrationTab path="registro_muerte_animal" />
            <CreateNewAnimalDeath path="registro_muerte_animal/nueva" />
          </AdminAnimalsDiioMenu>
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
