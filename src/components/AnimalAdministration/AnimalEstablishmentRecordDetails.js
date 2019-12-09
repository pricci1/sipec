import React, { useContext, useState, useEffect } from "react";
import ApiContext from "../APIProvider";
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

const AnimalEstablishmentRecordDetails = ({ registryId }) => {
  const api = useContext(ApiContext);
  const [data_, setData_] = useState();
  async function getAnimalsByRegister() {
    const data = await api.get("/animals_by_personal");
    if (data.data == "") {
      return [
        {
          diio: "1123123",
          sex: "hembra",
          race: "Angus",
          birthday: "01-08-2010"
        },
        {
          diio: "234234",
          sex: "macho",
          race: "Hereford",
          birthday: "11-08-2010"
        },
        {
          diio: "234235",
          sex: "hembra",
          race: "Angus",
          birthday: "21-08-2010"
        },
        {
          diio: "112343123",
          sex: "hembra",
          race: "Angus",
          birthday: "01-08-2010"
        }
      ];
    }

    return data.data.map(
      ({
        diio,
        specie,
        rup,
        owner,
        mva,
        origin,
        applicationDate,
        breed,
        sex,
        birthDate
      }) => ({
        diio,
        specie: specie,
        rup: rup,
        personal_owner: owner,
        mva: mva,
        date: getCurrentDate(),
        application_date: applicationDate,
        origin: origin,
        breed: breed,
        sex: sex,
        birthDate: birthDate,
        category: category
      })
    );
  }

  const register = getAnimalsByRegister();
  return (
    <>
      <h1>{registryId}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-nowrap">MVA o tercer acreditado</th>
            <td>{register.mva}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Especie</th>
            <td>{register.specie}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha registro</th>
            <td>{register.date}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Fecha Aplicacion</th>
            <td>{register.applicationDate}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Establecimiento </th>
            <td>{register.rup}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Titular</th>
            <td>{register.owner}</td>
          </tr>
        </tbody>
      </table>
      <DetailsTable />
    </>
  );
};

const DetailsTable = () => {
  const api = useContext(ApiContext);
  const [data_, setData_] = useState([]);
  const getAnimalsByRegister = async () => {
    const data = await api.get("/animals_by_personal");
    if (true) {
      setData_([
        {
          diio: "1123123",
          sex: "hembra",
          race: "Angus",
          birthday: "01-08-2010"
        },
        {
          diio: "234234",
          sex: "macho",
          race: "Hereford",
          birthday: "11-08-2010"
        },
        {
          diio: "234235",
          sex: "hembra",
          race: "Angus",
          birthday: "21-08-2010"
        },
        {
          diio: "112343123",
          sex: "hembra",
          race: "Angus",
          birthday: "01-08-2010"
        }
      ]);
    }

    let d = data.data.map(
      (
        diio,
        specie,
        rut,
        owner,
        mva,
        origin,
        applicationDate,
        breed,
        sex,
        date,
        category
      ) => ({
        diio,
        specie: specie,
        rup: rut,
        personal_owner: owner,
        mva: mva,
        date: new Date(),
        application_date: applicationDate,
        origin: origin,
        breed: breed.name,
        sex: sex,
        birthDate: date,
        category: category
      })
    );
  };
  useEffect(() => {
    getAnimalsByRegister();
  }, []);
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
        {data_.map((animal, index) => (
          <tr key={index}>
            <td>{animal.diio}</td>
            <td>{animal.sex}</td>
            <td>{animal.breed}</td>
            <td>{animal.birthDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalEstablishmentRecordDetails;
