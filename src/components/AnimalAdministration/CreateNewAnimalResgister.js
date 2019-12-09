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

  const [data, setData] = useState();
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);

  const handleFormSubmit = e => {
    setItems([...items, data]);
  };
  const getItem = dataItem => {
    setData(dataItem);
  };

  /*handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };*/

  const setReloadHandler = () => {
    setReload(!reload);
  };

  const getReload = () => {
    return reload;
  };

  return (
    <div className="body">
      <h1 className="d-md-inline pr-3">Nuevo Registro Animal</h1>
      <RegisterAnimal
        setReloadHandler={setReloadHandler}
        handleFormSubmit={handleFormSubmit}
        getItem={getItem}
      ></RegisterAnimal>
      <h2 className="d-md-inline pr-3">Animales creados</h2>
      <RegisterAnimalTable data={items}
        setReloadHandler={setReloadHandler}
        getReload={getReload}
      />
    </div>
  );
};

export default CreateNewAnimalRegister;
