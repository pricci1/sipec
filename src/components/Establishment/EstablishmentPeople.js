import React, { useEffect, useContext, useState } from "react";
import Select from "react-select";
import APIContext from "../APIProvider";
import {
  getEstablishmentByIdApi,
  getEstablishmentPersonals
} from "../../lib/ApiEstablishment";
import EstablishmentPeopleTable from "./EstablishmentPeopleTable";

const EstablishmentPeople = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [establishmentData, setEstablishmentData] = useState({});
  const [personals, setPersonals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [people, setPeople] = useState([
    {
      label: "18.234.552-1 - Manuel",
      value: 9,
      name: "Manuel",
      run: "18.234.552-1"
    },
    {
      label: "14.244.542-1 - Pablo",
      value: 10,
      name: "Pablo",
      run: "14.244.542-1"
    },
    {
      label: "18.255.232-3 - Jorge",
      value: 11,
      name: "Jorge",
      run: "18.255.232-3"
    },
    {
      label: "6.644.432-k - Victor Manuel",
      value: 12,
      name: "Victor Manuel",
      run: "6.644.432-k "
    }
  ]);

  useEffect(() => {
    const tasks = [
      getEstablishmentPersonals(api, establishmentId).then(data => {
        setPersonals(data || []);
      }),
      getEstablishmentByIdApi(api, establishmentId).then(data => {
        setEstablishmentData(data || {});
      })
    ];
    Promise.all(tasks).then(setIsLoading(false));
  }, []);

  const onSelectChange = (select, data) => {
    setFormState(old => {
      old[select] = data.value;
      return old;
    });
  };

  const addPerson = e => {
    e.preventDefault();
    setTimeout(() => {
      setPersonals(old => [
        ...old,
        {
          id: formState.personId,
          name: "Manuel",
          run: "18.234.552-1",
          person_role: { name: "VETERINARIO" }
        }
      ]);
      setPeople(people => people.filter(el => el.value !== formState.name));
    }, 800);
  };

  const deletePerson = React.useCallback((e, id) => {
    e.preventDefault();
    setTimeout(() => {
      setPersonals(old => old.filter(el => el.id !== id));
    }, 800);
  }, []);

  return (
    <>
      <h3>Editar Personas</h3>
      <h5>Añadir personal</h5>
      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>
              {isLoading
                ? "Cargando..."
                : `${establishmentData.rup} - ${establishmentData.name}`}
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">RUT- Nombre</th>
            <td>
              <Select
                name="name"
                isLoading={isLoading}
                options={people}
                onChange={data => onSelectChange("name", data)}
              />
              {/* <input
                type="number"
                name="area"
                className="form-control w-50"
                // onBlur={onChange}
              /> */}
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Rol a Asignar</th>
            <td>
              <Select
                name="role"
                isLoading={isLoading}
                onChange={data => onSelectChange("role", data)}
                options={[
                  { label: "CONTACTO", value: 1 },
                  { label: "DUENO", value: 1 },
                  { label: "TITULAR", value: 1 },
                  { label: "VETERINARIO", value: 1 }
                ]}
              />
              {/* <input
                type="number"
                name="area"
                className="form-control w-50"
                // onBlur={onChange}
              /> */}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addPerson}>
        Agregar persona
      </button>
      <br />
      <br />
      <h5>Personal del establecimiento</h5>
      {personals.length > 0 ? (
        <EstablishmentPeopleTable
          data={personals}
          deleteCallback={deletePerson}
        />
      ) : isLoading ? (
        "Cargando..."
      ) : null}
    </>
  );
};

export default EstablishmentPeople;
