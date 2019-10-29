import React, { useState, useEffect } from "react";

const getAnimals = () => {
  return [
    { specie: "Vaca", quantity: "2" },
    { specie: "Cerdo", quantity: "3" },
    { specie: "Conejo", quantity: "4" }
  ];
};

const fakeData = {
  rup: "123456789",
  name: "Pajaro Bobo",
  neighborhood: "Las Condes",
  declarationDate: "30/10/19",
  registrationDate: "30/10/19",
  year: "2020"
};

const AnimalExistanceDetails = ({ declarationId }) => {
  const [fetchedData, setFetchedData] = useState({});
  useEffect(() => {
    setFetchedData(fakeData);
  }, []);
  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-nowrap">RUP</th>
            <td>{fetchedData.rup}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Nombre</th>
            <td>{fetchedData.name}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Comuna</th>
            <td>{fetchedData.neighborhood}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Declaración</th>
            <td>{fetchedData.declarationDate}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Registro</th>
            <td>{fetchedData.registrationDate}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Año</th>
            <td>{fetchedData.year}</td>
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
          <th scope="col">Especie</th>
          {/* <th scope="col">Raza</th>
          <th scope="col">Categoría</th> */}
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {getAnimals().map((animal, index) => (
          <tr key={index}>
            <td>{animal.specie}</td>
            <td>{animal.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalExistanceDetails;
