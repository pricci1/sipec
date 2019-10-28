import React, { useContext, useState } from "react";

const getAnimals = () => {
  return [
    {
      diio: "111",
      date: "05-08-2013",
      type: "PERDIDA TRANZABILIDAD",
      detail: "PERDIDA RE RASTRO ANIMAL"
    },
    {
      diio: "222",
      date: "05-08-2013",
      type: "PERDIDA TRANZABILIDAD",
      detail: "PERDIDA RE RASTRO ANIMAL"
    },
    {
      diio: "333",
      date: "05-08-2013",
      type: "PERDIDA TRANZABILIDAD",
      detail: "PERDIDA RE RASTRO ANIMAL"
    }
  ];
};

const AnimalDownDIIODetails = ({ registryId }) => {
  return (
    <>
      <h1>{registryId}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-nowrap">MVA o tercer acreditado</th>
            <td>1.1.1.1</td>
          </tr>
          <tr>
            <th className="text-nowrap">Especie</th>
            <td>
              Agricola Las Palmas Y Otrsas Cosas Que Hacen El Nombre Muy Largo
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Registro</th>
            <td>1/1/1</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimeto </th>
            <td>96.865.754-k - El Salto de Pilmaiquen</td>
          </tr>
        </tbody>
      </table>
      <DetailsTable />
    </>
  );
};

const DetailsTable = () => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">DIIO baja</th>
          <th scope="col">Fecha baja</th>
          <th scope="col">Tipo baja</th>
          <th scope="col">Detalle</th>
        </tr>
      </thead>
      <tbody>
        {getAnimals().map((animal, index) => (
          <tr key={index}>
            <td>{animal.diio}</td>
            <td>{animal.date}</td>
            <td>{animal.type}</td>
            <td>{animal.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalDownDIIODetails;
