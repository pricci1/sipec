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
    console.log(data);

    return data;
  }

  async function getProvince() {
    const data = await getProvinces(api);
    console.log(data);
    setProvinceData(data);
    return data;
  }

  async function getNeighborhood() {
    const data = await getNeighborhoods(api);
    setNeighborhoodData(data);
    console.log(data);
    return data;
  }

  async function getClientData() {
    const data = await getTitular(api);
    setTitularInfo(data);
    console.log(data);
    setCompany(data.company.id);
    setRegion({value: data.region.id , label: data.region.name});
    setName(data.company.name);
    setEmail(data.company.email);
    setRUT(data.company.rut);
    setPhone(data.company.phone);
    setNeighborhood({value: data.neighborhood.id , label: data.neighborhood.name});
    setProvince({value: data.province.id , label: data.province.name});
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
    const response = await api.put("/companies/"+ Company , {
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
      <div>{Name}</div>
      <div>{RUT}</div>
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
            <form onSubmit={handleSubmit}>
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

              <button
                className="btn btn-primary"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Actualizar
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateTitularData;
