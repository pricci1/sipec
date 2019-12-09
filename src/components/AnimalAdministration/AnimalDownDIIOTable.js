import React, { useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import ApiContext from "../APIProvider";
import {
  getAnimalDeathTableApi,
  getAnimalDeathTableFilteredApi
} from "../../lib/ApiAnimalAdministration";

export const AnimalDownTable = ({
  data,
  setModalRegistryId,
  toggleModal
}) => {
  const api = useContext(ApiContext);
  var columns = [
    {
      label: "DIIO",
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
  let rows = [];

  useEffect(() => {
    data.map(animals => {
      rows.push({
        diio: animals.diio,
        specie: animals.specie,
        date: animals.date,
        establishment: animals.establishment.name,
        down_type: animals.down_type,
        detail: animals.detail
      });
    });
  }, [data]);

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
        data={{
          columns: columns,
          rows: rows
        }} // TODO: change with 'data'
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />{" "}
    </>
  );
};
export default AnimalDownTable;