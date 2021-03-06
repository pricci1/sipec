import React, { useState, useContext, useEffect } from "react";
import APIContext from "../APIProvider";
import EstablishmentSectorsTable from "./EstablishmentSectorsTable";

const EstablishmentOtherData = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [sectors, setSectors] = useState([]);
  const [data, setData] = useState({});
  const [establishmentName, setEstablishmentName] = useState("");

  const getEstablishmentName = async () => {
    const name = await api.get(`/establishments/${establishmentId}`);
    if (name.success) {
      setEstablishmentName(`${name.data.rup} -${name.data.name}`);
    }
  };

  const getEstablishmentSectors = async () => {
    const sectors = await api.get(
      `/establishments/${establishmentId}/establishment_sectors`
    );
    if (sectors.success) {
      setSectors(sectors.data);
    }
  };
  useEffect(() => {
    getEstablishmentSectors();
    getEstablishmentName();
  }, []);

  const onChange = e => {
    const target = e.target;
    setData(old => {
      old[target.name] = target.value;
      return old;
    });
  };

  const addSector = e => {
    e.preventDefault();
    api
      .post(`/establishments/${establishmentId}/establishment_sectors`, {
        name: data.name,
        coord_x: data.xCoor,
        coord_y: data.yCoor,
        huso: data.huso,
        pabellones: parseInt(data.pabQuantity)
      })
      .then(resp => {
        resp.success
          ? alert("Sector añadido")
          : alert("Error al añadir sector");
        getEstablishmentSectors();
      });
  };

  const deleteSector = React.useCallback((e, id) => {
    e.preventDefault();
    api
      .delete(`/establishments/${establishmentId}/establishment_sectors/${id}}`)
      .then(() => {
        getEstablishmentSectors();
      });
  }, []);

  return (
    <>
      <h3>Editar Sectores y Superficie</h3>
      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>{establishmentName}</td>
          </tr>
          <tr>
            <th className="text-nowrap">Superficie en hectáreas</th>
            <td>
              <input type="number" name="area" className="form-control w-50" />
            </td>
          </tr>
          <tr>
            <th> </th>
            <td>
              <button className="btn btn-primary">Actualizar hectáreas</button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th className="text-nowrap">Nombre</th>
            <td>
              <input
                type="text"
                className="form-control w-50"
                onBlur={onChange}
                name="name"
              />
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">N⁰ de pabellones</th>
            <td>
              <input
                type="number"
                className="form-control w-25"
                onBlur={onChange}
                name="pabQuantity"
              />
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Coordenadas</th>
            <td className="form-check-inline">
              <div className="input-group  w-25">
                <input
                  type="number"
                  className="form-control"
                  name="xCoor"
                  onBlur={onChange}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">X</span>
                </div>
              </div>
              &nbsp;&nbsp;
              <div className="input-group  w-25">
                <input
                  type="number"
                  className="form-control"
                  name="yCoor"
                  onBlur={onChange}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">Y</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Huso</th>
            <td>
              <input
                type="number"
                className="form-control w-25"
                onBlur={onChange}
                name="huso"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addSector}>
        Agregar sector
      </button>
      <hr />
      {sectors.length > 0 ? (
        <EstablishmentSectorsTable
          data={sectors}
          deleteCallback={deleteSector}
        />
      ) : (
        "Cargando sectores"
      )}
    </>
  );
};

export default EstablishmentOtherData;
