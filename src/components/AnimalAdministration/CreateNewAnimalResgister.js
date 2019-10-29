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
import RegisterAnimal from "./RegisterAnimal";

const getEstablishments = () => {
  return [
    { value: 1, label: "96.865.754-k - El Salto de Pilmaiquen" },
    { value: 2, label: "12.345.123-2 - La Mosqueta" }
  ];
};

const CreateNewAnimalRegister = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);

  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Buscar Registro Animal</h1>
      <RegisterAnimal></RegisterAnimal>
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

export default CreateNewAnimalRegister;
