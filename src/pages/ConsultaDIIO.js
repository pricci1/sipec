import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const ConsultaDIIO = () => {
  const [data, setData] = useState({ mail: "a", name: "def" });

  return (
    <>
      <h2>Consulta DIIO</h2>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setData(prevState => ({ ...prevState, mail: values.email }));
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email must be valid")
            .required("Required")
        })}
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
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" style={{ display: "block" }}>
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}

              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
      <br />
      <h3>{data.mail}</h3>
    </>
  );
};

export default ConsultaDIIO;
