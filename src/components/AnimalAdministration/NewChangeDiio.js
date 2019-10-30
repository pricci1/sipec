import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import ApiContext from "../APIProvider";
import { Formik, Field, FieldArray } from "formik";
import DatePicker from "react-datepicker";
import { Selector } from "../AnimalAdministration/Utils/FormikSelectors";
import {
  getSpeciesApi,
  getUserEstablishmentsApi,
  getMvasApi,
  getOwnersApi,
  postDiioChange
} from "../../lib/ApiAnimalAdministration";

const changeDiioSchema = Yup.object().shape({
  specie: Yup.string()
    .nullable()
    .required("Requerido"),
  establishment: Yup.string()
    .nullable()
    .required("Requerido"),
  owner: Yup.string()
    .nullable()
    .required("Requerido"),
  mva: Yup.string()
    .nullable()
    .required("Requerido"),
  verification_date: Yup.string()
    .nullable()
    .required("Requerido"),
  diio_changes: Yup.array().of(
    Yup.object()
      .shape({
        old: Yup.number("Debe ser un valor numérico")
          .min(0, "Debe ser mayor o igual a 0")
          .required("Requerido"),
        new: Yup.number("Debe ser un valor numérico")
          .min(Yup.ref("old"), "Debe ser mayor al diio antiguo")
          .required("Requerido")
      })
      .required()
  )
});

const NewChangeDiio = () => {
  const api = useContext(ApiContext);
  const [establishment_id, setestablishment_id] = useState("");
  const [mvasData, setmvasData] = useState([]);
  const [speciesData, setspeciesData] = useState([]);
  const [establishmentsData, setestablishmentsData] = useState([]);
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
    setspeciesData(data);
  }
  async function getEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.titular.id);
    setestablishmentsData(data);
  }

  async function getOwners() {
    const data = await getOwnersApi(api, establishment_id);
    setownersData(data);
  }
  async function getMvas() {
    let data = await getMvasApi(api, establishment_id);
    data = [
      { value: 1, label: "XXXXXXX - Abello Caucau Luis" },
      { value: 2, label: "XXXXXXX - Ejemplo de nombre" }
    ];
    setmvasData(data);
  }
  return (
    <div className="body">
      <h2>Nuevo Cambio de Diio</h2>
      <Formik
        initialValues={{
          specie: "",
          establishment: "",
          owner: "",
          mva: "",
          verification_date: "",
          diio_changes: []
        }}
        validationSchema={changeDiioSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          postDiioChange(
            api,
            values.specie.value,
            values.establishment.value,
            values.owner.value,
            values.mva.value,
            values.verification_date.toUTCString(),
            JSON.stringify(
              values.diio_changes.map(change => ({
                previous_diio: change.old,
                new_diio: change.new
              }))
            )
          ).then(resp => {
            alert(resp.data);
            console.log(resp);
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
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                label="Especie"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.specie}
                options={speciesData}
                errors={errors.specie}
              />
              <br />
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                label="RUP - Establecimiento"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                  setestablishment_id(fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={establishmentsData}
                errors={errors.establishment}
              />
              <br />

              <Selector
                fieldName="owner"
                fieldValue={values.owner}
                label="Titular o mandatario"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.owner}
                options={ownersData}
                errors={errors.owner}
              />
              <br />
              <Selector
                fieldName="mva"
                fieldValue={values.mva}
                label="MVA"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.mva}
                options={mvasData}
                errors={errors.mva}
              />
              <br />
              <div
                className="row"
                style={{ textAlign: "justify", marginTop: "10px" }}
              >
                <div className="col-md-2" style={{ direction: "rtl" }}>
                  <label htmlFor="verification_date">Fecha verificación</label>
                </div>
                <div className="col-md-2">
                  <DatePicker
                    className={"form-control"}
                    id="verification_date"
                    onChange={value => {
                      setFieldValue("verification_date", value);
                    }}
                    value={values.verification_date}
                    onBlur={handleBlur}
                    onSelect={handleChange}
                    selected={values.verification_date}
                    dateFormat="dd/MM/yy"
                    name="verification_date"
                  />
                </div>
              </div>

              <FieldArray
                name="diio_changes"
                render={arrayHelpers => (
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => arrayHelpers.push({ old: 0, new: 0 })}
                    >
                      Agregar cambio
                    </button>
                    {values.diio_changes && values.diio_changes.length > 0
                      ? values.diio_changes.map((_, index) => (
                          <div key={index}>
                            <div className="form-inline">
                              <Field
                                type="number"
                                className="form-control mr-3"
                                name={`diio_changes[${index}].old]`}
                              />
                              <Field
                                type="number"
                                className="form-control mr-3"
                                name={`diio_changes[${index}].new]`}
                              />
                              <button
                                type="button"
                                className="btn btn-danger m-3"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              {errors.diio_changes &&
                                errors.diio_changes[index] && (
                                  <div className="text-danger">
                                    {errors.diio_changes[index].old || ""}
                                    {errors.diio_changes[index].new || ""}
                                  </div>
                                )}
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                )}
              />
              <br />
              <hr />

              <button
                className="btn btn-primary"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Guardar cambios
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewChangeDiio;
