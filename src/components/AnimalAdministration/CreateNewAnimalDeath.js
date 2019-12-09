import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, FieldArray, Select } from "formik";
import { Datepicker } from "react-formik-ui";
import Selector from "../Diio/Utilities/FormikSelector";
import * as Yup from "yup";
import {
  postAnimalDeathRegistration,
  getOwnersApi,
  getEstablishmentMvasApi,
  getSpeciesApi,
  getUserEstablishmentsApi
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

  const [establishment_id, setestablishment_id] = useState("");
  const [mvasData, setmvasData] = useState([]);
  const [speciesData, setspeciesData] = useState([]);
  const [ownersData, setownersData] = useState([]);
  useEffect(() => {
    getSpecies();
    getEstablishments();
  }, []);
  useEffect(() => {
    getMvas();
    getOwners();
  }, [establishment_id]);

  async function getSpecies() {
    const data = await getSpeciesApi(api);
    return data;
  }

  async function getEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.currentUserId); // user id
    return data;
  }

  async function getOwners() {
    try {
      const data = await getOwnersApi(api, establishment_id);
      setownersData(data);
      return data;
    } catch {
      setownersData(getOwnersApi(api, "2"));
      return getOwnersApi(api, "2");
    }
  }

  async function getMvas() {
    try {
      const data = await getEstablishmentMvasApi(api, establishment_id);
      setmvasData(data);
      return data;
    } catch {
      setmvasData(getEstablishmentMvasApi(api, "2"));
      return getEstablishmentMvasApi(api, "2");
    }
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
          establishment: "",
          owner: "",
          mva: "",
          death_date: "",
          specie: "",
          down: "",
          down_details: "",
          diio_array: []
        }}
        validationSchema={newAnimalDownRegistration}
        onSubmit={(values, { setSubmitting }) => {
          postAnimalDeathRegistration(
            api,
            values.specie.value,
            values.mva.value,
            values.down,
            values.death_date,
            values.diio_array
          ).then(resp => {
            let deadAnimals = resp.not_applied;
            if (deadAnimals.length === 0) {
              deadAnimals = "ninguno.";
            }
            resp.success
              ? alert(
                  `Baja realizada. Serial de los DIIOS de animales muertos registrados anteriormente: ${resp.not_applied}.`
                )
              : alert(`Error en la baja. ${resp.data}`);
          });
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
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                labelName="RUP - Establecimiento"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                  setestablishment_id(fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                data={getEstablishments}
                errors={errors.establishment}
              />
              <br />
              <Selector
                fieldName="owner"
                fieldValue={values.owner}
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
                fieldValue={values.mva}
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
                labelName="*Especie"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.specie}
                data={getSpecies}
                errors={errors.specie}
              />
              <br />
              <Selector
                fieldName="down"
                fieldValue={values.down}
                labelName="*Tipo de Baja"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
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
                    className={"form-control"}
                    onChange={value => {
                      setFieldValue("verification_date", value);
                    }}
                    onBlur={handleBlur}
                    onSelect={handleChange}
                    name="death_date"
                    id="death_date"
                    selected={values.death_date}
                    value={values.verification_date}
                    dateFormat="yyyy-dd-MM"
                    placeholder="aaaa/dd/mm"
                  />
                  <br />
                  <FieldArray
                    name="diio_array"
                    render={arrayHelpers => (
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => arrayHelpers.push({ diio: 0 })}
                        >
                          Agregar DIIO
                        </button>
                        <br />
                        {values.diio_array && values.diio_array.length > 0
                          ? values.diio_array.map((_, index) => (
                              <div key={index}>
                                <div className="form-inline">
                                  <Field
                                    type="number"
                                    className="form-control mr-4"
                                    name={`diio_array[${index}].diio]`}
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
              <button
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                Limpiar
              </button>
              <br />
              <hr />
              <div style={{ textAlign: "right" }}>
                <Link to="../" className="btn btn-outline-secondary">
                  Volver
                </Link>{" "}
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
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
