import React, { useEffect, useContext, useState } from "react";
import * as Yup from "yup";
import { Link } from "@reach/router";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";
import { MovementListTable } from "./MovementListTable";
import { Selector } from "../AnimalExistence/Utils/FormikSelectors";
import { getUserEstablishmentsApi } from "../../lib/ApiEstablishment";
import APIContext from "../APIProvider";

const validations = Yup.object().shape({
  seller_type: Yup.string()
    .nullable()
    .required("Requerido"),
  diio_ranges: Yup.array().of(
    Yup.object()
      .shape({
        desde: Yup.number()
          .min(0, "Desde debe ser >= 0")
          .required("Requerido"),
        hasta: Yup.number()
          .min(Yup.ref("desde"), `"Hasta" debe ser igual o mayor a "Desde"`)
          .required("Requerido")
      })
      .required()
  )
});

const RadioGroup = ({ field, form, ...props }) => {
  return (
    <>
      <input {...field} {...props} />
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          Por lote
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="option2"
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Por DIIO
        </label>
      </div>
    </>
  );
};

const MovementList = () => {
  const api = useContext(APIContext);
  const [establishments, setEstablishments] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getAnimalMovementTable = async () => {
    const movements = await api.get("/animal_movement_table");
    if (!movements.success) {
      return null;
    }
    return movements.data;
  };

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
      getAnimalMovementTable().then(res => setTableData(res))
    ];
    Promise.all(tasks);
  }, []);
  return (
    <>
      <h2>Historial de Movimientos Animales</h2>
      <Formik
        initialValues={{
          date: { from: "", to: "" },
          origin: "",
          destiny: "",
          form_number: "",
          form_state: "",
          get_by: "diio"
        }}
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
              <table className="table table-sm table-borderless w-75">
                <tbody>
                  <tr>
                    <th>Rango de Fechas</th>
                    <td>
                      <DatePicker
                        placeholderText="Desde"
                        onBlur={handleBlur}
                        className="form-control mr-2"
                        selected={values.date.from}
                        onChange={value => {
                          setFieldValue("date.from", value);
                        }}
                        onSelect={handleChange}
                        name="date.from"
                        dateFormat="dd/MM/yy"
                      />
                      <DatePicker
                        placeholderText="Hasta"
                        onBlur={handleBlur}
                        className="form-control ml-2"
                        selected={values.date.to}
                        minDate={values.date.from}
                        onChange={value => {
                          setFieldValue("date.to", value);
                        }}
                        onSelect={handleChange}
                        name="date.to"
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
                    <th className="mr-2">N⁰ Formulario</th>

                    <td>
                      <Field
                        className="form-control"
                        type="number"
                        name="form_number"
                        placeholder="Form Number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-2">Estado del Formulario</th>

                    <td>
                      <Selector
                        row={false}
                        overrideClass={"mw-100"}
                        fieldName="form_state"
                        fieldValue={values.form_state}
                        // label="Estado formulario"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        touched={touched.form_state}
                        options={[
                          { value: "Aceptado", label: "Aceptado" },
                          { value: "Con problemas", label: "Con problemas" },
                          { value: "En transito", label: "En transito" }
                        ]}
                        errors={errors.form_state}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                className="btn btn-primary mr-1"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Realizar búsqueda
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
      <br />
      <Link className="btn btn-primary" to="nueva">
        + Nuevo movimiento
      </Link>
      <br />
      <MovementListTable tableData={tableData || []} />
    </>
  );
};

export default MovementList;
