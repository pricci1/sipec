import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { getInfoDiioRange } from "../../lib/ApiAnimalAdministration";
import APIContext from "../../components/APIProvider";
import DiioRangeTable from "./DiioRangeTable";

const ConsultDataDiioRange = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);
  //const [state, setState] = useState({ infoAvailable: false });
  //var diios_list = [];

  useEffect(() => {}, []);

  function getStringAliveDead(alive) {
    if (alive) {
      return "Vivo";
    } else {
      return "Muerto";
    }
  }

  async function getInfoDiioRangeApiConsult(diioStart, diioEnd) {
    var number = parseInt(diioEnd, 10) + 1;
    const data = await getInfoDiioRange(api, diioStart, number, api.titular.id);

    setData(
      data.map(
        ({
          diio: {
            0: {
              diio_serial: diio_number,
              rup_establishment: rup,
              name_establishment: establishment,
              animal_gender: gender,
              birth_date: birth_date,
              animal_alive: alive,
              animal_spices: spices,
              animal_breed: breed
            }
          }
        }) => ({
          diio_number,
          rup,
          establishment,
          gender,
          birth_date,
          alive,
          spices,
          breed
        })
      )
    );
  }

  return (
    <>
      <h2>Consulta por animales con rango de DIIOs</h2>
      <Formik
        initialValues={{ diioStart: "", diioEnd: "" }}
        onSubmit={(values, { setSubmitting }) => {
          getInfoDiioRangeApiConsult(values.diioStart, values.diioEnd);
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          } = props;
          return (
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
              <label htmlFor="diio inicio">DIIO inicio:</label>
              <input
                id="diioStart"
                name="diioStart"
                className="diio"
                type="number"
                style={{ marginLeft: 10, marginRight: 10 }}
                onBlur={setFieldTouched}
                onChange={val => {
                  setFieldValue("diioStart", val.target.value);
                }}
                value={values.diioStart}
              />
              <label htmlFor="diio fin">DIIO fin:</label>
              <input
                id="diioEnd"
                name="diioEnd"
                className="diio"
                type="number"
                style={{ marginLeft: 10, marginRight: 10 }}
                onBlur={setFieldTouched}
                onChange={val => {
                  setFieldValue("diioEnd", val.target.value);
                }}
                value={values.diioEnd}
              />
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </form>
          );
        }}
      </Formik>
      <DiioRangeTable
        headers={[
          "Número de DIIO",
          "RUP de establecimiento",
          "Nombre de establecimiento",
          "Sexo",
          "Especie",
          "Raza",
          "Fecha de nacimiento",
          "Estado"
        ]}
        data={data.map(diio => [
          diio.diio_number,
          diio.rup,
          diio.establishment,
          diio.gender,
          diio.spices,
          diio.breed,
          diio.birth_date,
          getStringAliveDead(diio.alive)
        ])}
      />
    </>
  );
};

export default ConsultDataDiioRange;
