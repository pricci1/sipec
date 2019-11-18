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
import AnimalExistence from "../components/AnimalExistence/AnimalExistence";
import AnimalAdministrationDIIOMenu from "./AnimalAdministrationDIIOMenu";
import ConsultDataSingleDiio from "../components/AnimalAdministration/ConsultDataSingleDiio";
import AnimalDeathRegistrationTab from "./AnimalAdministrationMenuTabs/AnimalDeathRegistrationTab";
import CreateNewAnimalDeath from "../components/AnimalAdministration/CreateNewAnimalDeath";
import AnimalEstablishmentRegistry from "../components/AnimalAdministration/AnimalEstablishmentRegistry";
import NewChangeDiio from "../components/AnimalAdministration/NewChangeDiio";
import CreateNewAnimalRegister from "../components/AnimalAdministration/CreateNewAnimalResgister";
import ChangeDiioList from "../components/AnimalAdministration/ChangeDiioList";
import ConsultDataDiioRange from "../components/AnimalAdministration/ConsultDataDiioRange";
import EstablishmentMenu from "./EstablishmentMenu";
import EstablishmentPeople from "../components/Establishment/EstablishmentPeople";

const MenuRouter = () => {
  return (
    <>
      <div style={{ padding: "0px" }} className="col-2">
        <Sidebar />
      </div>
      <main className="col-10">
        <Router className="m-2">
          <DiioMenu path="/diio">
            <PurchaseListDiioTab path="lista-compra" />
            <NewPurchaseDiio path="compra" />
            <StockDIIOEstablecimiento path="inventario" />
            <NotAppliedDroppedDiio path="baja-diios" />
            <ListadoBajaDIIO path="lista-baja-diios" />
          </DiioMenu>
          <AnimalAdministrationDIIOMenu path="/animal-diio">
            <AnimalEstablishmentRegistry path="animales" />
            <CreateNewAnimalRegister path="animales/new" />
            <ConsultDataSingleDiio path="consulta-un-diio" />
            <ConsultDataDiioRange path="consulta-grupo-diio" />
            <AnimalDeathRegistrationTab path="registro-muerte-animal" />
            <CreateNewAnimalDeath path="registro-muerte-animal/nueva" />
            <ChangeDiioList path="cambio-diio" />
            <NewChangeDiio path="cambio-diio/new" />
          </AnimalAdministrationDIIOMenu>
          <AnimalMovementMenu path="/movimientos">
            <CreateAnimalMoves path="create_animal_moves" />
            <AnimalMoves path="animal_moves" />
          </AnimalMovementMenu>
          <AnimalExistence path="existencias/*" />
          <EstablishmentMenu path="establecimientos">
            <EstablishmentPeople path="personas" />
          </EstablishmentMenu>
        </Router>
      </main>
    </>
  );
};
export default MenuRouter;
