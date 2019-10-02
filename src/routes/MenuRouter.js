import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import DiioMenu from "./DiioMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimalMovementMenu from "./AnimalMovementMenu";
import PucharseListDiio from "../components/Diio/PucharseListDiio";
import NotAppliedDroppedDiio from "../components/Diio/NotAppliedDroppedDiio";
import axios from "axios";

const MenuRouter = () => {
  const [data, setData] = useState([]);

  const backendUrl = "http://sipec-backend.herokuapp.com";

  function getStringState(state) {
    if (state) {
      return "Vendido";
    } else {
      return "Espera";
    }
  }

  async function getDiioPurchases() {
    var diios = [];
    diios = await axios.get(`${backendUrl}/diio_purchases/establishment/1`);

    var purchaser_rut = diios.data.establishment.rup;
    var purchaser_name = diios.data.establishment.name;

    setData(
      diios.data.purchases.map(
        ({
          provider_name,
          purchase: { id, confirmed, brand, created_at: date }
        }) => ({
          provider_name,
          id,
          confirmed,
          brand,
          date,
          purchaser_rut,
          purchaser_name
        })
      )
    );
  }

  useEffect(() => {
    getDiioPurchases();
  }, []);

  return (
    <>
      <div className="col-2">
        <Sidebar />
      </div>
      <main className="col-10">
        <Router>
          <DiioMenu path="/diio">
            <PucharseListDiio
              headers={[
                "Registro",
                "Vendedor",
                "Comprador",
                "Fecha",
                "Estado",
                "RUT Comprador"
              ]}
              data={data.map(purchase => [
                purchase.id,
                purchase.provider_name,
                purchase.purchaser_name,
                purchase.date,
                getStringState(purchase.confirmed),
                purchase.purchaser_rut
              ])}
              path="lista-compra"
            />
            <NotAppliedDroppedDiio path="baja-diios" />
          </DiioMenu>
          <AnimalMovementMenu path="/movimiento-animal"></AnimalMovementMenu>
        </Router>
      </main>
    </>
  );
};
export default MenuRouter;
