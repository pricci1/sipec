import React, { useState } from "react";
import { Formik, Field } from "formik";

import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";

const NotAppliedDroppedDiio = () => {
  const getOwnerRut = () => {
    return "123456789";
  };
  const getOwnerName = () => {
    return "Ignacio Figueroa";
  };
  async function getSpecies() {
    return [{ value: "1", label: "Vaca" }, { value: "2", label: "Chancho" }];
  }
  async function getDropReasons() {
    return [{ value: "1", label: "Nose" }, { value: "2", label: "Pq Si" }];
  }

  return (
    <div>
      <h2>Baja de Diio no aplicados</h2>
      <Formik
        initialValues={{
          ownerRut: getOwnerRut(),
          diioRanges: [],
          specie: null,
          startDiio: null,
          endDiio: null,
          dropReason: null
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
                data={getSpecies}
              />
              <Selector
                fieldName="dropReason"
                fieldValue={values.dropReason}
                labelName="Motivo Baja"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldValue}
                touched={touched.selectedDropReason}
                data={getDropReasons}
              />
              <h4>Rangos</h4>
              <Field type="text" name="startDiio" placeholder="Desde" />
              <Field type="text" name="endDiio" placeholder="Hasta" />
              <button
			  	type="button"
                onClick={() => {
                  setFieldValue("diioRanges", [
                    ...values.diioRanges,
                    {
                      startDiio: values.startDiio,
                      endDiio: values.endDiio
                    }
                  ]);
                  setFieldValue("startDiio", null);
                  setFieldValue("endDiio", null);
                  handleReset;
                }}
              >
                Agregar Rango
              </button>
              <button type="submit" disabled={isSubmitting}>
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
