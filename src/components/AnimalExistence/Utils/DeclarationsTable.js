import React from "react";
import { MDBDataTable } from "mdbreact";

export const DeclarationsTable = ({ setModalDeclarationId, toggleModal }) => {
  const handleEntryClick = declarationId => {
    setModalDeclarationId(declarationId);
    toggleModal();
  };
  const data = {
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
        label: "Nombre",
        field: "name",
        sort: "asc",
        width: 270
      },
      {
        label: "Comuna",
        field: "comuna",
        sort: "asc",
        width: 150
      },
      {
        label: "Fecha de Declaración",
        field: "declarationDate",
        sort: "asc",
        width: 150
      },
      {
        label: "Fecha de Registro",
        field: "registrationDate",
        sort: "asc",
        width: 150
      },
      {
        label: "Tipo",
        field: "type",
        sort: "asc",
        width: 150
      },
      {
        label: "Periodo",
        field: "year",
        sort: "asc",
        width: 150
      }
    ],
    rows: [
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
        rup: "1.1.1.1",
        name: "Tiger Nixon",
        comuna: "Santiago",
        declarationDate: "12/12/12",
        registrationDate: "12/12/12",
        type: "Anual",
        year: "2012"
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
        rup: "1.1.1.2",
        name: "Tiger Woods",
        comuna: "Las Condes",
        declarationDate: "12/12/13",
        registrationDate: "12/12/13",
        type: "Anual",
        year: "2013"
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
        data={data}
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
