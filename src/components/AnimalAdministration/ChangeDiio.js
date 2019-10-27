import React, { useState, useContext } from "react";
import * as Yup from "yup";
import ApiContext from "../APIProvider";
import { Formik, Field, FieldArray } from "formik";
import DatePicker from "react-datepicker";
import Selector from "../Diio/Utilities/FormikSelector";
import {
  getSpeciesApi,
  getEstablishmentsApi
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

const ChangeDiio = () => {
  const api = useContext(ApiContext);
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
        onSubmit={(values, {setSubmitting}) => {

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
                labelName="Especie"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.specie}
                data={getSpecies}
                errors={errors.specie}
              />
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
              <label htmlFor="verification_date">Fecha verificación cambio Diio</label>
              <DatePicker
								className={"form-control"}
								id="verification_date"
								onChange={value => {
                  setFieldValue("verification_date", value)
                }}
								value={values.verification_date}
              />
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

export default ChangeDiio;
