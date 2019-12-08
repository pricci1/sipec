import React, { useContext, useState, useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { Selector } from "../AnimalExistence/Utils/FormikSelectors";
import APIContext from "../APIProvider";
import { getUserEstablishmentsApi } from "../../lib/ApiEstablishment";
import { getSpecies } from "../../lib/APICommon";

const validations = Yup.object().shape({
  registrationDate: Yup.string()
    .nullable()
    .required("Requerido"),
  arrivalDate: Yup.string()
    .nullable()
    .required("Requerido"),
  origin: Yup.string()
    .nullable()
    .required("Requerido"),
  destiny: Yup.string()
    .nullable()
    .required("Requerido"),
  specie: Yup.string()
    .nullable()
    .required("Requerido"),
  driver: Yup.string()
    .nullable()
    .required("Requerido"),
  license_plate: Yup.string()
    .nullable()
    .required("Requerido"),
  diio_range: Yup.object()
    .shape({
      from: Yup.number()
        .nullable(true)
        .transform(v => (v === "" ? null : v))
        .min(0, '"Desde" debe ser >= 0')
        .required("Requerido"),
      to: Yup.number()
        .nullable(true)
        .transform(v => (v === "" ? null : v))
        .min(Yup.ref("from"), `"Hasta" debe ser igual o mayor a "Desde"`)
    })
    .required()
});

const NewMovement = () => {
  const api = useContext(APIContext);
  const [establishments, setEstablishments] = useState([]);
  const [species, setSpecies] = useState([]);
  useEffect(() => {
    const tasks = [
      getUserEstablishmentsApi(api, api.titular.id).then(res =>
        setEstablishments(
          res.map(({ id, rup, name }) => ({
            value: id,
            label: `${rup} - ${name}`
          }))
        )
      ),
      getSpecies(api).then(res => setSpecies(res))
    ];
    Promise.all(tasks);
  }, []);
  return (
    <>
      <h3>Crear nuevo Movimiento Animal</h3>
      <Formik
        initialValues={{
          registrationDate: "",
          arrivalDate: "",
          origin: "",
          destiny: "",
          specie: "",
          driver: "",
          license_plate: "",
          diio_range: { from: "", to: "" }
        }}
        validationSchema={validations}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          alert(JSON.stringify(values));
          setSubmitting(false);
        }}
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
            setFieldValue,
            setFieldTouched,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <th className="mr-2">Fecha de registro</th>
                    <td>
                      <DatePicker
                        placeholderText="DD/MM/AA"
                        onBlur={handleBlur}
                        className="form-control"
                        selected={values.registrationDate}
                        onChange={value => {
                          setFieldValue("registrationDate", value);
                        }}
                        onSelect={handleChange}
                        name="registrationDate"
                        dateFormat="dd/MM/yy"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Fecha de llegada</th>
                    <td>
                      <DatePicker
                        placeholderText="DD/MM/AA"
                        onBlur={handleBlur}
                        className="form-control"
                        selected={values.arrivalDate}
                        minDate={values.arrivalDate}
                        onChange={value => {
                          setFieldValue("arrivalDate", value);
                        }}
                        onSelect={handleChange}
                        name="arrivalDate"
                        dateFormat="dd/MM/yy"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Origen</th>
                    <td>
                      <Selector
                        row={false}
                        overrideClass={"mw-100"}
                        fieldName="origin"
                        fieldValue={values.origin}
                        // label="Origen"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        touched={touched.origin}
                        options={establishments || []}
                        errors={errors.origin}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Destino</th>
                    <td>
                      <Selector
                        row={false}
                        overrideClass={"mw-100"}
                        fieldName="destiny"
                        fieldValue={values.destiny}
                        // label="Destino"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        touched={touched.destiny}
                        options={establishments || []}
                        errors={errors.destiny}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Especie</th>
                    <td>
                      <Selector
                        row={false}
                        overrideClass={"mw-100"}
                        fieldName="specie"
                        fieldValue={values.specie}
                        // label="Especie"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        touched={touched.specie}
                        options={species || []}
                        errors={errors.specie}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Conductor</th>
                    <td>
                      <Field
                        className="form-control"
                        type="text"
                        name="driver"
                        placeholder="Conductor"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Patente</th>
                    <td>
                      <Field
                        className="form-control"
                        type="text"
                        name="license_plate"
                        placeholder="Patente"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">DIIO</th>
                    <td>
                      <Field
                        className="form-control"
                        type="number"
                        name="diio_range.from"
                        placeholder="Desde"
                      />
                      {errors.diio_range && errors.diio_range.from && (
                        <td className="text-danger text-wrap mw-50">
                          {errors.diio_range.from || ""}
                        </td>
                      )}
                    </td>
                    <td>
                      <Field
                        className="form-control"
                        type="number"
                        name="diio_range.to"
                        placeholder="Hasta"
                      />
                      {errors.diio_range && errors.diio_range.to && (
                        <td className="text-danger text-wrap mw-50">
                          {errors.diio_range.to || ""}
                        </td>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                className="btn btn-primary mr-1"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Crear
              </button>
              <button
                onClick={handleReset}
                className="btn btn-secondary"
                type="button"
                disabled={!dirty || isSubmitting}
              >
                Limpiar
              </button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default NewMovement;
