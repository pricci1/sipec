import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { getEstablishmentInfo } from "../../lib/ApiEstablishment";
import APIContext from "../../components/APIProvider";
import EsblishmentInfoTable from "./EstablishmentInfoTable";

const EstablishmentInfo = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  async function getEstablishmentInfoApiConsult(establishmentId) {
    const data = await getEstablishmentInfo(api, establishmentId);
    console.log(data);

    /*setData(
      data
        .map()
    );*/
  }

  return (
    <>
      <h2>Antecedentes de Establecimiento</h2>
      {getEstablishmentInfoApiConsult({ establishmentId })}
      <EsblishmentInfoTable
        headers={[
          "Nombre del establecimiento",
          "RUP",
          "Dirección",
          "Ciudad",
          "Región",
          "Provincia",
          "Comuna",
          "Oficina Sectoral SAG"
        ]}
        data={data.map}
      ></EsblishmentInfoTable>
    </>
  );
};

export default EstablishmentInfo;
