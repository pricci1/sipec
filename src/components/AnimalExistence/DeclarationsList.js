import React, { useContext } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
// import {  } from "../../lib/APIAnimalExistence";

const DeclarationsList = () => {
  const api = useContext(APIContext);
  return <h1>Lista de Declaración de Existencia</h1>;
};

export default DeclarationsList;
