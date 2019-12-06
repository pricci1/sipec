import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import { Datepicker } from "react-formik-ui";
import * as Yup from "yup";
import Selector from "./Utilities/FormikSelector";
import DroppedDiioTable from "./DroppedDiioTable"

import {
  getSpecies,
  getDownListTableApi,
  getDroppedDiioList
} from "../../lib/APIDiio";
import APIContext from "../APIProvider";

import "./listadoBajaDIIO.css";

const ListadoBajaDIIO = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);

  async function getDataTableFiltered(specie, desde, hasta) {
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
    const data = await getDownListTableApi(api, specie, new_desde, new_hasta);
    setData(data);
    return data;
  }

  async function getDataTable() {
    let response = await getDroppedDiioList(api);
    setData(response);
  }

  useEffect(() => {
    getDataTable();
  }, []);

  async function getSpeciesAPI() {
    const data = await getSpecies(api);
    return data;
  }
  return (
    <div className="body">
      <h2>Listado Baja de DIIOs</h2>
      <div>
        <Formik
          initialValues={{ desde: "", hasta: "", specie: "" }}
          onSubmit={(values, { setSubmitting }) => {
            getDataTable(values.establishment, values.desde, values.hasta);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleReset,
            dirty,
            //   handleChange,
            //   handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                labelName="Especie"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.specie}
                data={getSpeciesAPI}
                required={true}
                errors={errors.specie}
              />
              <br />
              <div
                className="row"
                style={{ textAlign: "justify", marginTop: "10px" }}
              >
                <div className="col-md-2" style={{ direction: "rtl" }}>
                  <label htmlFor="from-date">Fecha de verificación</label>
                </div>
                <div className="col-md-2">
                  <Datepicker
                    selected={values.desde}
                    dateFormat="dd/MM/yy"
                    className="form-control"
                    name="desde"
                    placeholder="Desde"
                    errors={errors.desde}
                    required={true}
                  />
                </div>
                <div className="col-md-2">
                  <Datepicker
                    selected={values.hasta}
                    dateFormat="dd/MM/yy"
                    className="form-control"
                    name="hasta"
                    placeholder="Hasta"
                    errors={errors.hasta}
                    required={true}
                  />
                </div>
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
      </div>
      <DroppedDiioTable
        tableData={data}
      />
      
    </div>
  );
};
export default ListadoBajaDIIO;
