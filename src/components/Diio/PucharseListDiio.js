import React from "react";
import { MDBDataTable } from 'mdbreact';
import DiioDetailsModal from "./PucharseDetailsDiio";

const DiioTable = props => {
  const { headers, data } = props;

  let columns = [];
  let rows = [];

  headers.map(header => (
    columns.push({
      label: header, 
      field: header.toLowerCase(), 
      sort: 'asc',
      width: 200})
  ));

  function viewIndex(index, item) {
    if(index == 0){
      return <DiioDetailsModal text={item[index]}/>
    } else {
      return item[index]
    }
  }

  var j = {};
  data.map(item => (
    columns.map((col, index) => (
      j[String(col.field)] = viewIndex(index, item)
    )),
    rows.push(j),
    j = {}
  ));

  const finalData = {columns, rows};
  
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

export default DiioTable;
