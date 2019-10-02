import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import { postDiioPurchase, getProviders } from "../../lib/APIDiio";
import APIContext from "../APIProvider";
import "./newPucharseDiio.css";

const buyDiioSchema = Yup.object().shape({
  seller_type: Yup.string()
    .nullable()
    .required("Required"),
  provider_id: Yup.string()
    .nullable()
    .required("Required"),
  buyer_type: Yup.string()
    .nullable()
    .required("Required"),
  buyer_rut: Yup.string()
    .nullable()
    .required("Required"),
  establishment_id: Yup.string()
    .nullable()
    .required("Required")
});

const NewPurchaseDiio = () => {
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
      <h2>Nueva Compra</h2>
      <Formik
        initialValues={{
          seller_type: null,
          provider_id: null, //id
          buyer_type: null,
          buyer_rut: getBuyerRut(), //id
          establishment_id: null, //id
          startDiio: null,
          endDiio: null,
          diio_ranges: []
        }}
        validationSchema={buyDiioSchema}
        onSubmit={(values, { setSubmitting }) => {
          postDiioPurchase(
            api,
            values.provider_id,
            values.establishment_id,
            JSON.stringify(values.diio_ranges)
          );
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
              <div className="vendedor">
                <h4>Datos de Vendedor</h4>
                <Selector
                  fieldName="seller_type"
                  fieldValue={values.seller_type}
                  labelName="Tipo"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.label);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.seller_type}
                  data={getSellerTypes}
                  errors={errors.seller_type}
                />
                <Selector
                  fieldName="provider_id"
                  fieldValue={values.provider_id}
                  labelName="Nombre"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.value);
                    setSelectedSellerRut(fieldValue.value);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.provider_id}
                  data={getProvidersApi}
                />
                <label>Rut: {selectedSellerRut}</label>
              </div>
              <div className="comprador">
                <h4>Datos de Comprador</h4>
                <Selector
                  fieldName="buyer_type"
                  fieldValue={values.seller_type}
                  labelName="Tipo"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.value);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedSellerType}
                  data={getSellerTypes}
                />
                <p>Rut: {values.buyer_rut}</p>
                <p>Nombre: {getBuyerName()}</p>
                <Selector
                  fieldName="establishment_id"
                  fieldValue={values.establishment_id}
                  labelName="Establecimiento"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.value);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedBuyerEstablishmentRup}
                  data={getBuyerEstablishments}
                />
              </div>
              <div className="validacion">
                <h4>Validación de Rangos</h4>
                <p>Rango</p>
                <div className="rango">
                  <Field
                    className="field"
                    type="text"
                    placeholder="Desde"
                    name="startDiio"
                  />
                  <Field
                    className="field"
                    type="text"
                    placeholder="Hasta"
                    name="endDiio"
                  />

                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => {
                      setFieldValue("diio_ranges", [
                        ...values.diio_ranges,
                        [values.startDiio, values.endDiio]
                      ]);
                      setFieldValue("startDiio", null);
                      setFieldValue("endDiio", null);
                    }}
                  >
                    Agregar Rango
                  </button>
                </div>
              </div>
              <br />
              <hr />

              <button className="btn btn-primary" type="submit">
                Realizar compra
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewPurchaseDiio;
