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
                isLoading={isLoading}
                options={[
                  { label: "18.234.552-1 - Manuel", value: 1 },
                  { label: "14.244.542-1 - Pablo", value: 1 },
                  { label: "18.255.232-3 - Jorge", value: 1 },
                  { label: "6.644.432-k - Victor Manuel", value: 1 }
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
          <tr>
            <th className="text-nowrap">Rol a Asignar</th>
            <td>
              <Select
                isLoading={isLoading}
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
      <button className="btn btn-primary">Agregar persona</button>
      <br />
      <h5>Personal del establecimiento</h5>
      {personals.length > 0 ? (
        <EstablishmentPeopleTable data={personals} />
      ) : isLoading ? (
        "Cargando..."
      ) : null}
    </>
  );
};

export default EstablishmentPeople;
