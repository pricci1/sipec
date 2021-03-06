import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";

const DiioRangeTable = props => {
  const { headers, data, title } = props;

  const [show, setShow] = useState(false);
  const [DiioId, setDiioId] = useState(0);

  const handleShowMessageClick = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  const handleModal = props => {
    handleShowMessageClick();
    setDiioId(props);
  };

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

  function getColumnItem(index, item) {
    if (index == 0) {
      return (
        <a style={{ color: "blue" }} onClick={() => handleModal(item[index])}>
          <b>{item[index]}</b>
        </a>
      );
    } else {
      return item[index];
    }
  }

  var jsonRow = {};
  data.map(
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

export default DiioRangeTable;
