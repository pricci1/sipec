import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

export const ChangeDiioTable = ({
  setModalChangeId,
  toggleModal,
  tableData
}) => {
  const handleEntryClick = changeId => {
    setModalChangeId(changeId);
    toggleModal();
  };
  let rows = [];

  useEffect(() => {
    tableData.map(d => {
      // var new_date = new Date();
      // new_date =
      //   d.date.getFullYear().toString() +
      //   "-" +
      //   (d.date.getMonth() + 1).toString() +
      //   "-" +
      //   d.date.getDate().toString();
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
        date: d.date.split("T")[0],
        establishment: d.establishment,
        rut: d.rut,
        mva: d.mva
      });
    });
  }, [tableData]);

  var columns = [
    {
      label: "Ver",
      field: "show",
      sort: "asc",
      width: 40
    },
    {
      label: "RUP",
      field: "rup",
      sort: "asc",
      width: 150
    },
    {
      label: "Fecha de Registro",
      field: "date",
      sort: "asc",
      width: 100
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

  return (
    <>
      <MDBDataTable
        className="data-table"
        scrollY
        hover
        bordered
        small
        maxHeight="370px"
        data={{ columns: columns, rows: rows }}
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
export default ChangeDiioTable;
