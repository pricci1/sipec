import React from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DIIOMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PurchaseListDiioTab from "./DIIOMenuTabs/PurchaseListDiioTab";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import NewPurchaseDiio from "../components/Diio/NewPucharseDiio";
import StockDIIOEstablecimiento from "../pages/stockDIIOEstablecimiento";
import ListadoBajaDIIO from "../components/Diio/listadoBajaDIIO";
import CreateAnimalMoves from "../components/AnimalMoves/CreateAnimalMoves";
import AnimalMoves from "../pages/AnimalMoves";
import AnimalExistence from "../components/AnimalExistence/AnimalExistence";
import AnimalAdministrationDIIOMenu from "./AnimalAdministrationDIIOMenu";
import ConsultDataSingleDiio from "../components/AnimalAdministration/ConsultDataSingleDiio";
import CreateNewAnimalDeath from "../components/AnimalAdministration/CreateNewAnimalDeath";
import AnimalEstablishmentRegistry from "../components/AnimalAdministration/AnimalEstablishmentRegistry";
import NewChangeDiio from "../components/AnimalAdministration/NewChangeDiio";
import CreateNewAnimalRegister from "../components/AnimalAdministration/CreateNewAnimalResgister";
import ChangeDiioList from "../components/AnimalAdministration/ChangeDiioList";
import ConsultDataDiioRange from "../components/AnimalAdministration/ConsultDataDiioRange";
import MyEstablishmentMenu from "./MyEstablishmentMenu";
import EstablishmentPeople from "../components/Establishment/EstablishmentPeople";
import EstablishmentMenu from "./EstablishmentMenu";
import MyEstablishments from "../components/Establishment/MyEstablishments";
import ExternalEstablishments from "../components/Establishment/ExternalEstablishments";
import UpdateTitularData from "../components/Establishment/UpdateTitularData";
import EstablishmentRubros from "../components/Establishment/EstablishmentRubros";
import EstablishmentSpecies from "../components/Establishment/EstablishmentSpecies";
import EstablishmentOtherData from "../components/Establishment/EstablishmentOtherData";
import AnimalMovement from "../components/AnimalMovement/AnimalMovement";
import AnimalDownDIIO from "../components/AnimalAdministration/AnimalDownDIIO";

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
            <NotAppliedDroppedDiio path="baja-diios" />
            <ListadoBajaDIIO path="lista-baja-diios" />
          </DiioMenu>
          <AnimalAdministrationDIIOMenu path="/animal-diio">
            <AnimalEstablishmentRegistry path="animales" />
            <CreateNewAnimalRegister path="animales/new" />
            <ConsultDataSingleDiio path="consulta-un-diio" />
            <ConsultDataDiioRange path="consulta-grupo-diio" />
            <AnimalDownDIIO path="registro-muerte-animal" />
            <CreateNewAnimalDeath path="registro-muerte-animal/nueva" />
            <ChangeDiioList path="cambio-diio" />
            <NewChangeDiio path="cambio-diio/new" />
          </AnimalAdministrationDIIOMenu>
          <AnimalMovement path="movimientos/*" />
          <AnimalExistence path="existencias/*" />
          <EstablishmentMenu path="establecimientos">
            <MyEstablishments path="mis-establecimientos" />
            <ExternalEstablishments path="establecimientos-externos" />
            <UpdateTitularData path="mis-datos" />
          </EstablishmentMenu>
          <MyEstablishmentMenu path="/establecimiento/:establishmentId">
            <EstablishmentPeople path="personas" />
            <EstablishmentRubros path="rubros" />
            <EstablishmentSpecies path="especies" />
            <EstablishmentOtherData path="otros-datos" />
          </MyEstablishmentMenu>
        </Router>
      </main>
    </>
  );
};
export default MenuRouter;
