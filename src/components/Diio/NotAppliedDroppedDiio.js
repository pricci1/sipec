import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import APIContext from "../APIProvider"
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import {dropDiioRanges ,getSpecies} from "../../lib/APIDiio"

const NotAppliedDroppedDiio = () => {
  const api = useContext(APIContext);  

  const getOwnerRut = () => {
    return "123456789";
  };
  const getOwnerName = () => {
    return "Ignacio Figueroa";
  };
  async function getSpeciesData() {
    const data = await getSpecies(api);
    return data
  }
  async function getDropReasons() {
    return [{ value: 1, label: "Motivo 1" }, { value: 2, label: "Motivo 2" }];
  }
  const [species, setspecies] = useState();
  const [diio_ranges, setdiio_ranges] = useState([]);

  return (
    <div>
      <h2>Baja de Diio no aplicados</h2>
      <Formik
        initialValues={{
          ownerRut: getOwnerRut(),
          specie: null,
          startDiio: null,
          endDiio: null,
          dropReason: null,
          ranges:[]
        }}

        onSubmit = {(values, {setSubmitting}) => {
          values.ranges = diio_ranges
          dropDiioRanges(
            api, 
            JSON.stringify(diio_ranges)
            );
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
              <h3>Rango de Diio</h3>
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                labelName="Especie"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                data={getSpeciesData}
              />
              <Selector
                fieldName="dropReason"
                fieldValue={values.dropReason}
                labelName="Motivo Baja"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedDropReason}
                data={getDropReasons}
              />
              <h4>Rangos</h4>
              <Field type="text" name="startDiio" placeholder="Desde" />
              <Field type="text" name="endDiio" placeholder="Hasta" />

              <button 
                type="button"
                onClick={() => {
                  setdiio_ranges([
                    ...diio_ranges,
                    [
                      values.startDiio,
                      values.endDiio,
                      values.specie,
                      values.dropReason
                  ]
                  ])
                  
                }}
              >Agregar Rango</button>
              <button type="submit"  disabled={isSubmitting}>
                Cargar Baja
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NotAppliedDroppedDiio;
