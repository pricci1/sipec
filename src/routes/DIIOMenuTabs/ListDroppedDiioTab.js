import React, { useState, useEffect } from "react";
import PucharseListDiio from "../../components/Diio/PucharseListDiio";

const InventoryDiioTab = () => {
  const [data, setData] = useState([]);

  //   function getStringState(state) {
  //     if (state) {
  //       return "Vendido";
  //     } else {
  //       return "Espera";
  //     }
  //   }

  async function getDiioPurchases() {
    var diios = [];

    setData(
      diios.data.map(
        ({
          Nregister,
          vendor: { name: vendor_name, created_at: date },
          buyer: { name: buyer_name, rup }
        }) => ({
          Nregister,
          vendor_name,
          buyer_name,
          date,
          rup
        })
      )
    );
  }

  useEffect(() => {
    getDiioPurchases();
  }, []);
  return (
    <PucharseListDiio
      headers={["DIIO", "Motivo", "Especie", "Fecha"]}
      data={data.map(purchase => [
        purchase.Nregister,
        purchase.vendor_name,
        purchase.buyer_name,
        purchase.date,
        purchase.rup
      ])}
    />
  );
};
export default InventoryDiioTab;
