import React, { useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

export const DropedDiioTable = ({
  tableData
}) => {
 
  let rows = [];
  useEffect(() => {
    tableData.map(d => {
      rows.push({
        diio_id: d.diio_id,
        drop_cause: d.drop_cause,
        specie: d.specie,
        date: d.date
        
      });
    });
  }, [tableData]);

  
  var columns = [
    {
      label: "DIIO",
      field: "diio_id",
      sort: "asc",
      width: 40
    },
    {
      label: "Motivo",
      field: "drop_cause",
      sort: "asc",
      width: 100
    },
    {
      label: "Especie",
      field: "specie",
      sort: "asc",
      width: 150
    },
    {
      label: "Fecha",
      field: "date",
      sort: "asc",
      width: 270
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
export default DropedDiioTable;
