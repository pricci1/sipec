import React, {useEffect } from "react";
import { MDBDataTable } from "mdbreact";


export const AnimalDownTable = ({ data, setModalRegistryId, toggleModal }) => {
  let rows = [];
  useEffect(() => {
    if (data) {
      
      data.map(d => {
        rows.push({
          diio: d.diio_id,
          specie: d.specie,
          death_date: d.death_date,
          establishment: d.establishment,
          death_motive: d.death_motive
        });
      });
    }
    
  }, [data]);

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
      label: "Fecha de Muerte",
      field: "death_date",
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
      field: "death_motive",
      sort: "asc",
      width: 150
    }
  ];

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
        }} 
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />{" "}
    </>
  );
};
export default AnimalDownTable;
