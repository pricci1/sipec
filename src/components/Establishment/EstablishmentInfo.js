import React, { useState, useEffect, useContext } from "react";
import { getEstablishmentInfo } from "../../lib/ApiEstablishment";
import APIContext from "../../components/APIProvider";

const EstablishmentInfo = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [data, setData] = useState();
  const [state, setState] = useState({ infoAvailable: false });

  useEffect(() => {
    getEstablishmentInfoApiConsult(establishmentId);
  }, []);

  async function getEstablishmentInfoApiConsult(establishmentId) {
    setState({ infoAvailable: false });
    const info = await getEstablishmentInfo(api, establishmentId);
    setData({
      nombre: info.nombre,
      calle: info.calle,
      comuna: info.comuna,
      numero: info.numero,
      provincia: info.provincia,
      rup: info.rup,
      region: info.region
    });
    setState({ infoAvailable: true });
  }

  return (
    <>
      <h3>Antecedentes del Establecimiento</h3>
      {state.infoAvailable ? (
        <table className="table table-striped table-sm">
          <tbody>
            <tr>
              <td>
                <b>Nombre</b>
              </td>
              <td>{data.nombre}</td>
            </tr>
            <tr>
              <td>
                <b>RUP</b>
              </td>
              <td>{data.rup}</td>
            </tr>
            <tr>
              <td>
                <b>Dirección</b>
              </td>
              <td>
                {data.comuna}, {data.calle} {data.numero}
              </td>
            </tr>
            <tr>
              <td>
                <b>Provincia</b>
              </td>
              <td>{data.provincia}</td>
            </tr>
            <tr>
              <td>
                <b>Región</b>
              </td>
              <td>{data.region}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default EstablishmentInfo;
