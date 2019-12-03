import React from "react";

const EstablishmentSectorsTable = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"> </th>
          <th scope="col">Nombre</th>
          <th scope="col">Pabellones</th>
          <th scope="col">Coord. X</th>
          <th scope="col">Coord. Y</th>
        </tr>
      </thead>
      <tbody>
        {data.map(sector => (
          <tr key={sector.id}>
            <th scope="row">X</th>
            <td>{sector.name}</td>
            <td>{sector.pabellones}</td>
            <td>{sector.coord_x}</td>
            <td>{sector.coord_7}</td>
            <td>{sector.huso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstablishmentSectorsTable;
