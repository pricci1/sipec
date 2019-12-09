import React, { useState, useContext, useEffect } from "react";
import APIContext from "../APIProvider";
import {
  getRegions,
  getNeighborhoods,
  getProvinces,
  getTitular
} from "../../lib/APICommon";
import { Selector } from "../AnimalAdministration/Utils/FormikSelectors";
import { Formik, Field } from "formik";
import { set } from "date-fns/esm";

const UpdateTitularData = () => {
  const [TitularInfo, setTitularInfo] = useState([]);
  const [RegionData, setRegionData] = useState([]);
  const [ProvinceData, setProvinceData] = useState([]);
  const [NeighborhoodData, setNeighborhoodData] = useState([]);
  const [Company, setCompany] = useState();
  const [Region, setRegion] = useState();
  const [Neighborhood, setNeighborhood] = useState();
  const [Province, setProvince] = useState();
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Name, setName] = useState();
  const [RUT, setRUT] = useState();
  const [Loading, setLoading] = useState(true);
  const api = useContext(APIContext);
  async function getRegion() {
    const data = await getRegions(api);
    setRegionData(data);

    return data;
  }

  async function getProvince() {
    const data = await getProvinces(api);
    setProvinceData(data);
    return data;
  }

  async function getNeighborhood() {
    const data = await getNeighborhoods(api);
    setNeighborhoodData(data);
    return data;
  }

  async function getClientData() {
    const data = await getTitular(api);
    setTitularInfo(data);
    setCompany(data.company.id);
    setRegion({ value: data.region.id, label: data.region.name });
    setName(data.company.name);
    setEmail(data.company.email);
    setRUT(data.company.rut);
    setPhone(data.company.phone);
    setNeighborhood({
      value: data.neighborhood.id,
      label: data.neighborhood.name
    });
    setProvince({ value: data.province.id, label: data.province.name });
    setAddress(data.address.address);
    setLoading(false);
    return data;
  }
  useEffect(() => {
    getRegion();
    getProvince();
    getNeighborhood();
    getClientData();
  }, []);

  async function sendRequest(
    id,
    phone,
    address,
    region,
    province,
    neighborhood,
    email
  ) {
    const titularId = api.titular.id;
    const response = await api.put("/companies/" + Company, {
      id: id,
      phone: phone,
      address: address,
      neighborhood: neighborhood.value,
      email: email
    });

    if (response.data.status == "ok") {
      alert("Se modifico el titular con exito");
    }
  }
  if (Loading) {
    return <div></div>;
  }
  return (
    <div className="body">
      <h3>Actualizar Datos del Titular</h3>
      <br></br>
      <div>
        <b>Nombre:</b> {Name}
      </div>
      <div>
        <b>RUT</b>: {RUT}
      </div>
      <br></br>
      <Formik
        initialValues={{
          id: Company,
          phone: Phone,
          address: Address,
          region: Region,
          province: Province,
          neighborhood: Neighborhood,
          email: Email
        }}
        onSubmit={(values, { setSubmitting }) => {
          sendRequest(
            values.id,
            values.phone,
            values.address,
            values.region,
            values.province,
            values.neighborhood,
            values.email
          ).then(response => {});
          setSubmitting(false); // This can also be used for displaying a spinner
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
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-start">
                  <div className="col-sm-1">
                    <p>
                      <b>Telefono:</b>
                    </p>
                  </div>
                  <div className="col-sm-9">
                    <Field
                      name="phone"
                      fieldvalue={values.phone}
                      label="Telefono"
                      touched={touched.phone}
                      value={props.values.phone}
                      errors={errors.phone}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </div>
                </div>
                <div className="row justify-content-start">
                  <div className="col-sm-1">
                    <p>
                      <b>Direccion:</b>
                    </p>
                  </div>
                  <div className="col-sm-9">
                    <Field
                      name="address"
                      fieldvalue={values.address}
                      labelname="Direccion"
                      touched={touched.address}
                      value={props.values.address}
                      errors={errors.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br></br>
                <div className="row justify-content-start">
                  <div className="col-sm-1">
                    <p>
                      <b>Region:</b>
                    </p>
                  </div>
                  <div className="col-sm-7">
                    <Selector
                      fieldName="region"
                      fieldValue={values.region}
                      labelName="Region"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      touched={touched.region}
                      options={RegionData}
                      errors={errors.region}
                    />
                  </div>
                </div>
                <div className="row justify-content-start">
                  <div className="col-sm-1">
                    <p>
                      <b>Provincia:</b>
                    </p>
                  </div>
                  <div className="col-sm-7">
                    <Selector
                      fieldName="province"
                      fieldValue={values.province}
                      labelName="Provincia"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      touched={touched.province}
                      options={ProvinceData}
                      errors={errors.province}
                    />
                  </div>
                </div>
                <div className="row justify-content-start">
                  <div className="col-sm-1">
                    <p>
                      <b>Comuna:</b>
                    </p>
                  </div>
                  <div className="col-sm-7">
                    <Selector
                      fieldName="neighborhood"
                      fieldValue={values.neighborhood}
                      labelName="Comuna"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      touched={touched.neighborhood}
                      options={NeighborhoodData}
                      errors={errors.neighborhood}
                    />
                  </div>
                </div>
                <br></br>
                <div className="row margin:50px">
                  <div className="col-sm-2" float="left">
                    <p>
                      <b>Email:</b>
                    </p>
                  </div>
                  <div className="col-sm-9">
                    <Field
                      name="email"
                      fieldvalue={values.email}
                      labelname="Email"
                      touched={touched.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errors={errors.email}
                      value={props.values.email}
                    />
                  </div>
                  <div className="col-md"></div>
                </div>
                <br></br>
                <div className="row" padding="50px" width="20%">
                  <button
                    classNameName="btn btn-primary"
                    type="submit"
                    disabled={!dirty || isSubmitting}
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateTitularData;
