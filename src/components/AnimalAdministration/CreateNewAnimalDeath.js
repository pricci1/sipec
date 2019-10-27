import React, { useState, useContext } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Datepicker } from "react-formik-ui";
import Selector from "../Diio/Utilities/FormikSelector";
import * as Yup from "yup";
import { postDiioPurchase, getProviders } from "../../lib/APIDiio";
import APIContext from "../APIProvider";
import "../Diio/newPucharseDiio.css";

const buyDiioSchema = Yup.object().shape({
  seller_type: Yup.string()
    .nullable()
    .required("Requerido"),
  provider_id: Yup.string()
    .nullable()
    .required("Requerido"),
  buyer_type: Yup.string()
    .nullable()
    .required("Requerido"),
  buyer_rut: Yup.string()
    .nullable()
    .required("Requerido"),
  establishment_id: Yup.string()
    .nullable()
    .required("Requerido"),
  diio_ranges: Yup.array().of(
    Yup.object()
      .shape({
        desde: Yup.number()

          .min(0, "Desde debe ser >= 0")
          .required("Requerido"),
        hasta: Yup.number()
          .min(Yup.ref("desde"), `"Hasta" debe ser igual o mayor a "Desde"`)
          .required("Requerido")
      })
      .required()
  )
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
  const getBuyerName = () => {
    return "Agrosuper";
  };

  async function getBuyerEstablishments() {
    return [
      { value: 1, label: "El Salto de Pilmaiquen" },
      { value: 2, label: "La Mosqueta" }
    ];
  }

  async function getProvidersApi() {
    const data = await getProviders(api);
    return data;
  }

  return (
    <div className="body">
      <h2>Nuevo Registro de Muerte Animal</h2>
      <Formik
        initialValues={{
          seller_type: "",
          provider_id: "", //id
          buyer_type: "",
          buyer_rut: getBuyerRut(), //id
          establishment_id: "", //id
          startDiio: "",
          endDiio: "",
          diio_ranges: []
        }}
        validationSchema={buyDiioSchema}
        onSubmit={(values, { setSubmitting }) => {
          postDiioPurchase(
            api,
            values.provider_id,
            values.establishment_id.value,
            JSON.stringify(
              values.diio_ranges.map(range => [range.desde, range.hasta])
            )
          ).then(resp => {
            resp.success
              ? alert("Compra realizada")
              : alert("Error en la compra");
          });
          setSubmitting(false);
        }}
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
              <div style={{ alignContent: "center" }}>
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="death_register col-md-6">
                    <Selector
                      fieldName="seller_type"
                      fieldValue={values.seller_type}
                      labelName="Especie*"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      touched={touched.seller_type}
                      data={getSellerTypes}
                      errors={errors.seller_type}
                    />
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
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <br />
                <div className="upload_death_register row">
                  <div className="col-md-1"></div>

                  <div className="jumbotron col-md-4">
                    <h5>Carga individual</h5>
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
                    <button className="btn btn-outline-secondary" type="submit">
                      Eliminar Cambio
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Agregar Cambio
                    </button>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="jumbotron col-md-4"></div>
                  <div className="col-md-2"></div>
                </div>
              </div>

              <br />
              <hr />
              <div style={{ textAlign: "right" }}>
                <button className="btn btn-outline-secondary" type="submit">
                  Volver
                </button>
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
