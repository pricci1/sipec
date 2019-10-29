import React, { useContext, useState, useEffect } from "react";
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
import { Link } from "@reach/router";
import { getRegions, getNeighborhoods } from "../../lib/APICommon";

const DeclarationsList = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalDeclarationId, setModalDeclarationId] = useState();
  const [fetchedData, setFetchedData] = useState({});

  useEffect(() => {
    const tasks = [
      getRegions(api).then(resp =>
        setFetchedData(oldState => ({ ...oldState, regions: resp }))
      ),
      getNeighborhoods(api).then(resp =>
        setFetchedData(oldState => ({ ...oldState, comunas: resp }))
      )
    ];
    Promise.all(tasks);
  }, []);

  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Lista de Declaración de Existencia</h1>
      <Link to="new" className="d-md-inline btn btn-primary">
        &#10010; Nueva
      </Link>
      <h3>Filtrar Declaraciones</h3>
      <Formik
        initialValues={{
          rup: "",
          name: "",
          region: "",
          comuna: "",
          registrationDate: { from: "", to: "" },
          declarationDate: { from: "", to: "" }
        }}
        onSubmit={(values, { setSubmitting }) => {
          const {
            rup,
            region: { value: region },
            comuna: { value: neighborhood },
            registrationDate,
            declarationDate
          } = values;
          const req = {
            rup,
            region,
            neighborhood,
            registrationDate,
            declarationDate
          };
          alert(JSON.stringify(req));
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
              <h6>RUP</h6>
              <Field name="rup" className="form-control" />
              <h6>Nombre del Establecimiento</h6>
              <Field name="name" className="form-control" />
              <Selector
                fieldName="region"
                fieldValue={values.region}
                label="Región"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.region}
                options={fetchedData.regions}
                errors={errors.region}
              />
              <Selector
                fieldName="comuna"
                fieldValue={values.comuna}
                label="Comuna"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.comuna}
                options={fetchedData.comunas}
                errors={errors.comuna}
              />
              <h6>Fecha de Registro</h6>
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.registrationDate.from}
                onChange={value => {
                  setFieldValue("registrationDate.from", value);
                }}
                onSelect={handleChange}
                name="registrationDate.from"
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
                dateFormat="dd/MM/yy"
              />
              <h6>Fecha de Declaración</h6>
              <DatePicker
                onBlur={handleBlur}
                className="form-control"
                selected={values.declarationDate.from}
                onChange={value => {
                  setFieldValue("declarationDate.from", value);
                }}
                onSelect={handleChange}
                name="declarationDate.from"
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
                dateFormat="dd/MM/yy"
              />
              <br />
              <button
                className="btn btn-primary mt-4"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Buscar Declaraciones
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
      <hr />
      <DeclarationsTable
        toggleModal={toggleModal}
        setModalDeclarationId={setModalDeclarationId}
      />
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
