import React, { useState, useContext, useEffect } from "react";
import { Formik, Field } from "formik";
import { Datepicker } from "react-formik-ui";
import Selector from "../components/Diio/Utilities/FormikSelector";
// import DatePicker from "react-datepicker";

// import SIPECtable from "../components/AnimalMoves/SIPECtable";

import { getSpecies } from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

import PucharseListDiio from "../components/Diio/PucharseListDiio";
import PurchaseListDiioTab from "../routes/DIIOMenuTabs/PurchaseListDiioTab";
import InventoryDiioTab from "../routes/DIIOMenuTabs/InventoryDiioTab";

const ListadoBajaDIIO = () => {
  const api = useContext(APIContext);

  async function getSpeciesAPI() {
    const data = await getSpecies(api);
    console.log(data);
    return data;
  }
  return (
    <div>
      <h1>Listado Baja de DIIO</h1>
      <div>
        <h2>Buscar Baja de DIIO</h2>
        <Formik
          initialValues={{ desde: "", hasta: "", specie: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            //   errors,
            touched,
            //   handleChange,
            //   handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                labelName="Especie"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                // data={getSpecies}
                data={getSpeciesAPI}
              />
              <p></p>
              <h3>Rango DIIO</h3>
              <p></p>
              <Datepicker
                selected={values.desde}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                name="desde"
                label="Desde"
              />
              <Datepicker
                selected={values.hasta}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                name="hasta"
                label="Hasta"
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Filtrar
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {/* <SIPECtable cases="listadebajas" /> */}
        {/* <InventoryDiioTab /> */}
      </div>
    </div>
  );
};
export default ListadoBajaDIIO;
