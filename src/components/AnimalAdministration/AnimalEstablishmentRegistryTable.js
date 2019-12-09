import React from "react";
import { MDBDataTable } from "mdbreact";

export const AnimalEstablishmentRegistryTable = ({
  headers,
  data,
  setModalRegistryId,
  toggleModal
}) => {
  const handleEntryClick = registryId => {
    setModalRegistryId(registryId);
    toggleModal();
  };

  let columns = [
    {
      label: "Ver",
      field: "ver",
      sort: "asc",
      width: 40
    }
  ];
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
    (item, num) => (
      (jsonRow.ver = (
        <button
          type="button"
          className="btn btn-info btn-sm p-0"
          onClick={() => handleEntryClick(num + 1)}
        >
          <span role="img" aria-label="magGlass">
            &#128269;
          </span>
        </button>
      )),
      columns
        .slice(1)
        .map(
          (col, index) =>
            (jsonRow[String(col.field)] = Object.values(item)[index])
        ),
      rows.push(jsonRow),
      (jsonRow = {})
    )
  );

  const finalData = { columns, rows };
  console.log(finalData);
  const fakeData = {
    columns: [
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
        label: "Establecimiento",
        field: "establishment",
        sort: "asc",
        width: 270
      },
      {
        label: "Titular",
        field: "titular",
        sort: "asc",
        width: 150
      },
      {
        label: "Fecha de Registro",
        field: "register_date",
        sort: "asc",
        width: 150
      },
      {
        label: "Cantidad",
        field: "quantity",
        sort: "asc",
        width: 150
      }
    ],
    rows: [
      {
        show: (
          <button
            type="button"
            className="btn btn-info btn-sm p-0 center"
            onClick={() => handleEntryClick(1)}
          >
            <span role="img" aria-label="magGlass">
              &#128269;
            </span>
          </button>
        ),
        rup: "1.1.1.1",
        establishment: "Lo Beltran",
        titular: "Richard Feynman",
        date: "12/12/13",
        quantity: "13"
      },
      {
        show: (
          <button
            color="primary"
            type="button"
            className="btn btn-info btn-sm p-0"
            onClick={() => handleEntryClick(2)}
          >
            <span role="img" aria-label="magGlass">
              &#128269;
            </span>
          </button>
        ),
        rup: "1.1.1.1",
        establishment: "Estancia La Fe",
        titular: "John Doe",
        date: "12/11/13",
        quantity: "99"
      }
    ]
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
        data={finalData} // TODO: change with 'data'
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
