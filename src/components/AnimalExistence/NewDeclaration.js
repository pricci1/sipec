import React, { useContext, useReducer, useState, useEffect } from "react";
import { Formik, FieldArray, Field } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
// import {  } from "../../lib/APIAnimalExistence";
import { getSpecies, getTitularEstablishments } from "../../lib/APICommon";
import { Selector } from "./Utils/FormikSelectors";
import Select from "react-select";
import axios from "axios";

const formatEstablishments = establishments => {
  try {
    const res = establishments.map(({ id, rup, name }) => ({
      value: id,
      label: `${rup} - ${name}`
    }));
    return res;
  } catch (error) {
    return [];
  }
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
    case "set":
      return action.data;
    default:
      throw new Error();
  }
};

const NewDeclaration = () => {
  const api = useContext(APIContext);
  const [selectedSpecie, setSelectedSpecie] = useState();
  const [species, updateSpecies] = useReducer(speciesReducer, []);
  const [fetchedData, setFetchedData] = useState({});

  useEffect(() => {
    const tasks = [
      getSpecies(api).then(res =>
        updateSpecies({
          type: "set",
          data: res
        })
      ),
      getTitularEstablishments(api).then(res =>
        setFetchedData(oldState => ({
          ...oldState,
          establishments: formatEstablishments(res)
        }))
      )
    ];
    Promise.all(tasks);
  }, []);
  return (
    <div className="body">
      <h1>Nueva de Declaración de Existencia</h1>
      <Formik
        initialValues={{
          establishment: "",
          species_groups: [],
          year: "",
          titularId: 1
        }}
        onSubmit={(values, { setSubmitting }) => {
          const {
            establishment: { value: establishment_id },
            year: { value: year },
            titularId: titular_id,
            species_groups: species_groupsOld
          } = values;

          const existence_specie_declarations_attributes = species_groupsOld.map(
            ({ specie: specie_id, quantity }) => ({
              species_id: parseInt(specie_id),
              quantity: parseInt(quantity)
            })
          );

          const req = {
            establishment_id: parseInt(establishment_id),
            existence_specie_declarations_attributes,
            year: parseInt(year),
            personal_id: parseInt(titular_id)
          };
          api.post("/existence_declarations", req).then(resp => {
            resp.success
              ? alert("Declaración realizada")
              : alert("Error en la declaración");
            setSubmitting(false);
          });
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
                fieldName="year"
                fieldValue={values.year}
                label="Año declaración"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.year}
                options={getPendingDeclarationsYears()}
                errors={errors.year}
              />
              <br />
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                label="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={fetchedData.establishments}
                errors={errors.establishment}
              />
              <br />
              <h6>Datos del Titular</h6>
              <p>RUT: {api.titular.run}</p>
              <p>Nombre: {`${api.titular.name} ${api.titular.last_name}`}</p>
              <br />
              <h6>Grupos de Especies</h6>
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
