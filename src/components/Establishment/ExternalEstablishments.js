import React, { useContext, useState, useEffect } from "react";
import APIContext from "../APIProvider";
import { Formik } from "formik";
import Selector from "../Diio/Utilities/FormikSelector";
import { getEstablishmentsApi } from "../../lib/ApiAnimalAdministration";
import { getExternalEstablishmentInfo } from "../../lib/ApiEstablishment";

const mockData = {
  rup: "123456789",
  region: "Valparaiso",
  neighborhood: "Casablanca",
  name: "Pajaro Bobo",
  address: "El Estero, Lote 42",
  coordinate_x: "12.12312",
  coordinate_y: "-2.3323",
  huso: "19",
  anabolics: "No",
  pabco: "--",
  titularName: "Ana Canales",
  titularRut: "12.345.678-5"
};

const ExternalEstablishments = () => {
  const api = useContext(APIContext);
  const [selectedEstablishment, setSelectedEstablishment] = useState();
  const [fetchedData, setFetchedData] = useState(mockData);
  const [currentestablishments, setcurrentestablishments] = useState([]);
  useEffect(() => {
    getEstablishments();
  }, []);
  async function getEstablishments() {
    const data = await getEstablishmentsApi(api);
    console.log(data);
    setcurrentestablishments(data);
  }

  async function getEstablishmentInfo(establishment) {
    const data = await getExternalEstablishmentInfo(api, establishment.value);
    setFetchedData(data);
  }

  return (
    <div>
      <h2 className="mt-2">Establecimientos externos</h2>
      <Formik
        initialValues={{
          establishment: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values.establishment);
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
              <Selector
                fieldName="establishment"
                fieldValue={values.establishment}
                labelName="Establecimiento"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.establishment}
                options={currentestablishments}
                errors={errors.establishment}
              />
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <div className="col-md-7">
                  <button
                    className="btn btn-outline-secondary mt-4"
                    type="submit"
                    disabled={!dirty || isSubmitting}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
      {!!fetchedData && (
        <>
          <hr style={{ color: "grey", height: 1 }} />
          <h4>Datos establecimiento</h4>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th className="text-nowrap">RUP</th>
                <td>{fetchedData.rup}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Nombre</th>
                <td>{fetchedData.name}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Región</th>
                <td className="col-md-4">{fetchedData.region}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Comuna</th>
                <td className="col-md-4">{fetchedData.neighborhood}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Dirección</th>
                <td className="col-md-4">{fetchedData.address}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Cooredenada X</th>
                <td className="col-md-4">{fetchedData.coordinate_x}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Coordenada Y</th>
                <td className="col-md-4">{fetchedData.coordinate_y}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Huso</th>
                <td className="col-md-4">{fetchedData.huso}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Usa anabólicos</th>
                <td className="col-md-4">{fetchedData.anabolics}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Estado PABCO</th>
                <td className="col-md-4">{fetchedData.pabco}</td>
              </tr>
              <tr>
                <th className="text-nowrap">Titular</th>
                <td className="col-md-4">
                  {/* {fetchedData.titular.lastname}, {fetchedData.titular.name} */}
                  {"name y lastname titular"}
                </td>
              </tr>
              <tr>
                <th className="text-nowrap">RUT Titular</th>
                <td className="col-md-4">
                  {" "}
                  {/* <td>{fetchedData.titular.run}</td> */}
                  {"run"}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ExternalEstablishments;
