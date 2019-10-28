import React, { useState, useEffect } from "react";
import AnimalDownDIIO from "../../components/AnimalAdministration/AnimalDownDIIO";
import axios from "axios";
import { Container } from "react-bootstrap";

const AnimalDeathRegistrationTab = () => {
  const [data, setData] = useState([]);

  const backendUrl = "http://sipec-backend.herokuapp.com";

  //   function getStringState(state) {
  //     if (state) {
  //       return "Vendido";
  //     } else {
  //       return "Espera";
  //     }
  //   }

  // async function getDiioPurchases() {
  //   var diios = [];
  //   diios = await axios.get(`${backendUrl}/diio_stock_table`);

  //   setData(
  //     diios.data.map(
  //       ({
  //         Nregister,
  //         vendor: { name: vendor_name, created_at: date },
  //         buyer: { name: buyer_name, rup }
  //       }) => ({
  //         Nregister,
  //         vendor_name,
  //         buyer_name,
  //         date,
  //         rup
  //       })
  //     )
  //   );
  // }

  // async function getDownDIIOs() {
  //   var diios = [];
  //   // diios = await axios.get(`${backendUrl}/diio_stock_table`);
  //   diios = await axios.get(`${backendUrl}/diio_down_table`);

  //   setData(
  //     diios.data.map(
  //       ({
  //         Nregister,
  //         vendor: { name: vendor_name, created_at: date },
  //         buyer: { name: buyer_name, rup }
  //       }) => ({
  //         Nregister,
  //         vendor_name,
  //         buyer_name,
  //         date,
  //         rup
  //       })
  //     )
  //   );
  // }

  useEffect(() => {
    // getDownDIIOs();
  }, []);
  return (
    <Container>
      <AnimalDownDIIO
        headers={[
          "Fecha Registro",
          "RUP",
          "Establecimiento",
          "RUT",
          "MVA",
          "Cantidad"
        ]}
        // data={data.map(purchase => [
        //   purchase.DateRegister,
        //   purchase.Establishment,
        //   purchase.RUT,
        //   purchase.date,
        //   purchase.rup
        // ])}
      />
    </Container>
  );
};
export default AnimalDeathRegistrationTab;