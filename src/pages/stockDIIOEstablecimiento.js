import React, { useContext } from "react";
import { Formik, Field } from "formik";

import Selector from "../components/Diio/Utilities/FormikSelector";
import { Datepicker } from "react-formik-ui";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

import { getSpecies, getBrands, getModels } from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

import InventoryDiioTab from "../routes/DIIOMenuTabs/InventoryDiioTab";

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
    <div>
      <h1>Consulta Stock DIIO Establecimiento</h1>
      <div>
        <h2>Buscar Folio Productor</h2>
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
              <p></p>
              <h4>Comprador</h4>
              <input
                type="text"
                name="comprador"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comprador}
              />
              <p></p>
              <h4>Vendedor</h4>
              <input
                type="text"
                name="vendedor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vendedor}
              />
              <p></p>
              <h4>Establecimiento</h4>
              <input
                type="text"
                name="establecimiento"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.establecimiento}
              />

              <h4>RUP</h4>
              <input
                type="text"
                name="rup"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rup}
              />
              <p></p>
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
              <p></p>
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

              <p></p>
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
              <h3>Fecha</h3>

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

              {/* {errors.password && touched.password && errors.password} */}

              <button type="submit" disabled={isSubmitting}>
                Filtrar
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {/* <SIPECtable cases="buscarfolioproductor" /> */}

        <InventoryDiioTab />
      </div>
    </div>
  );
};

export default StockDIIOEstablecimiento;
