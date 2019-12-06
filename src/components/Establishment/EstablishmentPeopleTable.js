import React from "react";

const EstablishmentPeopleTable = ({ data, deleteCallback }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"> </th>
          <th scope="col">RUT</th>
          <th scope="col">Nombre</th>
          <th scope="col">Rol</th>
          <th scope="col">Fecha de término</th>
        </tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.id}>
            <th scope="row">
              <button
                className="btn btn-danger p-0"
                onClick={e => {
                  deleteCallback(e, person.id);
                }}
              >
                X
              </button>
            </th>
            <td>{person.run}</td>
            <td>{person.name}</td>
            <td>{person.person_role.name}</td>
            <td>{person.rol || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstablishmentPeopleTable;
