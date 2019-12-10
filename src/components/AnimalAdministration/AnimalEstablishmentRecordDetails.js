import React, { useContext, useState, useEffect } from "react";
import ApiContext from "../APIProvider";
import { getAnimalsByThisRegisterApi } from "../../lib/ApiAnimalAdministration";

/*const getAnimalsByRegister = () => {

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
};*/

const AnimalEstablishmentRecordDetails = ({
  registryId,
  selectedRegisterDate,
  selectedRup,
  selectedTitular,
  selectedEstablishment,
  selectedQuantity
}) => {
  const api = useContext(ApiContext);
  const [state, setState] = useState({ infoAvailable: false });
  const [data, setData] = useState();

  function getStringState(alive) {
    if (alive) {
      return "Vivo";
    } else {
      return "Muerto";
    }
  }

  function getStringDiio(diio) {
    let diioString = diio.toString();
    let zeros = 8 - diioString.length;
    return "0".repeat(zeros) + diioString;
  }

  async function getAnimalsByThisRegister() {
    const info = await getAnimalsByThisRegisterApi(api, selectedRegisterDate);
    setData(info);
    setState({ infoAvailable: true });
  }

  useEffect(() => {
    getAnimalsByThisRegister();
  }, []);

  return (
    <>
      <h1>Detalles Animales</h1>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-nowrap">RUP</th>
            <td>{selectedRup}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>{selectedEstablishment}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Titular</th>
            <td>{selectedTitular}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha de registro</th>
            <td>{selectedRegisterDate}</td>
          </tr>
        </tbody>
      </table>
      {state.infoAvailable ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">DIIO</th>
              <th scope="col">Estado</th>
              <th scope="col">Raza</th>
              <th scope="col">Especie</th>
              <th scope="col">Sexo</th>
              <th scope="col">Fecha de nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((animal, index) => (
              <tr key={index}>
                <td>{getStringDiio(animal.diio_id)}</td>
                <td>{getStringState(animal.alive)}</td>
                <td>{animal.breed_id}</td>
                <td>{animal.species_id}</td>
                <td>{animal.gender}</td>
                <td>{animal.birth_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          <b>Cargando...</b>
        </p>
      )}
    </>
  );
};

export default AnimalEstablishmentRecordDetails;
