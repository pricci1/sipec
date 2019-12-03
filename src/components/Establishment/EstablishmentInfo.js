import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { getEstablishmentInfo } from "../../lib/ApiEstablishment";
import APIContext from "../../components/APIProvider";
import { number } from "prop-types";
import { formatDistanceStrict } from "date-fns";
import { Card } from "react-bootstrap";

const EstablishmentInfo = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  async function getEstablishmentInfoApiConsult(establishmentId) {
    const data = await getEstablishmentInfo(api, establishmentId);
    console.log(data);

    setData(
      data.map(
        ({
          nombre: name,
          rup: rup,
          calle: street,
          numero: number,
          comuna: district,
          provincia: providence,
          region: region
        }) => ({
          name,
          street,
          number,
          rup,
          district,
          providence,
          region
        })
      )
    );
  }

  return (
    <>
      {getEstablishmentInfoApiConsult({ establishmentId })}
      <h2>Antecedentes de Establecimiento "{data.name}" </h2>
      <table className="table table-striped table-sm">
        <tbody>
          {/*<tr>
              <td>
                <b>Nombre de establecimiento</b>
              </td>
              <td>{data.name}</td>
            </tr>*/}
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
              {data.district}, {data.street} {data.number}
            </td>
          </tr>
          <tr>
            <td>
              <b>Provincia</b>
            </td>
            <td>{data.providence}</td>
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
