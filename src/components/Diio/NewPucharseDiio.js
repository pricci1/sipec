import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import { postDiioPurchase, getProviders } from "../../lib/APIDiio";
import APIContext from "../APIProvider";

const buyDiioSchema = Yup.object().shape({
  seller_type: Yup.string().nullable().required("Required"),
  provider_id: Yup.string().nullable().required("Required"),
  buyer_type: Yup.string().nullable().required("Required"),
  buyer_rut: Yup.string().nullable().required("Required"),
  establishment_id: Yup.string().nullable().required("Required")
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
    <div>
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
              <h3>Datos de Vendedor</h3>
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
              <h3>Datos de Comprador</h3>
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
              <div>
                <p>Rut: {values.buyer_rut}</p>
                <p>Name: {getBuyerName()}</p>
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
              <h3>Validación de Rangos</h3>
              <p>Rango</p>
              <Field type="text" placeholder="Desde" name="startDiio"/>
              <Field type="text" placeholder="Hasta" name="endDiio"/>

              <button
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
              
              <button type="submit">Realizar compra</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewPurchaseDiio;
