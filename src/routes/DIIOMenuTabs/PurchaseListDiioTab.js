import React, { useState, useEffect, useContext } from "react";
import PucharseListDiio from "../../components/Diio/PucharseListDiio";
import APIContext from "../../components/APIProvider";
import { getDiioPurchases } from "../../lib/APIDiio";
import { getUserEstablishmentsApi } from "../../lib/ApiAnimalAdministration";
import { Formik } from "formik";
import * as Yup from "yup";
import Selector from "../../components/Diio/Utilities/FormikSelector";

const PurchaseListDiioTab = () => {
  const api = useContext(APIContext);
  const [data, setData] = useState([]);
  const [state, setState] = useState({ infoAvailable: false });

  useEffect(() => {}, []);

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
    setState({ infoAvailable: true });
  }

  async function getUserEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.titular.id);
    return data;
    //return data.map(({ id, name }) => ({ value: id, label: name }));
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
            handleSubmit,
            setFieldValue,
            setFieldTouched
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Selector
                fieldName="establishment"
                labelName=":Establecimiento"
                fieldValue={values.establishment}
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                }}
                onBlur={setFieldTouched}
                data={getUserEstablishments}
              />
              <button type="submit" className="btn btn-primary mt-1">
                Filtrar
              </button>
            </form>
          );
        }}
      </Formik>
      {state.infoAvailable ? (
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
            purchase.date.split("T")[0],
            getStringState(purchase.confirmed),
            purchase.purchaser_rut
          ])}
          //title="Lista de Compras DIIO"
        />
      ) : (
        <p></p>
      )}
    </>
  );
};

export default PurchaseListDiioTab;
