import React, { useContext } from "react";
// import { Formik, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import APIContext from "../APIProvider";
// import {  } from "../../lib/APIAnimalExistence";

const NewDeclaration = () => {
  const api = useContext(APIContext);
  return <h1>Nueva de Declaración de Existencia</h1>;
};

export default NewDeclaration;
