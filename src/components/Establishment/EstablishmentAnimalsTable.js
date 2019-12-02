import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";

const EstablishmentAnimalsTable = props => {
  const { headers, data, title } = props;

  let columns = [];
  let rows = [];

  headers.map(header =>
    columns.push({
      label: header,
      field: header.toLowerCase(),
      sort: "asc",
      width: 200
    })
  );

  var jsonRow = {};
  data.map(
    item => (
      columns.map((col, index) => (jsonRow[String(col.field)] = item[index])),
      rows.push(jsonRow),
      (jsonRow = {})
    )
  );

  const finalData = { columns, rows };

  return (
    <>
      <h2>{title}</h2>
      <MDBDataTable
        className="data-table"
        striped
        scrollY
        hover
        bordered
        small
        maxHeight="370px"
        data={finalData}
        entriesLabel={["Mostrar entradas"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Buscar"]}
      />
    </>
  );
};

export default EstablishmentAnimalsTable;
