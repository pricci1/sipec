import React, { useContext } from "react";
import { Formik, Field } from "formik";

import Selector from "../components/Diio/Utilities/FormikSelector";
import { Datepicker } from "react-formik-ui";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

import { getSpecies, getBrands, getModels } from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

import InventoryDiioTab from "../routes/DIIOMenuTabs/InventoryDiioTab";
import "./stockDIIOEstablecimiento.css";

const StockDIIOEstablecimiento = () => {
  const api = useContext(APIContext);

  async function getSpeciesAPI() {
    const data = await getSpecies(api);
    console.log(data);
    return data;
  }

  async function getBrandsAPI() {
    const data = await getBrands(api);
    console.log(data);
    return data;
  }

  async function getModelsAPI() {
    const data = await getModels(api);
    console.log(data);
    return data;
  }

  return (
    <div className="body">
      <h2>Consulta Stock DIIO Establecimiento</h2>

      <h4>Buscar Folio Productor</h4>
      <Formik
        initialValues={{
          comprador: "",
          vendedor: "",
          establecimiento: "",
          rup: "",
          brand: "",
          tipo: "",
          desde: "",
          hasta: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          // errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h6>Comprador</h6>
            <Field name="comprador" className="form-control" />
            <h6>Vendedor</h6>
            <Field name="vendedor" className="form-control" />
            <h6>Establecimiento</h6>
            <Field name="establecimiento" className="form-control" />
            <h6>RUP</h6>
            <Field name="rup" className="form-control" />
            <br></br>
            <Selector
              fieldName="brand"
              fieldValue={values.specie}
              labelName="Marca"
              onChange={(field, fieldValue) => {
                setFieldValue(field, fieldValue.label);
              }}
              onBlur={setFieldTouched}
              touched={touched.selectedSpecie}
              data={getBrandsAPI}
            />
            <Selector
              fieldName="tipo"
              fieldValue={values.specie}
              labelName="Tipo"
              onChange={(field, fieldValue) => {
                setFieldValue(field, fieldValue.label);
              }}
              onBlur={setFieldTouched}
              touched={touched.selectedSpecie}
              data={getModelsAPI}
            />
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
            <p className="label">Fecha</p>
            <div className="fecha">
              <Datepicker
                placeholder="Desde"
                selected={values.desde}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                name="desde"
              />
              <Datepicker
                selected={values.hasta}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                name="hasta"
                placeholder="Hasta"
              />
            </div>
            {/* {errors.password && touched.password && errors.password} */}
            <br />
            <button
              className="btn btn-outline-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Filtrar
            </button>
          </form>
        )}
      </Formik>

      <div>
        {/* <SIPECtable cases="buscarfolioproductor" /> */}

        <InventoryDiioTab />
      </div>
    </div>
  );
};

export default StockDIIOEstablecimiento;
