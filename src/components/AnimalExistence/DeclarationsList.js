import React, { useContext, useState } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
import { Formik, Field } from "formik";
import { DeclarationsTable } from "./Utils/DeclarationsTable";
import useModal from "../Modal";
import { Selector } from "./Utils/FormikSelectors";
// import {  } from "../../lib/APIAnimalExistence";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getComunas = () => [];
const getRegions = () => [];

const DeclarationsList = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalDeclarationId, setModalDeclarationId] = useState();

  return (
    <div className="body">
      <h1>Lista de Declaración de Existencia</h1>
      <h2>Filtrar Declaraciones</h2>
      <Formik
        initialValues={{
          rup: "",
          name: "",
          region: "",
          comuna: "",
          registrationDate: { from: "", to: "" },
          declarationDate: { from: "", to: "" }
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
              <h3>rup</h3>
              <Field name="rup" className="form-control" />
              <h3>nombre</h3>
              <Field name="name" className="form-control" />
              <h3>Region</h3>
              <Selector
                fieldName="region"
                fieldValue={values.region}
                label="Region"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.region}
                options={getRegions()}
                errors={errors.region}
              />
              <h3>Comuna</h3>
              <Selector
                fieldName="comuna"
                fieldValue={values.comuna}
                label="Comuna"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.comuna}
                options={getComunas()}
                errors={errors.comuna}
              />
              <h3>fecha</h3>
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.registrationDate.from}
                onChange={value => {
                  setFieldValue("registrationDate.from", value);
                }}
                onSelect={handleChange}
                name="registrationDate.from"
                locale="es-CL"
                dateFormat="dd/MM/yy"
              />
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.registrationDate.to}
                onChange={value => {
                  setFieldValue("registrationDate.to", value);
                }}
                minDate={values.registrationDate.from}
                onSelect={handleChange}
                name="registrationDate.to"
                locale="es-CL"
                dateFormat="dd/MM/yy"
              />
              <h3>fecha</h3>
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.declarationDate.from}
                onChange={value => {
                  setFieldValue("declarationDate.from", value);
                }}
                onSelect={handleChange}
                name="declarationDate.from"
                locale="es-CL"
                dateFormat="dd/MM/yy"
              />
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.declarationDate.to}
                onChange={value => {
                  setFieldValue("declarationDate.to", value);
                }}
                minDate={values.declarationDate.from}
                onSelect={handleChange}
                name="declarationDate.to"
                locale="es-CL"
                dateFormat="dd/MM/yy"
              />
            </form>
          );
        }}
      </Formik>
      <hr />
      <DeclarationsTable
        toggleModal={toggleModal}
        setModalDeclarationId={setModalDeclarationId}
      />
      <button type="button" onClick={toggleModal}>
        Open modal
      </button>
      {modalIsOpened && (
        <Modal>
          <table className="table">
            <tbody>
              <tr>
                <th className="text-nowrap">RUP</th>
                <td>1.1.1.1</td>
              </tr>
              <tr>
                <th className="text-nowrap">Nombre</th>
                <td>
                  Agricola Las Palmas Y Otrsas Cosas Que Hacen El Nombre Muy
                  Largo
                </td>
              </tr>
              <tr>
                <th className="text-nowrap">Comuna</th>
                <td>Puyehue</td>
              </tr>
              <tr>
                <th className="text-nowrap">Fecha Declaración</th>
                <td>1/1/1</td>
              </tr>
              <tr>
                <th className="text-nowrap">Fecha Registro</th>
                <td>2/2/2</td>
              </tr>
              <tr>
                <th className="text-nowrap">Año</th>
                <td>2002</td>
              </tr>
            </tbody>
          </table>
          <h2>{modalDeclarationId}</h2>
        </Modal>
      )}
    </div>
  );
};

export default DeclarationsList;
