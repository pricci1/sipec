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
import ConsultDataSingleDiio from "../components/AnimalAdministration/ConsultDataSingleDiio";
import AnimalDeathRegistrationTab from "./AnimalAdministrationMenuTabs/AnimalDeathRegistrationTab";
import CreateNewAnimalDeath from "../components/AnimalAdministration/CreateNewAnimalDeath";
import AnimalEstablishmentRegistry from "../components/AnimalAdministration/AnimalEstablishmentRegistry";
<<<<<<< HEAD
import NewChangeDiio from "../components/AnimalAdministration/NewChangeDiio";
=======
import ChangeDiio from "../components/AnimalAdministration/ChangeDiio";
import CreateNewAnimalRegister from "../components/AnimalAdministration/CreateNewAnimalResgister";
>>>>>>> bf427304762ad81f29923e563d16f7f4f8a0d2fb
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
            <AnimalEstablishmentRegistry path="animales" />
            <CreateNewAnimalRegister path="animales/new"/>
            <ConsultDataSingleDiio path="consulta-un-diio" />
            <AnimalDeathRegistrationTab path="registro-muerte-animal" />
            <CreateNewAnimalDeath path="registro-muerte-animal/nueva" />
          	<NewChangeDiio path="cambio-diio"/>
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
