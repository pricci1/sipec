import React, { useState, useEffect, useContext } from "react";
import PucharseListDiio from "../../components/Diio/PucharseListDiio";
import APIContext from "../../components/APIProvider";
import { getDiioPurchases } from "../../lib/APIDiio";

const PurchaseListDiioTab = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Inside useEffect with [] as deps to run only once
    // If it's not, there will be infinite request to the backend
    getDiioPurchasesApi();
  }, []);
  async function getDiioPurchasesApi() {
    const data = await getDiioPurchases(api, 1);

    var purchaser_rut = data.establishment.rup;
    var purchaser_name = data.establishment.name;
    setData(
      data.purchases.map(
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

  function getStringState(state) {
    if (state) {
      return "Vendido";
    } else {
      return "Espera";
    }
  }

  return (
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
      title="Lista de Compras DIIO"
    />
  );
};
export default PurchaseListDiioTab;
