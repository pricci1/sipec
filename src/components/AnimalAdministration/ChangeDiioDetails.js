import React, { useContext } from "react";
import {getChangeRegistryDataApi} from "../../lib/ApiAnimalAdministration";
import ApiContext from "../APIProvider";
import { MDBDataTable } from "mdbreact";

const ChangeDiioDetails = ({ changeId }) => {
  const api = useContext(ApiContext);
  async function getModalData() {
    const data = await getChangeRegistryDataApi(api, changeId);
    return data;
  }

  const modalData = getModalData();

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
            <td>modalData.mva</td>
          </tr>
          <tr>
            <th className="text-nowrap">Especie</th>
            <td>modalData.specie</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha registro</th>
            <td>modalData.date</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Aplicacion</th>
            <td>modalData.verification</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>modalData.establishment</td>
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
        data={{ columns: columns, rows: modalData.changes }}
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
export default ChangeDiioDetails;