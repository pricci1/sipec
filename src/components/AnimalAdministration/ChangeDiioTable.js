import React, { useContext } from "react";
import { MDBDataTable } from "mdbreact";
import ApiContext from "../APIProvider";
import { getChangeDiioDataApi } from "../../lib/ApiAnimalAdministration";

export const ChangeDiioTable = ({ setModalChangeId, toggleModal }) => {
  const handleEntryClick = changeId => {
    setModalChangeId(changeId);
    toggleModal();
  };
  const api = useContext(ApiContext);
  var columns = [
    {
      label: "Ver",
      field: "show",
      sort: "asc",
      width: 40
    },
    {
      label: "Fecha de Registro",
      field: "date",
      sort: "asc",
      width: 100
    },
    {
      label: "RUP",
      field: "rup",
      sort: "asc",
      width: 150
    },
    {
      label: "Establecimiento",
      field: "establishment",
      sort: "asc",
      width: 270
    },
    {
      label: "RUT",
      field: "rut",
      sort: "asc",
      width: 150
    },
    {
      label: "MVA",
      field: "mva",
      sort: "asc",
      width: 200
    }
  ];
  async function getChangeDiioData() {
    const data = await getChangeDiioDataApi(api, api.titular.id);
    let rows = [];

    data.map(d => {
      rows.push({
        show: (
          <button
            type="button"
            className="btn btn-info btn-sm p-0"
            onClick={() => handleEntryClick(d.id)}
          >
            &#10010;
          </button>
        ),
        rup: d.rup,
        date: d.date,
        establishment: d.establishment,
        rut: d.rut,
        mva: d.mva
      });
    });

    return rows;
  }
  return (
    <>
      <MDBDataTable
        className="data-table"
        stripped
        scrollY
        hover
        bordered
        small
        maxHeight="370px"
        data={{ columns: columns, rows: getChangeDiioData() }}
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
export default ChangeDiioTable;