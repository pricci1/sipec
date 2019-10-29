import React from "react";
import { MDBDataTable } from "mdbreact";

export const AnimalEstablishmentRegistryTable = ({
  data,
  setModalRegistryId,
  toggleModal
}) => {
  let columnsasd = [
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
      width: 150
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
      width: 150
    },
    {
      label: "Cantidad",
      field: "quantity",
      sort: "asc",
      width: 150
    }
  ];

  let rowsasd = [
    {
      show: (
        <button
          type="button"
          className="btn btn-info btn-sm p-0"
          onClick={() => handleEntryClick(1)}
        >
          &#10010;
        </button>
      ),
      date: "12/12/13",
      rup: "1.1.1.1",
      establishment: "Lo Beltran",
      rut: "",
      mva: "",
      quantity: "3"
    },
    {
      show: (
        <button
          type="button"
          className="btn btn-info btn-sm p-0"
          onClick={() => handleEntryClick(2)}
        >
          &#10010;
        </button>
      ),
      date: "12/12/13",
      rup: "1.1.1.1",
      establishment: "Estancia La Fe",
      rut: "",
      mva: "",
      quantity: "3"
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
    columns: columnsasd,
    rows: rowsasd
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
