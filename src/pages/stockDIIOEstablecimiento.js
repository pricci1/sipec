import React from "react";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

const StockDIIOEstablecimiento = () => (
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
          especie: "",
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
          // touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <p></p>
            <text>Comprador</text>
            <input
              type="text"
              name="comprador"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comprador}
            />
            <p></p>
            <text>Vendedor</text>
            <input
              type="text"
              name="vendedor"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vendedor}
            />
            <p></p>
            <text>Establecimiento</text>
            <input
              type="text"
              name="establecimiento"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.establecimiento}
            />

            <text>RUP</text>
            <input
              type="text"
              name="rup"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rup}
            />
            <p></p>
            <text>Marca</text>

            <Field name="marca" component="select" placeholder="Marca">
              <option value="cromasa">CROMASA</option>
              <option value="marca1">MARCA1</option>
              <option value="marca2">MARCA2</option>
            </Field>
            <text>Especie</text>

            <Field name="tipo" component="select" placeholder="Tipo">
              <option value="abejas">Abejas</option>
              <option value="bovino">Bovino</option>
              <option value="caracol">Caracol</option>
            </Field>
            {/* <input
              type="text"
              name="especie"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.especie}
            /> */}
            {/* {errors.email && touched.email && errors.email} */}
            <p></p>
            <text>Tipo</text>

            <Field name="especie" component="select" placeholder="Especie">
              <option value="abejas">Abejas</option>
              <option value="bovino">Bovino</option>
              <option value="caracol">Caracol</option>
            </Field>
            <p></p>
            <text>Fecha</text>

            <text>Desde: </text>
            <DatePicker
              selected={values.desde}
              //   dateFormat="MMMM d, yyyy"
              //   className="form-control"
              name="desde"
              onChange={date => setFieldValue("desde", date)}
            />
            {/* {errors.password && touched.password && errors.password} */}
            <text>Hasta: </text>
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

export default StockDIIOEstablecimiento;
