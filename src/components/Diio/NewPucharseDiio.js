import React, { useState, useContext } from "react";
import { Formik, Field, FieldArray } from "formik";
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import { postDiioPurchase, getProviders } from "../../lib/APIDiio";
import { getUserEstablishmentsApi } from "../../lib/ApiAnimalAdministration"
import APIContext from "../APIProvider";
import "./newPucharseDiio.css";

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

const NewPurchaseDiio = () => {
  const api = useContext(APIContext);

  async function getSellerTypes() {
    return [{ value: 1, label: "Productor" }, { value: 2, label: "Proveedor" }];
  }

  
  const getBuyerRut = () => {
    return api.titular.rut
  };
  async function getBuyerEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.titular.id);
    return data
  }

  async function getProvidersApi() {
    const data = await getProviders(api);
    return data;
  }

  return (
    <div className="body">
      <h2>Nueva Compra</h2>
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
              values.diio_ranges.map(range => [range.desde, range.hasta])
          ).then(resp => {
            console.log(resp);
            
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
              <div className="">
                <h4>Datos de Vendedor</h4>
                <Selector
                  fieldName="seller_type"
                  fieldValue={values.seller_type}
                  labelName="Tipo"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  touched={touched.seller_type}
                  data={getSellerTypes}
                  errors={errors.seller_type}
                />
                <br/>

                <Selector
                  fieldName="provider_id"
                  fieldValue={values.provider_id}
                  labelName="Nombre"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.value);
                  
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.provider_id}
                  data={getProvidersApi}
                  errors={errors.provider_id}
                />
                
              </div>
              <div className="">
                <h4>Datos de Comprador</h4>
                <Selector
                  fieldName="buyer_type"
                  fieldValue={values.seller_type}
                  labelName="Tipo"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  touched={touched.buyer_type}
                  data={getSellerTypes}
                  errors={errors.buyer_type}
                />
                <br/>
                <Selector
                  fieldName="establishment_id"
                  fieldValue={values.establishment_id}
                  labelName="Establecimiento"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  touched={touched.establishment_id}
                  data={getBuyerEstablishments}
                  errors={errors.establishment_id}
                />
              </div>
              <div className="">
                <h4>Validación de Rangos</h4>
                <p>Rango</p>
                <FieldArray
                  name="diio_ranges"
                  render={arrayHelpers => (
                    <div name="rango">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          arrayHelpers.push({ desde: 0, hasta: 0 })
                        }
                      >
                        Añadir rango
                      </button>
                      {values.diio_ranges && values.diio_ranges.length > 0
                        ? values.diio_ranges.map((_, index) => (
                            <div key={index}>
                              <div className="form-inline">
                                <Field
                                  type="number"
                                  className="form-control mr-3"
                                  name={`diio_ranges[${index}].desde`}
                                />
                                <Field
                                  type="number"
                                  className="form-control"
                                  name={`diio_ranges[${index}].hasta`}
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger m-3"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </button>
                                {errors.diio_ranges &&
                                  errors.diio_ranges[index] && (
                                    <div className="text-danger">
                                      {errors.diio_ranges[index].desde || ""}
                                      {errors.diio_ranges[index].hasta || ""}
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  )}
                />
              </div>
              <br />
              <hr />

              <button
                className="btn btn-primary"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Realizar compra
              </button>
              <button
                onClick={handleReset}
                className="btn btn-secondary"
                type="button"
              >
                Limpiar
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewPurchaseDiio;
