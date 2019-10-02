import React from "react";
import { MDBDataTable } from "mdbreact";
import PucharseDetailsDiioModal from "./PucharseDetailsDiioModal";

const PucharseListDiio = props => {
  let columns = [];
  let rows = [];

  props.props.headers.map(header =>
    columns.push({
      label: header,
      field: header.toLowerCase(),
      sort: "asc",
      width: 200
    })
  );

  function getColumnItem(index, item) {
    if (index == 0) {
      return <PucharseDetailsDiioModal text={item[index]} />;
    } else {
      return item[index];
    }
  }

  var jsonRow = {};
  props.props.data.map(
    item => (
      columns.map(
        (col, index) =>
          (jsonRow[String(col.field)] = getColumnItem(index, item))
      ),
      rows.push(jsonRow),
      (jsonRow = {})
    )
  );

  const finalData = { columns, rows };

  return (
    <MDBDataTable
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
  );
};

export default PucharseListDiio;
