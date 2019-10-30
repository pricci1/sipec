import React, { useContext, useState } from "react";
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
  getAnimalDeathTableApi
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

  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    return data;
  }

  return (
    <div className="body">
      <h2>Buscar baja animales con DIIO</h2>
      <div>
        <Formik
          initialValues={{
            establishment: "",
            desde: "",
            hasta: ""
          }}
          // validationSchema={searchAnimalDownSchema}
          onSubmit={formData => {
            // send formData to backend
            // set 'data' using 'setData' with backend's response with thisstructure:
            // [{rup, establishment, tiutlar, date, quantity},{rup, establishment, ttiutlar, date, quantity}]
            console.log(formData);
            getAnimalDeathTableApi(api).then(resp => {
              console.log(resp);
              setData(resp);
            });
          }}
        >
          {({
            values,
            touched,
            errors,
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
              <button
                className="btn btn-outline-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Buscar
              </button>
              <button
                onClick={handleReset}
                className="btn btn-secondary "
                type="button"
              >
                Limpiar
              </button>
            </form>
          )}
        </Formik>
        <br />
        <Link to="nueva" className="btn btn-primary">
          Nueva Muerte
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
