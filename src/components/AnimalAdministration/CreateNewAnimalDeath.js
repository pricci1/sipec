import React, { useState, useContext } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Datepicker } from "react-formik-ui";
import Selector from "../Diio/Utilities/FormikSelector";
import * as Yup from "yup";
import {
  postAnimalDeathRegistration,
  getMva,
  getSpeciesApi,
  getEstablishmentsApi
} from "../../lib/ApiAnimalAdministration";
import APIContext from "../APIProvider";
import "../Diio/newPucharseDiio.css";
import { Link } from "@reach/router";

let currentDate = new Date().toLocaleDateString();

const newAnimalDownRegistration = Yup.object().shape({
  establishment: Yup.string()
    .nullable()
    .required("Requerido"),
  owner: Yup.string()
    .nullable()
    .required("Requerido"),
  mva: Yup.string()
    .nullable()
    .required("Requerido"),
  death_date: Yup.string()
    .nullable()
    .required("Requerido"),
  specie: Yup.string()
    .nullable()
    .required("Requerido"),
  diio_array: Yup.array().required("Requerido")
});

const NewDeathRegistration = () => {
  const api = useContext(APIContext);

  const [selectedSellerRut, setSelectedSellerRut] = useState();

  async function getSpecies() {
    const data = await getSpeciesApi(api);
    return data;
  }

  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    return data;
  }

  async function getOwners() {
    return [
      { value: 1, label: "Agricola y ganaderia las vertientes SPA" },
      { value: 2, label: "Gonzales Marquez Guido" }
    ];
  }

  async function getMvas() {
    return [
      { value: 1, label: "XXXXXXX - Abello Caucau Luis" },
      { value: 2, label: "XXXXXXX - Ejemplo de nombre" }
    ];
  }

  async function getDown() {
    return [
      { value: 1, label: "Baja tipo 1" },
      { value: 2, label: "Baja tipo 2" }
    ];
  }

  async function getDownDetails() {
    return [
      { value: 1, label: "Detalle baja tipo 1" },
      { value: 2, label: "Detalle baja tipo 2" }
    ];
  }

  return (
    <div className="body">
      <h2>Nuevo Registro de Muerte Animal</h2>
      <Formik
        initialValues={{
          establishment_id: "",
          owner: "",
          mva: "",
          death_date: "",
          specie_array: [],
          down: [],
          down_details: [],
          diio_array: []
        }}
        validationSchema={newAnimalDownRegistration}
        onSubmit={(values, { setSubmitting }) => {
          postAnimalDeathRegistration(
            api,
            values.owner.value,
            values.mva.value,
            values.death_date.value,
            JSON.stringify(values.down.value),
            JSON.stringify(values.down_details.value),
            JSON.stringify(values.diio_array)
          ).then(resp => {
            resp.success ? alert("Baja realizada") : alert("Error en la baja");
          });
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                labelName="RUP - Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                data={getEstablishments}
                errors={errors.establishment}
              />
              <br />
              <Selector
                fieldName="owner"
                fieldValue={values.establishment}
                labelName="Titular o mandatario"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.owner}
                data={getOwners}
                errors={errors.owner}
              />
              <br />
              <Selector
                fieldName="mva"
                fieldValue={values.establishment}
                labelName="MVA"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.mva}
                data={getMvas}
                errors={errors.mva}
              />
              <br />
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">Fecha: {currentDate}</div>
              </div>
              <br />
              <hr />
              <h5>Carga individual</h5>
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                labelName="Especie"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.specie}
                data={getSpecies}
                errors={errors.specie}
              />
              <br />
              <Selector
                fieldName="type_id"
                fieldValue={values.down}
                labelName="*Tipo de Baja"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.value);
                  setSelectedSellerRut(fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.down}
                data={getDown}
                errors={errors.down}
              />
              <br />
              <Selector
                fieldName="down_details"
                fieldValue={values.down_details}
                labelName="*Detalle del Tipo de Baja"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.value);
                  setSelectedSellerRut(fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.down_details}
                data={getDownDetails}
                errors={errors.down_details}
              />
              <br />
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "right" }}>
                  <label htmlFor="death_date" style={{ textAlign: "right" }}>
                    Fecha de Baja*
                  </label>
                  <br />
                  <br />
                  <label htmlFor="diio_number" style={{ textAlign: "right" }}>
                    Número de DIIO*
                  </label>
                </div>
                <div className="col-md-4">
                  <Datepicker
                    id="death_date"
                    selected={values.death_date}
                    dateFormat="yyyy-dd-MM"
                    className="form-control"
                    name="death_date"
                    placeholder="aaaa/dd/mm"
                  />
                  <br />
                  <FieldArray
                    name="diio_array"
                    render={arrayHelpers => (
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => arrayHelpers.push({ diio: 0 })}
                        >
                          Agregar DIIO
                        </button>
                        {values.diio_array && values.diio_array.length > 0
                          ? values.diio_array.map((_, index) => (
                              <div key={index}>
                                <div className="form-inline">
                                  <Field
                                    type="number"
                                    className="form-control mr-4"
                                    name={`diio_array[${index}]`}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger m-3"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </button>
                                  {errors.diio_array &&
                                    errors.diio_array[index] && (
                                      <div className="text-danger">
                                        {errors.diio_array[index] || ""}
                                      </div>
                                    )}
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    )}
                  />
                </div>
              </div>
              <br />
              <button className="btn btn-outline-secondary" type="submit">
                Eliminar Cambio
              </button>{" "}
              <button className="btn btn-primary" onClick={() => {}}>
                Agregar Cambio
              </button>
              <br />
              <hr />
              <div style={{ textAlign: "right" }}>
                <Link to="../" className="btn btn-outline-secondary">
                  Volver
                </Link>{" "}
                <button className="btn btn-primary" type="submit">
                  Guardar Cambios
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewDeathRegistration;
