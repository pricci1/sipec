import React, { useContext, useState, useEffect } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
import { Formik } from "formik";
import { Link } from "@reach/router";
import useModal from "../Modal";
import DatePicker from "react-datepicker";
import { Selector } from "./Utils/FormikSelectors";
import { AnimalEstablishmentRegistryTable } from "./AnimalEstablishmentRegistryTable";
import { getUserEstablishmentsApi } from "../../lib/ApiAnimalAdministration";
import AnimalEstablishmentRecordDetails from "./AnimalEstablishmentRecordDetails";

const AnimalEstablishmentRegistry = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);
  const [establishments, setestablishments] = useState();

  useEffect(() => {
    getEstablishments();
  }, []);

  async function getEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.titular.id);
    setestablishments(data);
  }
  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Buscar Registro Animal</h1>
      <br></br>
      <Formik
        initialValues={{
          establishment: "",
          date: { from: "", to: "" }
        }}
        onSubmit={formData => {
          // send formData to backend
          // set 'data' using 'setData' with backend's response with thisstructure:
          // [{rup, establishment, tiutlar, date, quantity},{rup, establishment, ttiutlar, date, quantity}]
          console.log(formData);
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
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                label="RUP - Establecimiento"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                }}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={establishments}
                errors={errors.establishment}
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
                  <DatePicker
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

              <br />
              <button
                className="btn btn-primary mt-4"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Buscar Registros
              </button>
              <button
                onClick={handleReset}
                className="btn btn-secondary mt-4 ml-1"
                type="button"
              >
                Limpiar
              </button>
            </form>
          );
        }}
      </Formik>
      <br />
      <Link to="new" className="d-md-inline btn btn-primary">
        &#10010; Nuevo
      </Link>
      <AnimalEstablishmentRegistryTable
        data={data}
        toggleModal={toggleModal}
        setModalRegistryId={setModalRegistryId}
      />
      {modalIsOpened && (
        <Modal>
          <AnimalEstablishmentRecordDetails registryId={modalRegistryId} />
          <h2>{modalRegistryId}</h2>
        </Modal>
      )}
    </div>
  );
};

export default AnimalEstablishmentRegistry;
