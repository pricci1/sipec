import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import { Datepicker } from "react-formik-ui";
import Selector from "../Diio/Utilities/FormikSelector";
import * as Yup from "yup";
import { getProviders } from "../../lib/APIDiio";
import { postAnimalDeathRegistration } from "../../lib/ApiAnimalAdministration";
import APIContext from "../APIProvider";
import "../Diio/newPucharseDiio.css";
import { Link } from "@reach/router";

let currentDate = new Date().toLocaleDateString();

const newAnimalDownRegistration = Yup.object().shape({
  establishment: Yup.string()
    .nullable()
    .required("Requerido"),
  owner: Yup.string()
    .nullable()
    .required("Requerido"),
  mva: Yup.string()
    .nullable()
    .required("Requerido"),
  verification_date: Yup.string()
    .nullable()
    .required("Requerido"),
  specie_array: Yup.array()
    .nullable()
    .required("Requerido"),
  diio_array: Yup.array().required("Requerido")
});

const NewDeathRegistration = () => {
  const api = useContext(APIContext);

  async function getSellerTypes() {
    return [{ value: 1, label: "Productor" }, { value: 2, label: "Proveedor" }];
  }

  const [selectedSellerRut, setSelectedSellerRut] = useState();

  const getBuyerRut = () => {
    return "123456789";
  };

  async function getProvidersApi() {
    const data = await getProviders(api);
    return data;
  }

  return (
    <div className="body">
      <h2>Nuevo Registro de Muerte Animal</h2>
      <Formik
        initialValues={{
          establishment_id: "",
          owner_id: "",
          mva_id: "",
          verification_date: "",
          specie_array: [],
          diio_array: []
        }}
        validationSchema={newAnimalDownRegistration}
        onSubmit={(values, { setSubmitting }) => {
          postAnimalDeathRegistration(
            api,
            values.establishment_id.value,
            values.owner_id.value,
            values.mva_id.value,
            values.verification_date.value,
            JSON.stringify(values.specie_array),
            JSON.stringify(values.diio_array)
          ).then(resp => {
            resp.success ? alert("Baja realizada") : alert("Error en la baja");
          });
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ alignContent: "center" }}>
                <div className="row">
                  <div className="death_register col-md-4">
                    <Selector
                      fieldName="titular_id"
                      fieldValue={values.provider_id}
                      labelName="Titular"
                      onChange={(field, fieldValue) => {
                        setFieldValue(field, fieldValue.value);
                        setSelectedSellerRut(fieldValue.value);
                      }}
                      onBlur={setFieldTouched}
                      touched={touched.provider_id}
                      data={getProvidersApi}
                      errors={errors.provider_id}
                    />
                    <Selector
                      fieldName="mva_id"
                      fieldValue={values.provider_id}
                      labelName="MVA"
                      onChange={(field, fieldValue) => {
                        setFieldValue(field, fieldValue.value);
                        setSelectedSellerRut(fieldValue.value);
                      }}
                      onBlur={setFieldTouched}
                      touched={touched.provider_id}
                      data={getProvidersApi}
                      errors={errors.provider_id}
                    />
                    Fecha: {currentDate}
                    <br />
                    <hr />
                    <div className="upload_death_register">
                      <h5>Carga individual</h5>
                      <Selector
                        fieldName="specie"
                        fieldValue={values.seller_type}
                        labelName="Especie*"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        touched={touched.seller_type}
                        data={getSellerTypes}
                        errors={errors.seller_type}
                      />
                      <Selector
                        fieldName="type_id"
                        fieldValue={values.provider_id}
                        labelName="Tipo de Baja*"
                        onChange={(field, fieldValue) => {
                          setFieldValue(field, fieldValue.value);
                          setSelectedSellerRut(fieldValue.value);
                        }}
                        onBlur={setFieldTouched}
                        touched={touched.provider_id}
                        data={getProvidersApi}
                        errors={errors.provider_id}
                      />
                      <Selector
                        fieldName="type_details_id"
                        fieldValue={values.provider_id}
                        labelName="Detalle del Tipo de Baja*"
                        onChange={(field, fieldValue) => {
                          setFieldValue(field, fieldValue.value);
                          setSelectedSellerRut(fieldValue.value);
                        }}
                        onBlur={setFieldTouched}
                        touched={touched.provider_id}
                        data={getProvidersApi}
                        errors={errors.provider_id}
                      />
                      Fecha de Baja*
                      <Datepicker
                        selected={values.hasta}
                        dateFormat="MMMM d, yyyy"
                        className="form-control"
                        name="fecha_baja"
                        placeholder="dd/mm/aaaa"
                      />
                      Número de DIIO*
                      <Field
                        type="number"
                        className="form-control"
                        name="diio_de_baja"
                      />
                      <br />
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                      >
                        Eliminar Cambio
                      </button>
                      <button className="btn btn-primary" onClick={() => {}}>
                        Agregar Cambio
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <hr />
              <div style={{ textAlign: "right" }}>
                <Link to="../" className="btn btn-outline-secondary">
                  Volver
                </Link>
                <button className="btn btn-primary" type="submit">
                  Guardar Cambios
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewDeathRegistration;
