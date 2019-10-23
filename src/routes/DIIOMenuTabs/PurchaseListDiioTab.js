import React, { useState, useEffect, useContext } from "react";
import PucharseListDiio from "../../components/Diio/PucharseListDiio";
import APIContext from "../../components/APIProvider";
import { getDiioPurchases, getUserEstablishments } from "../../lib/APIDiio";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Selector from "../../components/Diio/Utilities/FormikSelector";

const PurchaseListDiioTab = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);
  // const [selectedEstablishment, setSelectedEstablishment] = useState();

  useEffect(() => {
    // Inside useEffect with [] as deps to run only once
    // If it's not, there will be infinite request to the backend
    // getDiioPurchasesApi(1);
    // getUserEstablishmentsApi(1);
  }, []);
  async function getDiioPurchasesApi(establishmentId) {
    const data = await getDiioPurchases(api, establishmentId);

    var purchaser_rut = data.establishment.rup;
    var purchaser_name = data.establishment.name;
    setData(
      data.purchases.map(
        ({
          provider_name,
          purchase: { id, confirmed, brand, created_at: date }
        }) => ({
          provider_name,
          id,
          confirmed,
          brand,
          date,
          purchaser_rut,
          purchaser_name
        })
      )
    );
  }

  async function getUserEstablishmentsApi() {
    const data = await getUserEstablishments(api, 1 /*current user id*/);
    return data.map(({ id, name }) => ({ value: id, label: name }));
  }

  function getStringState(state) {
    if (state) {
      return "Vendido";
    } else {
      return "Espera";
    }
  }

  function getStringRegister(id) {
    let idString = id.toString();
    let zeros = 8 - idString.length;
    return "0".repeat(zeros) + idString;
  }

  return (
    <>
      <h2>Lista de Compras DIIO</h2>
      <Formik
        initialValues={{ establishment: null }}
        onSubmit={(values, { setSubmitting }) => {
          getDiioPurchasesApi(values.establishment.value);
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          establishment: Yup.object()
            .nullable()
            .required()
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange, // No se usa en el ejemplo porque los 2 inputs son dropdown
            handleBlur, // No se usa en el ejemplo porque los 2 inputs son dropdown
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="establishment"
                labelName="Seleccione un establecimiento:"
                fieldValue={values.establishment}
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                }}
                onBlur={setFieldTouched}
                data={getUserEstablishmentsApi}
              />
              <button type="submit" className="btn btn-primary mt-1">
                Filtrar
              </button>
            </form>
          );
        }}
      </Formik>
      <PucharseListDiio
        headers={[
          "Registro",
          "Vendedor",
          "Establecimiento comprador",
          "Fecha",
          "Estado",
          "RUT Comprador"
        ]}
        data={data.map(purchase => [
          getStringRegister(purchase.id),
          purchase.provider_name,
          purchase.purchaser_name,
          purchase.date,
          getStringState(purchase.confirmed),
          purchase.purchaser_rut
        ])}
        //title="Lista de Compras DIIO"
      />
    </>
  );
};

export default PurchaseListDiioTab;
