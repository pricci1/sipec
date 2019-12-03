import React, { useContext, useState } from "react";
import APIContext from "../APIProvider";
import AsyncSelect from "react-select/async";
import { getEstablishmentsApi } from "../../lib/ApiAnimalAdministration";
import { getExternalEstablishmentInfo } from "../../lib/ApiEstablishment";

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      !!inputValue && resolve([{ value: 1, label: inputValue }]);
    }, 1000);
  });

const mockData = {
  rup: "1.1.1.1",
  region: "Valparaiso",
  neighborhood: "Casablanca",
  name: "Los Castaños",
  address: "El Estero, Lote 42",
  locationX: "12.12312",
  locationY: "-2.3323",
  huso: "19",
  anabolics: "No",
  pabco: "--",
  titularName: "Ana Canales",
  titularRut: "12.345.678-5"
};

const ExternalEstablishments = () => {
  const api = useContext(APIContext);
  const [selectedEstablishment, setSelectedEstablishment] = useState();
  const [fetchedData, setFetchedData] = useState(
    getEstablishmentInfo(selectedEstablishment)
  );

  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    return data;
  }

  async function getEstablishmentInfo(establishment) {
    const data = await getExternalEstablishmentInfo(api, establishment);
    return data;
  }

  return (
    <div>
      <h2>Establecimientos externos</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="form-group row">
          <label htmlFor="establishment" className="col-sm-2 col-form-label">
            Establecimiento
          </label>
          <div className="col-sm-10">
            <AsyncSelect
              id="establishment"
              placeholder="RUP - Nombre"
              cacheOptions
              defaultOptions
              loadOptions={getEstablishments}
              onChange={setSelectedEstablishment}
              onBlur={setSelectedEstablishment}
              value={selectedEstablishment}
            />
          </div>
        </div>
        <button
          disabled={!selectedEstablishment}
          type="submit"
          className="btn btn-primary mb-2"
          onClick={setFetchedData}
        >
          Buscar
        </button>
      </form>
      {!!fetchedData && (
        <>
          <h2>Datos establecimiento</h2>
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
                <th className="text-nowrap">Región</th>
                <td>{fetchedData.region}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Comuna</th>
                <td>{fetchedData.neighborhood}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Dirección</th>
                <td>{fetchedData.address}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Cooredenada X</th>
                <td>{fetchedData.coordinate_x}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Coordenada Y</th>
                <td>{fetchedData.coordinate_y}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Huso</th>
                <td>{fetchedData.huso}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Usa anabólicos</th>
                <td>{fetchedData.anabolics}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Estado PABCO</th>
                <td>{fetchedData.pabco}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Titular</th>
                <td>
                  {/* {fetchedData.titular.lastname}, {fetchedData.titular.name} */}
                  {"name y lastname titular"}
                </td>
              </tr>
              <tr>
                <th className="text-nowrap">RUT Titular</th>
                {/* <td>{fetchedData.titular.run}</td> */}
                {"run"}
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ExternalEstablishments;
