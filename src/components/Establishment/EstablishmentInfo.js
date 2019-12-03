import React, { useState, useEffect, useContext } from "react";
import { getEstablishmentInfo } from "../../lib/ApiEstablishment";
import APIContext from "../../components/APIProvider";

const EstablishmentInfo = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [data, setData] = useState();

  useEffect(() => {}, []);

  async function getEstablishmentInfoApiConsult(establishmentId) {
    const info = await getEstablishmentInfo(api, establishmentId);
    console.log(info[0]);
    setData(info[0]);
  }
  return (
    <>
      {getEstablishmentInfoApiConsult(establishmentId)}
      {console.log(data)}
      <h2>Antecedentes de Establecimiento {data.nombre} </h2>
      <table className="table table-striped table-sm">
        <tbody>
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
    </>
  );
};

export default EstablishmentInfo;
