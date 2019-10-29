import React, { useState, useContext } from "react";
import * as Yup from "yup";
import ApiContext from "../APIProvider";
import { Formik, Field, FieldArray } from "formik";
import DatePickerField from "../AnimalMoves/DatePickerField";

import Selector from "../Diio/Utilities/FormikSelector";
import {
  getSpeciesApi,
  getEstablishmentsApi,
  getWorkerApi
} from "../../lib/ApiAnimalAdministration";

export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

const changeDiioSchema = Yup.object().shape({
  specie: Yup.string()
    .nullable()
    .required("Requerido"),
  origin: Yup.string()
    .nullable()
    .required("Requerido"),
  establishment: Yup.string()
    .nullable()
    .required("Requerido"),
  owner: Yup.string()
    .nullable()
    ,
  mva: Yup.string()
    .nullable()
    .required("Requerido"),
  applicationDate: Yup.string()
    .nullable()
    .required("Requerido"),
  
  
});


const RegisterAnimal = (props) => {
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
    const data = await getWorkerApi(api);
    return data;
    
  }
  async function getMvas() {
    return [
      { value: 1, label: "XXXXXXX - Abello Caucau Luis" },
      { value: 2, label: "XXXXXXX - Ejemplo de nombre" }
    ];
  }

  async function getOrigin() {
    return [
      { value: 1, label: "Nacional" },
      { value: 2, label: "Extranjero" }
    ];
  }

  async function sendRequest(specie, establishment, owner, mva, origin, applicationDate) {
      console.log("aquii");
    const response = await api.post("/create_animal_register", {specie: specie, rup:establishment, personal_owner: owner,
                                                                date : getCurrentDate(), application_date: applicationDate, origin:origin  });
    props.setLoadingState()
    if (response.data.status == "ok") {
      alert("Se creó el movimiento con éxito");
    }
  }
  return (
    <div className="body">
      <Formik
        initialValues={{
          specie: "",
          establishment: "",
          owner: "",
          mva: "",
          origin: "",
          applicationDate: "",
        }}
        validationSchema={changeDiioSchema}
        onSubmit={(values, { setSubmitting }) => {
            sendRequest(
              values.specie,
              values.establishment,
              values.owner,
              values.mva,
              values.origin,
              values.applicationDate
            ).then(response => {
                    
            });
            setSubmitting(false); // This can also be used for displaying a spinner
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
              <div>Fecha Registro: {getCurrentDate("/")}</div>
              <div>
                  <label htmlFor="applicationDate"> Fecha Aplicacion </label>{" "}
                  <DatePickerField
                    name="applicationDate"
                    value={values.applicationDate}
                    onChange={setFieldValue}
                    className="form-control"
                    dateFormat="YYYY-MM-DD"
                  />
                </div>{" "}

                <Selector
                fieldName="origin"
                fieldValue={values.origin}
                labelName="Origin"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.origin}
                data={getOrigin}
                errors={errors.origin}
              />
                
              

              <button
                className="btn btn-primary"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Guardar Registro
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterAnimal;
