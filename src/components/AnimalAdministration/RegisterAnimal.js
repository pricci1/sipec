import React, { useState, useContext , useEffect} from "react";
import * as Yup from "yup";
import ApiContext from "../APIProvider";
import { Formik, Field, FieldArray } from "formik";
import DatePickerField from "../AnimalMoves/DatePickerField";

import Selector from "../Diio/Utilities/FormikSelector";
import {
  getSpeciesApi,
  getWorkerApi,
  getBreedApi,
  getCategoriesApi,
  getMvaApi,
  getDiioPersonal,
  getUserEstablishmentsApi
} from "../../lib/ApiAnimalAdministration";

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
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
  owner: Yup.string().nullable(),
  mva: Yup.string()
    .nullable()
    .required("Requerido"),
  applicationDate: Yup.date()
    .nullable()
    .required("Requerido").min(new Date),
  breed: Yup.string()
    .nullable()
    .required("Requerido"),
  sex: Yup.string()
    .nullable()
    .required("Requerido"),
  birthDate: Yup.date()
    .nullable()
    .required("Requerido"),
  pabco: Yup.string()
    .nullable()
    .required("Requerido"),
  diio: Yup.string()
    .nullable()
    .required("Requerido"),
});

const RegisterAnimal = ({ handleFormSubmit, getItem, setReloadHandler }) => {
  const api = useContext(ApiContext);
  async function getSpecies() {
    const data = await getSpeciesApi(api);
    return data;
  }

  async function getBreeds() {
    const data = await getBreedApi(api);
    return data;
  }

  async function getEstablishments() {
    const titularId = api.titular.id;
    const data = await getUserEstablishmentsApi(api, titularId);
    console.log(data);
    
    return data;
  }
  async function getCategory() {
    const data = await getCategoriesApi(api);
    return data;
  }

  async function getDIIO() {
    const data = await getDiioPersonal(api);
    return data;
  }
  async function getOwners() {
    const data = await getWorkerApi(api);
    return data;
  }
  async function getMvas() {
    const data = await getMvaApi(api);
    return data;
  }

  
  async function getOrigin() {
    return [{ value: 1, label: "Nacional" }, { value: 2, label: "Extranjero" }];
  }
  async function getPabco() {
    return [{ value: 1, label: "SI" }, { value: 2, label: "NO" }];
  }
  async function getSex() {
    return [{ value: 1, label: "Macho" }, { value: 2, label: "Hembra" }];
  }

  async function sendRequest(
    specie,
    establishment,
    owner,
    mva,
    origin,
    applicationDate,
    breed,
    sex,
    birthDate,
    category,
    pabco,
    diio,
  ) {
    const response = await api.post("/animals", {
      specie: specie,
      rup: establishment,
      personal_owner: owner,
      mva: mva,
      date: getCurrentDate(),
      application_date: applicationDate,
      origin: origin,
      breed: breed,
      sex: sex,
      birthDate: birthDate,
      category: category,
      pabco: pabco,
      diio: diio,
    });

    getDIIO();
    setReloadHandler();
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
          breed: "",
          sex: "",
          birthDate: "",
          category: "",
          pabco: "",
          diio: "",

        }}
        validationSchema={changeDiioSchema}
        onSubmit={(values, { setSubmitting }) => {
          sendRequest(
            values.specie,
            values.establishment,
            values.owner,
            values.mva,
            values.origin,
            values.applicationDate,
            values.breed,
            values.sex,
            values.birthDate,
            values.category,
            values.pabco,
            values.diio.value,
          ).then(response => {});
          //values.diio = "";
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
                fieldName="diio"
                fieldValue={values.diio}
                labelName="DIIO"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.diio}
                data={getDIIO}
                errors={errors.diio}
                
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
              <Selector
                fieldName="pabco"
                fieldValue={values.specie}
                labelName="PABCO"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.specie}
                data={getPabco}
                errors={errors.specie}
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
              <Selector
                fieldName="breed"
                fieldValue={values.breed}
                labelName="Raza"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.breed}
                data={getBreeds}
                errors={errors.breed}
              />
              <Selector
                fieldName="sex"
                fieldValue={values.sex}
                labelName="Sexo"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.sex}
                data={getSex}
                errors={errors.sex}
              />
              <div>
                <label htmlFor="birthDate"> Fecha de Nacimiento</label>{" "}
                <DatePickerField
                  name="birthDate"
                  value={values.birthDate}
                  onChange={setFieldValue}
                  className="form-control"
                  dateFormat="YYYY-MM-DD"
                />
              </div>{" "}
              <Selector
                fieldName="category"
                fieldValue={values.category}
                labelName="Categoria"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.category}
                data={getCategory}
                errors={errors.category}
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
