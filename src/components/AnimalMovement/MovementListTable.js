import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

export const MovementListTable = ({
  setModalMovementId,
  toggleModal,
  tableData
}) => {
  const [processedData, setProcessedData] = useState([]);
  const handleEntryClick = movementId => {
    setModalMovementId(movementId);
    toggleModal();
  };
  useEffect(() => {
    setProcessedData(
      tableData.map(data => ({
        id: data.animal_move.id,
        formId: data.animal_move.id,
        formDate: new Date(data.animal_move.created_at).toLocaleDateString(
          "es"
        ),
        origin: `${data.origin_establishment.rup} - ${data.origin_establishment.name}`,
        destiny: `${data.destination_establishment.rup} - ${data.destination_establishment.name}`,
        departure: new Date(data.animal_move.departure).toLocaleDateString(
          "es"
        ),
        arrival: new Date(data.animal_move.arrival).toLocaleDateString("es"),
        status: "Aceptado"
      }))
    );
  }, [tableData]);
  const data = {
    columns: [
      {
        label: " ",
        field: "show",
        width: 40
      },
      {
        label: "N⁰ Formulario",
        field: "formId",
        sort: "asc",
        width: 100
      },
      {
        label: "Fecha Fromulario",
        field: "formDate",
        sort: "asc",
        width: 100
      },
      {
        label: "Establecimiento de Origen",
        field: "origin",
        sort: "asc",
        width: 270
      },
      {
        label: "Establecimiento de Destino",
        field: "destiny",
        sort: "asc",
        width: 270
      },
      {
        label: "Salida",
        field: "departure",
        sort: "asc",
        width: 100
      },
      {
        label: "Llegada",
        field: "arrival",
        sort: "asc",
        width: 100
      },
      {
        label: "Estado",
        field: "status",
        sort: "asc",
        width: 80
      }
    ],
    rows: processedData.map(({ id, ...dataWithoutId }) => ({
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
