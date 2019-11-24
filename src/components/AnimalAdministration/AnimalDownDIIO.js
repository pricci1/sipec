import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import { Datepicker } from "react-formik-ui";
import useModal from "../Modal";
import APIContext from "../APIProvider";
import Selector from "../Diio/Utilities/FormikSelector";
import { AnimalEstablishmentRegistryTable } from "./AnimalDownDIIOTable";
import { Link } from "@reach/router";
import AnimalEstablishmentRecordDetails from "./AnimalDownDIIODetails";
import {
  getEstablishmentsApi,
  getAnimalDeathTableApi,
  getAnimalDeathTableFilteredApi
} from "../../lib/ApiAnimalAdministration";
// import { getUserEstablishments } from "../../lib/APIDiio";
import * as Yup from "yup";

const searchAnimalDownSchema = Yup.object().shape({
  establishment_id: Yup.string()
    .nullable()
    .required("Requerido"),
  desde: Yup.string()
    .nullable()
    .required("Requerido"),
  hasta: Yup.string()
    .nullable()
    .required("Requerido")
});

const SearchAnimalDownDIIO = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    return data;
  }

  async function getTableData() {
    const data = await getAnimalDeathTableApi(api);
    setData(data);
  }

  async function getDataTable(establishment, desde, hasta) {
    console.log(establishment, desde, hasta);
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
  // useEffect(() => {
  //   getTableData();
  // }, []);

  return (
    <div className="body">
      <h1>Buscar baja animales con DIIO</h1>
      <div>
        <Formik
          initialValues={{
            establishment: "",
            desde: "",
            hasta: ""
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
            setFieldTouched
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
              <p className="label">Fecha</p>
              <div className="fecha">
                <Datepicker
                  placeholder="Desde"
                  selected={values.desde}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"
                  name="desde"
                />
                <Datepicker
                  selected={values.hasta}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"
                  name="hasta"
                  placeholder="Hasta"
                />
              </div>
              {/* {errors.password && touched.password && errors.password} */}
              <br />
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
        <br />
        <Link to="nueva" className="btn btn-primary">
          &#10010; Nueva Muerte
        </Link>
        <AnimalEstablishmentRegistryTable
          data={data}
          toggleModal={toggleModal}
          setModalRegistryId={setModalRegistryId}
        />
      </div>
    </div>
  );
};

export default SearchAnimalDownDIIO;
