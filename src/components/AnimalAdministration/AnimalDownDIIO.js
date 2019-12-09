import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import useModal from "../Modal";
import APIContext from "../APIProvider";
import Selector from "../Diio/Utilities/FormikSelector";
import { AnimalDownTable } from "./AnimalDownDIIOTable";
import { Link } from "@reach/router";
import {
  getEstablishmentsApi,
  getAnimalDeathTableApi,
  getAnimalDeathTableFilteredApi
} from "../../lib/ApiAnimalAdministration";


const AnimalDownDIIO = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    return data;
  }

  async function getDataTable(establishment, desde, hasta) {

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
    const data = await getAnimalDeathTableFilteredApi(
      api,
      establishment.value,
      new_desde,
      new_hasta
    );
    setData(data);
    return data;
  }
  

  return (
    <div className="">
      <h1>Buscar baja animales con DIIO</h1>
      <div>
        <Formik
          initialValues={{
            establishment: "",
            date: { from: "", to: "" }
          }}
          onSubmit={(values, { setSubmitting }) => {
            getDataTable(values.establishment, values.desde, values.hasta);
            setSubmitting(false);
          }}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            handleSubmit,
            handleReset,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            handleBlur,
            handleChange
          }) => (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                labelName="RUP - Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                data={getEstablishments}
                errors={errors.establishment}
              />
              <div
                className="row"
                style={{ textAlign: "justify", marginTop: "10px" }}
              >
                <div className="col-md-2" style={{ direction: "rtl" }}>
                  <label htmlFor="from-date">Fecha de verificación</label>
                </div>
                <div className="col-md-2">
                  <DatePicker
                    id="from-date"
                    onBlur={handleBlur}
                    className="form-control"
                    selected={values.date.from}
                    onChange={value => {
                      setFieldValue("date.from", value);
                    }}
                    onSelect={handleChange}
                    name="date.from"
                    dateFormat="dd/MM/yy"
                  />
                </div>
                <div className="col-md-2">
                  <DatePicker
                    onBlur={handleBlur}
                    className="form-control"
                    selected={values.date.to}
                    onChange={value => {
                      setFieldValue("date.to", value);
                    }}
                    minDate={values.date.from}
                    onSelect={handleChange}
                    name="date.to"
                    dateFormat="dd/MM/yy"
                  />
                </div>
              </div>
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <div className="col-md-7">
                  <button
                    className="btn btn-outline-secondary mt-4"
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
        <br />
        <Link to="nueva" className="btn btn-primary">
          &#10010; Nueva Muerte
        </Link>
        <AnimalDownTable
          data={data}
          toggleModal={toggleModal}
          setModalRegistryId={setModalRegistryId}
        />
      </div>
    </div>
  );
};

export default AnimalDownDIIO;
