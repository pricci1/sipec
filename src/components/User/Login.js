import React, { useContext, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import APIContext from "../APIProvider";

const Login = ({ setLoggedCallback }) => {
  const api = useContext(APIContext);
  const [loginError, setLoginError] = useState(false);

  const successfulLogin = () => {
    setLoggedCallback(true);
  };

  return (
    <div style={{ margin: "50px" }} className="jumbotron">
      {loginError ? (
        <h3 className="text-danger">Credenciales erroneas.</h3>
      ) : null}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Debe ser un email válido")
            .required("Required"),
          password: Yup.string().required("La contraseña es requerida")
        })}
        onSubmit={(fields, { setSubmitting }) => {
          api.login(fields.email, fields.password).then(resp => {
            resp.success ? successfulLogin() : setLoginError(true);
            setSubmitting(false);
          });
        }}
      >
        {props => {
          const { touched, errors, handleSubmit, isSubmitting } = props;
          return (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                  disabled={isSubmitting}
                >
                  Iniciar sesión
                </button>
                <button type="reset" className="btn btn-secondary">
                  Limpiar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
