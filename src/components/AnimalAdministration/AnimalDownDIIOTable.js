import React, { useContext } from "react";
import { MDBDataTable } from "mdbreact";
import ApiContext from "../APIProvider";
import { getAnimalDeathTableApi } from "../../lib/ApiAnimalAdministration";

export const AnimalEstablishmentRegistryTable = ({
  data,
  setModalRegistryId,
  toggleModal
}) => {
  const api = useContext(ApiContext);
  var columns = [
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
    // {
    //   label: "MVA",
    //   field: "veterinario",
    //   sort: "asc",
    //   width: 150
    // },
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
  async function getAnimalDeathTable() {
    console.log(data);
    let rows = [];

    data.map(animals => {
      // console.log(animals);
      // console.log(
      //   "diio:" + animals.diio,
      //   "specie:" + animals.specie,
      //   "date:" + animals.date,
      //   "establishment:" + animals.establishment.name,
      //   "down_type:" + animals.down_type,
      //   "detail:" + animals.detail
      // );
      rows.push({
        diio: animals.diio,
        specie: animals.specie,
        date: animals.date,
        establishment: animals.establishment.name,
        down_type: animals.down_type,
        detail: animals.detail
      });
    });
    return rows;
  }
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
        data={{ columns: columns, rows: getAnimalDeathTable() }} // TODO: change with 'data'
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
