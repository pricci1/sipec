import React, { useContext, useState, useEffect } from "react";
import { Formik, Field } from "formik";

import Selector from "../components/Diio/Utilities/FormikSelector";
import { Datepicker } from "react-formik-ui";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

import {
  getSpecies,
  getBrands,
  getModels,
  getStockDIIOEstablishmentTableApi
} from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

import InventoryDiioTab from "../routes/DIIOMenuTabs/InventoryDiioTab";
import "./stockDIIOEstablecimiento.css";

const StockDIIOEstablecimiento = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

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

  async function getDataTable(
    comprador,
    vendedor,
    establecimiento,
    rup,
    brand,
    tipo,
    specie,
    desde,
    hasta
  ) {
    var new_desde = new String();
    var new_hasta = new String();
    new_desde =
      desde.getFullYear().toString() +
      "-" +
      (desde.getMonth() + 1).toString() +
      "-" +
      desde.getDate().toString();
    new_hasta =
      hasta.getFullYear().toString() +
      "-" +
      (hasta.getMonth() + 1).toString() +
      "-" +
      hasta.getDate().toString();
    const data = await getStockDIIOEstablishmentTableApi(
      api,
      comprador,
      vendedor,
      establecimiento,
      rup,
      brand.value,
      tipo.value,
      specie.value,
      new_desde,
      new_hasta
    );
    setData(data);
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
          getDataTable(values.establishment, values.desde, values.hasta);
          setSubmitting(false);
        }}
      >
        {({
          values,
          // errors,
          touched,
          handleChange,
          handleBlur,
          handleReset,
          dirty,
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
              data={getSpeciesAPI}
            />
            <h6>Fecha</h6>
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
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <div className="col-md-7">
                <button
                  className="btn btn-outline-primary mt-4"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Buscar registros
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-secondary mt-4 ml-1"
                  type="button"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>

      <div>
        <InventoryDiioTab data={data} />
      </div>
    </div>
  );
};

export default StockDIIOEstablecimiento;
