import React, { useContext, useReducer, useState } from "react";
import { Formik, FieldArray, Field } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
// import {  } from "../../lib/APIAnimalExistence";
import { Selector } from "./Utils/FormikSelectors";
import Select from "react-select";

const getEstablishments = () => {
  return [
    { value: 1, label: "El Salto de Pilmaiquen" },
    { value: 2, label: "La Mosqueta" }
  ];
};

const getSpecies = () => {
  return [
    { value: "burro", label: "Burro" },
    { value: "cabra", label: "Cabra" },
    { value: "vaca", label: "Vaca" }
  ];
};

const getPendingDeclarationsYears = establishment => {
  return [
    { value: 2019, label: "2019" },
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" }
  ];
};

const speciesReducer = (state, action) => {
  switch (action.type) {
    case "remove":
      return state.filter(el => el.value !== action.data.value);
    case "add":
      return [...state, action.data];
    default:
      throw new Error();
  }
};

const NewDeclaration = () => {
  const api = useContext(APIContext);
  const [selectedSpecie, setSelectedSpecie] = useState();
  const [species, updateSpecies] = useReducer(speciesReducer, getSpecies());
  return (
    <div className="body">
      <h1>Nueva de Declaración de Existencia</h1>
      <Formik
        initialValues={{ establishment: "", species_groups: [], year: "" }}
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
              <h2>Año Declaración</h2>
              <Selector
                fieldName="year"
                fieldValue={values.year}
                label="Año"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.year}
                options={getPendingDeclarationsYears()}
                errors={errors.year}
              />
              <h2>Datos del Establecimiento</h2>
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                label="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={getEstablishments()}
                errors={errors.establishment}
              />
              <br />
              <h2>Datos del Titular</h2>
              <p>RUT: xx.xxx.xxx-x</p>
              <p>Nombre: Juan Pérez</p>
              <br />
              <h3>Grupos de Especies</h3>
              <Select
                options={species}
                onChange={value => setSelectedSpecie(value)}
              />
              <FieldArray
                name="species_groups"
                render={arrayHelpers => (
                  <div id="species">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={species.length === 0 || !selectedSpecie}
                      onClick={() => {
                        arrayHelpers.push({
                          specie: selectedSpecie.value,
                          label: selectedSpecie.label,
                          quantity: 0
                        });
                        setSelectedSpecie(); // TODO: clear value from select
                        updateSpecies({ type: "remove", data: selectedSpecie });
                      }}
                    >
                      Añadir
                    </button>
                    {values.species_groups && values.species_groups.length > 0
                      ? values.species_groups.map((specie, index) => (
                          <div key={index} className="form-inline md-0">
                            <label className="col-form-label pr-3">
                              {specie.label}
                            </label>
                            <Field
                              type="number"
                              className="form-control"
                              name={`species_groups[${index}].quantity`}
                            />
                            <button
                              type="button"
                              className="btn btn-danger m-3"
                              onClick={() => {
                                updateSpecies({
                                  type: "add",
                                  data: {
                                    value: specie.specie,
                                    label: specie.label
                                  }
                                });
                                arrayHelpers.remove(index);
                              }}
                            >
                              -
                            </button>
                          </div>
                        ))
                      : null}
                  </div>
                )}
              />
              <br />
              <hr />
              <button
                className="btn btn-primary mr-1"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Realizar declaración
              </button>
              <button
                onClick={handleReset}
                className="btn btn-secondary"
                type="button"
              >
                Limpiar
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewDeclaration;
