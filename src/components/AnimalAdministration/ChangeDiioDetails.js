import React, { useContext, useEffect, useState } from "react";
import {getChangeRegistryDataApi} from "../../lib/ApiAnimalAdministration";
import ApiContext from "../APIProvider";
import { MDBDataTable } from "mdbreact";

const ChangeDiioDetails = ({ changeId }) => {
  const api = useContext(ApiContext);
  const [modaldata, setmodaldata] = useState({});


  async function getModalData() {
    const data = await getChangeRegistryDataApi(api, changeId);
    console.log();
    
    setmodaldata(data);
  }

  

  useEffect(() => {
    getModalData();
  }, []);
  const columns = [
    {
      label: "DIIO antiguo",
      field: "previous_diio",
      sort: "asc",
      width: 40
    },
    {
      label: "DIIO nuevo",
      field: "new_diio",
      sort: "asc",
      width: 40
    }
  ];

  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-nowrap">MVA o tercer acreditado</th>
            <td>{modaldata.mva}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Especie</th>
            <td>{modaldata.specie}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha registro</th>
            <td>{modaldata.date}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Aplicacion</th>
            <td>{modaldata.verification}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>{modaldata.establishment}</td>
          </tr>
        </tbody>
      </table>
      <MDBDataTable
        className="data-table"
        stripped
        scrollY
        hover
        bordered
        small
        maxHeight="250px"
        data={{ columns: columns, rows: modaldata.changes}}
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
export default ChangeDiioDetails;