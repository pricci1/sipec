import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { Datepicker } from "react-formik-ui";

import useModal from "../Modal";

// import { getSpecies, getBrands, getModels } from "../lib/APIDiio";
import APIContext from "../APIProvider";

import Selector from "../Diio/Utilities/FormikSelector";
import AnimalDeathRegistrationTab from "../../routes/AnimalAdministrationMenuTabs/AnimalDeathRegistrationTab";
import { AnimalEstablishmentRegistryTable } from "./AnimalDownDIIOTable";
import AnimalEstablishmentRecordDetails from "./AnimalEstablishmentRecordDetails";

const SearchAnimalDownDIIO = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);

  // async function getSpeciesAPI() {
  //   const data = await getSpecies(api);
  //   console.log(data);
  //   return data;

  async function getEstablishments() {
    return [
      { value: 1, label: "El Salto de Pilmaiquen" },
      { value: 2, label: "La Mosqueta" }
    ];
  }

  return (
    <div className="body">
      <h2>Buscar baja animales con DIIO</h2>
      <div>
        <Formik
          initialValues={{
            establishment_id: "",
            desde: "",
            hasta: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            //console.log(values);
          }}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
          }) => (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="establishment_id"
                fieldValue={values.establishment_id}
                labelName="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment_id}
                data={getEstablishments}
                errors={errors.establishment_id}
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
            </form>
          )}
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
    </div>
  );
};

export default SearchAnimalDownDIIO;
