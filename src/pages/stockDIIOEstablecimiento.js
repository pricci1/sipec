import React, { useContext } from "react";
import { Formik, Field } from "formik";

import Selector from "../components/Diio/Utilities/FormikSelector";
import DatePicker from "react-datepicker";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

import { getSpecies, getBrand } from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

const StockDIIOEstablecimiento = () => {
  const api = useContext(APIContext);

  async function getSpeciesAPI() {
    const data = await getSpecies(api);
    console.log(data);
    return data;
  }

  async function getBrandAPI() {
    const data = await getBrand(api);
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
            marca: "",
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
              <h4>Marca</h4>
              {/* <Selector
                fieldName="brand"
                fieldValue={values.specie}
                labelName="Marca"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                data={getBrandAPI}
              /> */}
              <Field name="marca" component="select" placeholder="Marca">
                <option value="cromasa">CROMASA</option>
                <option value="marca1">MARCA1</option>
                <option value="marca2">MARCA2</option>
              </Field>
              <h4>Tipo</h4>

              <Field name="tipo" component="select" placeholder="Tipo">
                <option value="abejas">Abejas</option>
                <option value="bovino">Bovino</option>
                <option value="caracol">Caracol</option>
              </Field>
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

              <h3>Desde: </h3>
              <DatePicker
                selected={values.desde}
                //   dateFormat="MMMM d, yyyy"
                //   className="form-control"
                name="desde"
                onChange={date => setFieldValue("desde", date)}
              />
              {/* {errors.password && touched.password && errors.password} */}
              <h3>Hasta: </h3>
              <DatePicker
                selected={values.hasta}
                //   dateFormat="MMMM d, yyyy"
                //   className="form-control"
                name="hasta"
                onChange={date => setFieldValue("hasta", date)}
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
        <SIPECtable cases="buscarfolioproductor" />
      </div>
    </div>
  );
};

export default StockDIIOEstablecimiento;
