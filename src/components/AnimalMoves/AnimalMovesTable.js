import React from "react";
import { MDBDataTable } from 'mdbreact';
import ModalAnimalMoves from "./ModalAnimalMoves";

const AnimalMovesTable = props => {
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

  function getColumnItem(index, item) {
    if(index == 0){
      return <ModalAnimalMoves text={item[index]}/>
    } else {
      return item[index]
    }
  }

  var jsonRow = {};
  data.map(item => (
    columns.map((col, index) => (
      jsonRow[String(col.field)] = getColumnItem(index, item)
    )),
    rows.push(jsonRow),
    jsonRow = {}
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

export default AnimalMovesTable;