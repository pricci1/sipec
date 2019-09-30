import React, { useState } from "react";
import { Formik, Field } from "formik";
import Selector from "./Utilities/FormikSelector"
import * as Yup from "yup";

const buyDiioSchema = Yup.object().shape({
  sellerType: Yup.string().required("Required"),
  sellerRut: Yup.string().required("Required"),
  buyerType: Yup.string().required("Required"),
  buyerRut: Yup.string().required("Required"),
  buyerEstablishmentRup: Yup.string().required("Required")
});

const NewPucharseDiio = () => {
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
          sellerType: null,
          sellerRut: null,
          buyerType: null,
          buyerRut: getBuyerRut(),
          buyerEstablishmentRup: null,
          specie: null,
          diioType: null,
          startDiio: null,
          endDiio: null,
          diioBrand: null,
          diioRanges: []
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
                fieldName="sellerType"
                fieldValue={values.sellerType}
                labelName="Tipo"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSellerType}
                data={getSellerTypes}
              />
              <Selector
                fieldName="sellerRut"
                fieldValue={values.sellerRut}
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
                fieldName="sellerType"
                fieldValue={values.sellerType}
                labelName="Tipo"
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue.label);
                }}
                onBlur={setFieldTouched}
                touched={touched.selectedSellerType}
                data={getSellerTypes}
              />
              <div>
                <p>Rut: {values.buyerRut}</p>
                <p>Name: {getBuyerName()}</p>
                <Selector
                  fieldName="buyerEstablishmentRup"
                  fieldValue={values.buyerEstablishmentRup}
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
                  setFieldValue("diioRanges", [
                    ...values.diioRanges,
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


export default NewPucharseDiio;
