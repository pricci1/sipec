import React, { useState } from "react";
import { Formik, Field } from "formik";
import Selector from "./Utilities/FormikSelector"
import * as Yup from "yup";

const buyDiioSchema = Yup.object().shape({
  seller_type: Yup.string().required("Required"),
  seller_rut: Yup.string().required("Required"),
  buyer_type: Yup.string().required("Required"),
  buyer_rut: Yup.string().required("Required"),
  buyer_establishment_rup: Yup.string().required("Required")
});

const NewPurchaseDiio = () => {
  async function getSellerTypes() {
    return [{ value: 1, label: "Productor" }, { value: 2, label: "Proveedor" }];
  }

  async function getSellersNames() {
    return [
      { value: 195245924, label: "Agro" },
      { value: 64480138, label: "PolloSuper" }
    ];
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
      { value: "10.3.04.0122", label: "El Salto de Pilmaiquen" },
      { value: "10.3.04.0499", label: "La Mosqueta" }
    ];
  }
  async function getSpecies() {
    return [{ value: "1", label: "Vaca" }, { value: "2", label: "Chancho" }];
  }
  async function getDiioBrands() {
    return [{ value: "1", label: "Acme" }, { value: "2", label: "Logi" }];
  }
  async function getDiioTypes() {
    return [{ value: "1", label: "Tipo1" }, { value: "2", label: "Tipo2" }];
  }

  return (
    <div>
      <h2>Nueva Compra</h2>
      <Formik
        initialValues={{
          seller_type: null,
          seller_rut: null, //id
          buyer_type: null,
          buyer_rut: getBuyerRut(), //id
          buyer_establishment_rup: null, //id
          specie: null,
          diioType: null,
          startDiio: null,
          endDiio: null,
          diioBrand: null,
          diio_ranges: []
        }}
        validationSchema={buyDiioSchema}
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
                touched={touched.selectedSellerType}
                data={getSellerTypes}
              />
              <Selector
                fieldName="seller_rut"
                fieldValue={values.seller_rut}
                labelName="Nombre"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.value);
                  setSelectedSellerRut(fieldValue.value);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSellerType}
                data={getSellersNames}
              />
              <label>Rut: {selectedSellerRut}</label>
              <h3>Datos de Comprador</h3>
              <Selector
                fieldName="buyer  _type"
                fieldValue={values.seller_type}
                labelName="Tipo"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSellerType}
                data={getSellerTypes}
              />
              <div>
                <p>Rut: {values.buyer_rut}</p>
                <p>Name: {getBuyerName()}</p>
                <Selector
                  fieldName="buyer_establishment_rup"
                  fieldValue={values.buyer_establishment_rup}
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
              <Selector
                fieldName="specie"
                fieldValue={values.specie}
                labelName="Especie"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                data={getSpecies}
              />
              <Selector
                fieldName="diioBrand"
                fieldValue={values.diioBrand}
                labelName="Marca"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                data={getDiioBrands}
              />
              <Selector
                fieldName="diioType"
                fieldValue={values.diioBrand}
                labelName="Tipo"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSpecie}
                data={getDiioTypes}
              />
              <p>Rango</p>
              <Field type="text" name="startDiio" placeholder="Desde" />
              <Field type="text" name="endDiio" placeholder="Hasta" />
              <button
                onClick={() => {
                  setFieldValue("diio_ranges", [
                    ...values.diio_ranges,
                    {
                      brand: values.diioBrand,
                      type: values.diioType,
                      specie: values.specie,
                      startDiio: values.startDiio,
                      endDiio: values.endDiio
                    }
                  ]);
                  setFieldValue("specie", null);
                  setFieldValue("diioBrand", null);
                  setFieldValue("diioType", null);
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
