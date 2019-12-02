import React from "react";
import { MDBDataTable } from "mdbreact";

export const DeclarationsTable = ({
  setModalDeclarationId,
  toggleModal,
  tableData
}) => {
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
        field: "neighborhood",
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
    rows: tableData.map(data => ({
      show: (
        <button
          type="button"
          className="btn btn-info btn-sm p-0"
          onClick={() => handleEntryClick(data.id)}
        >
          &#10010;
        </button>
      ),
      ...data
    }))
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
