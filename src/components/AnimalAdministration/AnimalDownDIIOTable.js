import React from "react";
import { MDBDataTable } from "mdbreact";

export const AnimalEstablishmentRegistryTable = ({
  data,
  setModalRegistryId,
  toggleModal
}) => {
  let columns = [
    {
      label: "DIIO baja",
      field: "diio",
      sort: "asc",
      width: 150
    },
    {
      label: "Especie",
      field: "specie",
      sort: "asc",
      width: 150
    },
    {
      label: "Fecha de Registro",
      field: "date",
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
      label: "Tipo baja",
      field: "down_type",
      sort: "asc",
      width: 150
    },
    {
      label: "Detalle",
      field: "detail",
      sort: "asc",
      width: 150
    }
  ];

  let rows = [
    {
      diio: "diio",
      specie: "specie",
      date: "date",
      establishment: "establishment",
      down_type: "down_type",
      detail: "detail"
    },
    {
      diio: "diio2",
      specie: "specie2",
      date: "date2",
      establishment: "establishment2",
      down_type: "down_type2",
      detail: "detail2"
    }
  ];

  // function getColumnItem(index, item) {
  //   if (index != 0) {
  //     return item[index];
  //   }
  // }

  // function getData() {
  //   var jsonRow = {};
  //   data.map(
  //     item => (
  //       columns.map(
  //         (col, index) =>
  //           (jsonRow[String(col.field)] = getColumnItem(index, item))
  //       ),
  //       rows.push(jsonRow),
  //       (jsonRow = {})
  //     )
  //   );
  // }

  // getData();

  const handleEntryClick = registryId => {
    setModalRegistryId(registryId);
    toggleModal();
  };
  const fakeData = {
    columns: columns,
    rows: rows
  };

  return (
    <>
      <MDBDataTable
        className="data-table"
        striped
        scrollY
        hover
        bordered
        small
        maxHeight="370px"
        header
        data={fakeData} // TODO: change with 'data'
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
