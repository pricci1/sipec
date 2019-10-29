import React, { useContext, useState } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
import { Formik, Field } from "formik";
import { Link } from "@reach/router";
import useModal from "../Modal";
import DatePicker from "react-datepicker";
import { Selector } from "./Utils/FormikSelectors";
import { AnimalEstablishmentRegistryTable } from "./AnimalEstablishmentRegistryTable";
import AnimalEstablishmentRecordDetails from "./AnimalEstablishmentRecordDetails";

const getEstablishments = () => {
  return [
    { value: 1, label: "96.865.754-k - El Salto de Pilmaiquen" },
    { value: 2, label: "12.345.123-2 - La Mosqueta" }
  ];
};

const AnimalEstablishmentRegistry = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);

  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Buscar Registro Animal</h1>
      <Link to="new" className="d-md-inline btn btn-primary">
        &#10010; Nuevo
      </Link>
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
                label="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={getEstablishments()}
                errors={errors.establishment}
              />
              <br />
              <h6>Fecha de Registro</h6>
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
              <span> </span>
              <span> </span>
              <span> </span>
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
