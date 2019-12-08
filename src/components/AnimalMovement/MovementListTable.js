import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "@reach/router";

export const MovementListTable = ({
  setModalMovementId,
  toggleModal,
  tableData
}) => {
  const handleEntryClick = movementId => {
    setModalMovementId(movementId);
    toggleModal();
  };
  const data = {
    columns: [
      {
        label: " ",
        field: "show",
        width: 40
      },
      {
        label: "N⁰ Formulario",
        field: "rup",
        sort: "asc",
        width: 100
      },
      {
        label: "Fecha Fromulario",
        field: "inscriptionDate",
        sort: "asc",
        width: 100
      },
      {
        label: "Establecimiento de Origen",
        field: "name",
        sort: "asc",
        width: 270
      },
      {
        label: "Establecimiento de Destino",
        field: "titular",
        sort: "asc",
        width: 150
      },
      {
        label: "Salida",
        field: "neighborhood",
        sort: "asc",
        width: 150
      },
      {
        label: "Llegada",
        field: "sagBlocked",
        sort: "asc",
        width: 100
      },
      {
        label: "Estado",
        field: "anabolics",
        sort: "asc",
        width: 100
      }
    ],
    rows: tableData.map(({ id, ...dataWithoutId }) => ({
      show: (
        <span className="btn-group">
          <button
            type="button"
            className="btn btn-info btn-sm p-0"
            onClick={() => handleEntryClick(id)}
            style={{ fontFamily: "serif" }}
          >
            👁
          </button>
          <Link
            to={`/establecimiento/${id}`}
            className="btn btn-info btn-sm p-0"
          >
            🖉
          </Link>
        </span>
      ),
      ...dataWithoutId
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
