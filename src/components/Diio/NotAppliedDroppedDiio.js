import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import APIContext from "../APIProvider";
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import { dropDiioRanges } from "../../lib/APIDiio";
import "./notAppliedDroppedDiio.css";

const NotAppliedDroppedDiio = () => {
  const api = useContext(APIContext);

  const getOwnerRut = () => {
    return "123456789";
  };
  const getOwnerName = () => {
    return "Ignacio Figueroa";
  };
  async function getSpecies() {
    return [{ value: 1, label: "Vaca" }, { value: 2, label: "Chancho" }];
  }
  async function getDropReasons() {
    return [{ value: 1, label: "Nose" }, { value: 2, label: "Pq Si" }];
  }
  const [species, setspecies] = useState();
  const [diio_ranges, setdiio_ranges] = useState([]);

  return (
    <div>
      <h2 className="title">Baja de DIIO no aplicados</h2>
      <Formik
        className="body"
        initialValues={{
          ownerRut: getOwnerRut(),
          specie: null,
          startDiio: null,
          endDiio: null,
          dropReason: null,
          ranges: []
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.ranges = diio_ranges;
          dropDiioRanges(api, JSON.stringify(diio_ranges), values.dropReason);
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
              <p>Rut: {values.ownerRut}</p>
              <p>Nombre: {getOwnerName()}</p>
              <div className="rango-diio">
                <Selector
                  fieldName="specie"
                  fieldValue={values.specie}
                  labelName="Especie"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.label);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedSpecie}
                  data={getSpecies}
                />
                <br />
                <Selector
                  fieldName="dropReason"
                  fieldValue={values.dropReason}
                  labelName="Motivo Baja"
                  onChange={(field, fieldValue) => {
                    console.log(fieldValue);

                    setFieldValue(field, fieldValue.value);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedDropReason}
                  data={getDropReasons}
                />
              </div>
              <br />
              <h4>Rangos de DIIO</h4>
              <div className="rangos">
                <Field
                  className="field"
                  type="text"
                  name="startDiio"
                  placeholder="Desde"
                />
                <Field
                  className="field"
                  type="text"
                  name="endDiio"
                  placeholder="Hasta"
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => {
                    setdiio_ranges([
                      ...diio_ranges,
                      [values.startDiio, values.endDiio]
                    ]);
                  }}
                >
                  Agregar Rango
                </button>
              </div>
              <br />
              <hr />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
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

export default NotAppliedDroppedDiio;
