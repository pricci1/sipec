import React, { useContext, useState, useEffect } from "react";
import APIContext from "../APIProvider";
import { Formik } from "formik";
import {
  getUserEstablishmentsApi,
  getChangeDiioDataApi,
  getChangeDiioDataFilteredApi
} from "../../lib/ApiAnimalAdministration";
import DatePicker from "react-datepicker";
import Selector from "../Diio/Utilities/FormikSelector";
import { Link } from "@reach/router";
import ChangeDiioTable from "./ChangeDiioTable";
import ChangeDiioDetails from "./ChangeDiioDetails";
import useModal from "../Modal";

const ChangeDiioList = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalChangeId, setModalChangeId] = useState();
  const [tableData, settableData] = useState([]);

  async function getEstablishments() {
    let data = await getUserEstablishmentsApi(api, api.titular.id);
    return data;
  }

  async function getTableData(values) {
    console.log(values);
    var new_desde = new String();
    var new_hasta = new String();
    new_desde =
      values.date.from.getFullYear().toString() +
      "-" +
      (values.date.from.getMonth() + 1).toString() +
      "-" +
      values.date.from.getDate().toString();
    new_hasta =
      values.date.to.getFullYear().toString() +
      "-" +
      (values.date.to.getMonth() + 1).toString() +
      "-" +
      values.date.to.getDate().toString();
    const data = await getChangeDiioDataFilteredApi(
      api,
      values.establishment.id,
      new_desde,
      new_hasta
    );
    console.log(data);
    settableData(data.data);
  }

  useEffect(() => {}, []);

  return (
    <>
      <h1>Buscar cambio de Diio aplicado</h1>
      <Formik
        initialValues={{
          establishment: "",
          date: { from: "", to: "" }
        }}
        onSubmit={(values, { setSubmitting }) => {
          getTableData(values);
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
                    placeholderText="Desde"
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
                    placeholderText="Hasta"
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
                  <button type="submit" className="btn btn-primary mt-4 ml-1">
                    Buscar
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

      <ChangeDiioTable
        toggleModal={toggleModal}
        setModalChangeId={setModalChangeId}
        tableData={tableData || []}
      />
      {modalIsOpened && (
        <Modal>
          <ChangeDiioDetails changeId={modalChangeId} />
        </Modal>
      )}
    </>
  );
};
export default ChangeDiioList;
