import React from "react";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";

import SIPECtable from "../components/AnimalMoves/SIPECtable";

const ListadoBajaDIIO = () => (
  <div>
    <h1>Listado Baja de DIIO</h1>
    <div>
      <h2>Buscar Baja de DIIO</h2>
      <Formik
        initialValues={{ desde: "", hasta: "", especie: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <text>Especie</text>

            <Field name="especie" component="select" placeholder="Especie">
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
            <text>Rango DIIO</text>
            <p></p>
            <text>Desde</text>
            <DatePicker
              selected={values.desde}
              //   dateFormat="MMMM d, yyyy"
              //   className="form-control"
              name="desde"
              onChange={date => setFieldValue("desde", date)}
            />
            {/* {errors.password && touched.password && errors.password} */}
            <text>Hasta</text>
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
      <SIPECtable cases="listadebajas" />
    </div>
  </div>
);

export default ListadoBajaDIIO;
