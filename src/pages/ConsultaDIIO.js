import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";
import axios from "axios";

import DiioTable from "../components/DiioTable";

const ConsultaDIIO = () => {
  // FORM
  // Inputs:  Tiular
  //          Establecimiento
  // RETURN
  // diio, marca, vendedor, fecha compra
  const apiUrl = "https://5d80ecc899f8a20014cf9cc8.mockapi.io";
  const [data, setData] = useState([]);
  const [selectedTitular, setSelectedTitular] = useState();

  async function getTitulares() {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares
    const titulares = await axios.get(`${apiUrl}/titulares`);
    return titulares.data.map(({ id, name }) => ({ value: id, label: name }));
  }

  async function getEstablecimientos() {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares/:idTitular/establecimientos
    const idTitular = selectedTitular ? selectedTitular.value : null;
    var establecimientos = [];
    if (idTitular) {
      establecimientos = await axios.get(
        `${apiUrl}/titulares/${idTitular}/establecimientos`
      );
    }
    return establecimientos.data.map(({ id, name }) => ({
      value: id,
      label: name
    }));
  }

  async function getDiios(idTitular, idEstablecimiento) {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares/:idTitular/establecimientos/:idEstablecimiento/diios
    var diios = [];
    diios = await axios.get(
      `${apiUrl}/titulares/${idTitular}/establecimientos/${idEstablecimiento}/diios`
    );
    return diios.data.map(({ diio, marca, vendedor, fechaCompra }) => ({
      diio: diio.toString(),
      marca,
      vendedor,
      fechaCompra
    }));
  }

  return (
    <>
      <h2>Consulta DIIO</h2>
      <p className="bg-info">
        Solo de ejemplo, no es nada de SIPEC, pero la gracia es que hace un
        request primero para obtener los titulares y después, según el titular
        seleccionado hace el request de sus establecimientos.
      </p>
      <Formik
        initialValues={{ titular: null, establecimiento: null }}
        onSubmit={(values, { setSubmitting }) => {
          getDiios(values.titular.value, values.establecimiento.value).then(
            diios => setData(diios)
          );
          setSubmitting(false); // This can also be used for displaying a spinner
        }}
        validationSchema={Yup.object().shape({
          titular: Yup.object()
            .nullable()
            .required(),
          establecimiento: Yup.object()
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
              <TitularSelect
                value={values.titular}
                titulares={getTitulares}
                onChange={(field, fieldValue) => {
                  setSelectedTitular(fieldValue);
                  setFieldValue(field, fieldValue);
                }}
                onBlur={setFieldTouched}
                error={errors.titular}
                touched={touched.titular}
              />
              <EstablecimientoSelect
                key={selectedTitular ? selectedTitular.value : 0}
                value={values.establecimiento}
                establecimientos={getEstablecimientos}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.establecimiento}
                touched={touched.establecimiento}
              />

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary ml-1"
              >
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
      <br />
      <DiioTable
        headers={["DIIO", "Marca", "Comprador", "Fecha Compra"]}
        data={data.map(diio => [
          diio.diio,
          diio.marca,
          diio.vendedor,
          diio.fechaCompra
        ])}
      />
    </>
  );
};

// Por ahora creé 2 selects como componentes distintos,
// pero la ideal es refractar this shit después
const TitularSelect = props => {
  return (
    <>
      <label htmlFor="titular">Seleccióne un titular</label>
      <AsyncSelect
        id="titular"
        cacheOptions
        defaultOptions
        loadOptions={props.titulares}
        onChange={value => {
          props.onChange("titular", value);
        }}
        onBlur={value => {
          props.onBlur("titular", value);
        }}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div className="text-danger">{props.error}</div>
      )}
    </>
  );
};

const EstablecimientoSelect = props => {
  return (
    <>
      <label htmlFor="establecimiento">Seleccióne un establecimiento</label>
      <AsyncSelect
        id="establecimiento"
        cacheOptions
        defaultOptions
        loadOptions={props.establecimientos}
        onChange={value => {
          props.onChange("establecimiento", value);
        }}
        onBlur={value => {
          props.onBlur("establecimiento", value);
        }}
        value={props.value}
        isDisabled={props.establecimientos === 0}
      />
      {!!props.error && props.touched && (
        <div className="text-danger">{props.error}</div>
      )}
    </>
  );
};

export default ConsultaDIIO;
