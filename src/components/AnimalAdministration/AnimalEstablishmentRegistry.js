import React, { useContext, useState, useEffect } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext, { APIProvider } from "../APIProvider";
import { Formik } from "formik";
import { Link } from "@reach/router";
import useModal from "../Modal";
import DatePicker from "react-datepicker";
import { Selector } from "./Utils/FormikSelectors";
import { AnimalEstablishmentRegistryTable } from "./AnimalEstablishmentRegistryTable";
import {
  getUserEstablishmentsApi,
  getAnimalsApi
} from "../../lib/ApiAnimalAdministration";
import AnimalEstablishmentRecordDetails from "./AnimalEstablishmentRecordDetails";
import { statement } from "@babel/template";

const AnimalEstablishmentRegistry = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);
  const [establishments, setestablishments] = useState();
  const [state, setState] = useState({ infoAvailable: false });

  useEffect(() => {
    getEstablishments();
  }, []);

  async function getEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.titular.id);
    setestablishments(data);
  }

  async function getAnimals(establishmentId) {
    setState({ infoAvailable: false });
    const info = await getAnimalsApi(api, establishmentId);
    //console.log(info);
    var json = {};
    var list = [];
    for (let entry in info) {
      let animal_json = {};
      animal_json.rup = info[entry][0].rup;
      animal_json.titular = info[entry][0].titular;
      animal_json.register_date = info[entry][0].register_date;
      animal_json.establishment = info[entry][0].origin_establishment;
      animal_json.quantity = info[entry].length;
      list.push(animal_json);
    }
    json.animals = list;
    console.log(json);
    setData(json);
    setState({ infoAvailable: true });
  }

  return (
    <div className="body">
      <h1>Buscar Registro Animal</h1>
      <Formik
        initialValues={{
          establishment: "",
          date: { from: "", to: "" }
        }}
        onSubmit={(values, { setSubmitting }) => {
          getAnimals(values.establishment.value);
          setSubmitting(false);
        }}
        //onSubmit={formData => {
        // send formData to backend
        // set 'data' using 'setData' with backend's response with thisstructure:
        // [{rup, establishment, tiutlar, date, quantity},{rup, establishment, ttiutlar, date, quantity}]
        //}}
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
              <div
                className="row"
                style={{ textAlign: "justify", marginTop: "10px" }}
              >
                <div className="col-md-2" style={{ direction: "rtl" }}>
                  <label htmlFor="from-date">Fecha de registro</label>
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

              <div className="row" style={{ justifyContent: "flex-end" }}>
                <div className="col-md-7">
                  <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    //disabled={!dirty || isSubmitting}
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
          );
        }}
      </Formik>
      <br />
      <Link to="new" className="d-md-inline btn btn-primary">
        &#10010; Nuevo
      </Link>
      {state.infoAvailable ? (
        <>
          <AnimalEstablishmentRegistryTable
            headers={[
              "RUP",
              "Titular",
              "Fecha de registro",
              "Establecimiento",
              "Cantidad"
            ]}
            data={data.animals}
            toggleModal={toggleModal}
            setModalRegistryId={setModalRegistryId}
          />
          {modalIsOpened && (
            <Modal>
              <AnimalEstablishmentRecordDetails registryId={modalRegistryId} />
              <h2>{modalRegistryId}</h2>
            </Modal>
          )}
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default AnimalEstablishmentRegistry;
