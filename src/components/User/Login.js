import React, { useContext, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import APIContext from "../APIProvider";

const Login = () => {
  const api = useContext(APIContext);
  const [loginError, setLoginError] = useState(false);

  return (
    <div className="jumbotron">
      {loginError ? <h3 className="text-danger">Hay un error</h3> : null}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string().required("Password is required")
        })}
        onSubmit={fields => {
          api.login(fields.email, fields.password).then(resp => {
            resp.success ? setLoginError(false) : setLoginError(true);
          });
        }}
      >
        {props => {
          const { touched, errors } = props;
          return (
            <Form>
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
                <label htmlFor="password">Password</label>
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
                <button type="submit" className="btn btn-primary mr-2">
                  Sign In
                </button>
                <button type="reset" className="btn btn-secondary">
                  Reset
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
