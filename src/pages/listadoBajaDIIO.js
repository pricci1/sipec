import React, { useContext } from "react";
import { Formik } from "formik";
import { Datepicker } from "react-formik-ui";
import * as Yup from "yup";
import Selector from "../components/Diio/Utilities/FormikSelector";
// import DatePicker from "react-datepicker";

// import SIPECtable from "../components/AnimalMoves/SIPECtable";

import { getSpecies } from "../lib/APIDiio";
import APIContext from "../components/APIProvider";

import ListDroppedDiioTab from "../routes/DIIOMenuTabs/ListDroppedDiioTab";
import "./listadoBajaDIIO.css";

const ListadoBajaDIIO = () => {
  const api = useContext(APIContext);

  async function getSpeciesAPI() {
    const data = await getSpecies(api);
    return data;
  }
  return (
    <div className="body">
      <h2>Listado Baja de DIIOs</h2>
      <div>
        <h4>Buscar Baja de DIIO</h4>
        <Formik
          initialValues={{ desde: "", hasta: "", specie: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          validationSchema={Yup.object().shape({
            desde: Yup.string()
              .nullable()
              .required("Requerido"),
            hasta: Yup.string()
              .nullable()
              .required("Requerido"),
            specie: Yup.string()
              .nullable()
              .required("Requerido")
          })}
        >
          {({
            values,
            errors,
            touched,
            //   handleChange,
            //   handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="selector">
                <Selector
                  fieldName="specie"
                  fieldValue={values.specie}
                  labelName="Especie"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.label);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.specie}
                  // data={getSpecies}
                  data={getSpeciesAPI}
                  required={true}
                  errors={errors.specie}
                />
              </div>
              <br />
              Rango DIIO
              <div className="fecha">
                <Datepicker
                  selected={values.desde}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"
                  name="desde"
                  placeholder="Desde"
                  errors={errors.desde}
                  required={true}
                />
                <Datepicker
                  selected={values.hasta}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"
                  name="hasta"
                  placeholder="Hasta"
                  errors={errors.hasta}
                  required={true}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={isSubmitting}
              >
                Filtrar
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {/* <SIPECtable cases="listadebajas" /> */}
        {/* <InventoryDiioTab /> */}
        <ListDroppedDiioTab />
      </div>
    </div>
  );
};
export default ListadoBajaDIIO;
