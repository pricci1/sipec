import React, { useContext, useState, useEffect } from "react";
import APIContext from "../APIProvider";
import { Formik } from "formik";
import {
  getUserEstablishmentsApi,
  getChangeDiioDataApi
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

  async function getTableData() {
    const data = await getChangeDiioDataApi(api);
    settableData(data);
  }

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <>
      <h1>Buscar cambio de Diio aplicado</h1>
      <Formik
        initialValues={{
          establishment: "",
          date: { from: "", to: "" }
        }}
        onSubmit={formData => {}}
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
                labelName="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={getEstablishments()}
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
        tableData={tableData}
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
