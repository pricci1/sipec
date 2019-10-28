import React, { useContext, useState } from "react";

const getAnimals = () => {
  return [
    { diio: "1123123", sex: "hembra", race: "Angus", birthday: "01-08-2010" },
    { diio: "234234", sex: "macho", race: "Hereford", birthday: "11-08-2010" },
    { diio: "234235", sex: "hembra", race: "Angus", birthday: "21-08-2010" },
    {
      diio: "112343123",
      sex: "hembra",
      race: "Angus",
      birthday: "01-08-2010"
    }
  ];
};

const AnimalEstablishmentRecordDetails = ({ registryId }) => {
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
            <th className="text-nowrap">Fecha registro</th>
            <td>Puyehue</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Aplicacion</th>
            <td>1/1/1</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimetm </th>
            <td>2/2/2</td>
          </tr>
          <tr>
            <th className="text-nowrap">Titular</th>
            <td>2002</td>
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
          <th scope="col">DIIO</th>
          <th scope="col">Sexo</th>
          <th scope="col">Raza</th>
          <th scope="col">Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        {getAnimals().map((animal, index) => (
          <tr key={index}>
            <td>{animal.diio}</td>
            <td>{animal.sex}</td>
            <td>{animal.race}</td>
            <td>{animal.birthday}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalEstablishmentRecordDetails;
