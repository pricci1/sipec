import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { getInfoSingleDiioConsult } from "../../lib/APIDiio";
import APIContext from "../../components/APIProvider";
import { Accordion, Card, Button } from "react-bootstrap";
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const ConsultDataSingleDiio = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState();
  const [state, setState] = useState({ infoAvailable: false });

  useEffect(() => {}, []);

  function getStringAliveDead(alive) {
    if (alive) {
      return "Vivo";
    } else {
      return "Muerto";
    }
  }

  async function getInfoSingleDiioConsultApi(diioId) {
    const info = await getInfoSingleDiioConsult(api, diioId);
    console.log(info);
    setData({
      movements: info.movements.map(
        ({
          arrival: arrival_date,
          departure: departure_date,
          transporter: movement_transporter,
          destination: {
            0: destination_name,
            1: destination_rup,
            2: destination_commune,
            3: destination_province,
            4: destination_region
          },
          origin: {
            0: origin_name,
            1: origin_rup,
            2: origin_commune,
            3: origin_province,
            4: origin_region
          }
        }) => ({
          arrival_date,
          departure_date,
          movement_transporter,
          destination_name,
          destination_rup,
          destination_commune,
          destination_province,
          destination_region,
          origin_commune,
          origin_name,
          origin_province,
          origin_region,
          origin_rup
        })
      )
    });

    var {
      diio_model: diio_model_number,
      diio_type,
      enable_date: diio_enable_date,
      aplication_date: diio_aplication_date,
      diio_seller: {
        0: { name: diio_provider_name, last: diio_provider_lastname }
      },
      animal: {
        0: {
          species: animal_species,
          breed: animal_breed,
          gender: animal_gender,
          id_type: animal_id_type,
          alive: animal_alive_dead,
          traceability: animal_traceability_type,
          sag_registar_date: animal_sag_register_date,
          birth_date: animal_birth_date,
          death_date: animal_death_date
        }
      }
    } = info;
    setData(prevState => ({
      ...prevState,
      diio_model_number,
      diio_type,
      diio_enable_date,
      diio_provider_name,
      diio_provider_lastname,
      diio_aplication_date,
      animal_species,
      animal_breed,
      animal_id_type,
      animal_traceability_type,
      animal_gender,
      animal_alive_dead,
      animal_sag_register_date,
      animal_birth_date,
      animal_death_date
    }));
    setState({ infoAvailable: true });
  }

  return (
    <>
      <h2>Consulta Información y Trazabilidad Animales con DIIO</h2>
      <Formik
        initialValues={{ diio: "" }}
        onSubmit={(values, { setSubmitting }) => {
          getInfoSingleDiioConsultApi(values.diio);
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange, // No se usa en el ejemplo porque los 2 inputs son dropdown
            handleBlur, // No se usa en el ejemplo porque los 2 inputs son dropdown
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
              <label htmlFor="diio">DIIO:</label>
              <input
                id="diio"
                name="diio"
                className="diio"
                type="number"
                style={{ marginLeft: 10, marginRight: 10 }}
                onBlur={setFieldTouched}
                onChange={val => {
                  setFieldValue("diio", val.target.value);
                }}
                value={values.diio}
              />
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </form>
          );
        }}
      </Formik>
      {state.infoAvailable ? (
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h5>
                <b>Datos del animal</b>
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <td>
                        <b>Número de DIIO</b>
                      </td>
                      <td>{data.diio_model_number}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Estado animal</b>
                      </td>
                      <td>{getStringAliveDead(data.animal_alive_dead)}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Especie</b>
                      </td>
                      <td>{data.animal_species}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Sexo</b>
                      </td>
                      <td>{data.animal_gender}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha nacimiento</b>
                      </td>
                      <td>{data.animal_birth_date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha aplicación DIIO</b>
                      </td>
                      <td>{data.diio_aplication_date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha muerte</b>
                      </td>
                      <td>{data.animal_death_date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Tipo de identificación</b>
                      </td>
                      <td>{data.animal_id_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Tipo trazabilidad</b>
                      </td>
                      <td>{data.animal_traceability_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha de registro SIPEC</b>
                      </td>
                      <td>{data.animal_sag_register_date}</td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h5>
                <b>Información de DIIO</b>
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <td>
                        <b>Número de DIIO</b>
                      </td>
                      <td>{data.diio_model_number}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Tipo</b>
                      </td>
                      <td>{data.diio_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha de habilitación</b>
                      </td>
                      <td>{data.diio_enable_date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fecha de aplicación</b>
                      </td>
                      <td>{data.diio_aplication_date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Nombre proveedor</b>
                      </td>
                      <td>
                        {data.diio_provider_name} {data.diio_provider_lastname}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <h5>
                <b>Información origen</b>
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <table className="table table-striped table-sm">
                  <tbody></tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <h5>
                <b>Información movimiento</b>
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <table className="table table-striped table-sm table-bordered">
                  <thead>
                    <th colSpan={2}>
                      <b>Fechas</b>
                    </th>
                    <th colSpan={5}>
                      <b>Establecimiento origen</b>
                    </th>
                    <th colSpan={5}>
                      <b>Establecimiento destino</b>
                    </th>
                  </thead>
                  <thead>
                    <th>
                      <b>Inicio</b>
                    </th>
                    <th>
                      <b>Término</b>
                    </th>
                    <th>
                      <b>Nombre</b>
                    </th>
                    <th>
                      <b>RUP</b>
                    </th>
                    <th>
                      <b>Región</b>
                    </th>
                    <th>
                      <b>Provincia</b>
                    </th>
                    <th>
                      <b>Comuna</b>
                    </th>
                    <th>
                      <b>Nombre</b>
                    </th>
                    <th>
                      <b>RUP</b>
                    </th>
                    <th>
                      <b>Región</b>
                    </th>
                    <th>
                      <b>Provincia</b>
                    </th>
                    <th>
                      <b>Comuna</b>
                    </th>
                  </thead>
                  <tbody>
                    {data.movements.map((item, index) => (
                      <tr key={index}>
                        <td>{item.arrival_date.split("T")[0]}</td>
                        <td>{item.departure_date.split("T")[0]}</td>
                        <td>{item.origin_name}</td>
                        <td>{item.origin_rup}</td>
                        <td>{item.origin_region}</td>
                        <td>{item.origin_province}</td>
                        <td>{item.origin_commune}</td>
                        <td>{item.destination_name}</td>
                        <td>{item.destination_rup}</td>
                        <td>{item.destination_region}</td>
                        <td>{item.destination_province}</td>
                        <td>{item.destination_commune}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default ConsultDataSingleDiio;
