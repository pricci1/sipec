import React, { useState, useEffect } from "react";
import PucharseListDiio from "../../components/Diio/PucharseListDiio";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link } from "@reach/router";

const InventoryDiioTab = () => {
  const [data, setData] = useState([]);

  const backendUrl = "http://sipec-backend.herokuapp.com";

  //   function getStringState(state) {
  //     if (state) {
  //       return "Vendido";
  //     } else {
  //       return "Espera";
  //     }
  //   }

  async function getDiioPurchases() {
    var diios = [];
    diios = await axios.get(`${backendUrl}/diio_stock_table`);

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
    <Container>
      <Link to="nueva" className="btn btn-primary">
        Nuevo
      </Link>
      <PucharseListDiio
        headers={["Registro", "Comprador", "Fecha", "Nombre"]}
        data={data.map(purchase => [
          purchase.Nregister,
          purchase.vendor_name,
          purchase.buyer_name,
          purchase.date,
          purchase.rup
        ])}
      />
    </Container>
  );
};
export default InventoryDiioTab;
