import React, { useContext, useState } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
import { Formik, Field } from "formik";
import { Link } from "@reach/router";
import useModal from "../Modal";
import DatePicker from "react-datepicker";
import { Selector } from "./Utils/FormikSelectors";
import { RegisterAnimalTable } from "./RegisterAnimalTable";
import AnimalEstablishmentRecordDetails from "./AnimalEstablishmentRecordDetails";
import RegisterAnimal from "./RegisterAnimal";
import { set } from "date-fns";




const CreateNewAnimalRegister = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [modalRegistryId, setModalRegistryId] = useState();
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);



  function getLoadingState(){
    return loadingTable
  }
  function setLoadingState(){
    setLoadingTable(!loadingTable)
  }

  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Nuevo Registro Animal</h1>
      <RegisterAnimal setLoadingState={setLoadingState}></RegisterAnimal>
      <RegisterAnimalTable
        setLoadingState={setLoadingState}
        getLoadingState={loadingTable}
        data={data}
        toggleModal={toggleModal}
        setModalRegistryId={setModalRegistryId}
      />
       <h2 className="d-md-inline pr-3">Seleccionar DIIOs disponibles</h2>
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
