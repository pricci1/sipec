import React, { useContext, useState } from "react";

import APIContext from "../APIProvider";
import { Formik } from "formik";
import {getEstablishmentsApi} from "../../lib/ApiAnimalAdministration";
import DatePicker from "react-datepicker";
import { Selector } from "./Utils/FormikSelectors";
import   ChangeDiioTable  from "./ChangeDiioTable";
import ChangeDiioDetails from "./ChangeDiioDetails";
import useModal from "../Modal";
const ChangeDiioList = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalChangeId, setModalChangeId] = useState();
  const [data, setData] = useState([]);

  async function getEstablishments() {
    let data = await getEstablishmentsApi(api);
    return data;
  }

  return (
    <>
      <h1>Buscar cambio de Diio aplicado</h1>
      <Formik
        initialValues={{
          establishment: "",
          date: { from: "", to: "" }
        }}
        onSubmit={formData => {
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
              <h6>Fecha de registro</h6>
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
                Buscar registros
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
      <br/>
      <ChangeDiioTable
        toggleModal={toggleModal}
        setModalChangeId={setModalChangeId}
      />
      {modalIsOpened && (
          <Modal>
              <ChangeDiioDetails changeId={modalChangeId}/>              
          </Modal>
      )}
    </>
  );
};
