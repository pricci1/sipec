import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
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
  // const [establecimientos, setEstablecimientos] = useState([]);

  async function getTitulares() {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares
    const titulares = await axios.get(`${apiUrl}/titulares`);
    return titulares.data.map(({ id, name }) => ({ value: id, label: name }));
  }

  function getEstablecimientos(idTitular) {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares/:idTitular/establecimientos
    // ASYNC
    // hit API with idTitular and return list of Estableciemtos
    return [
      { value: "1", label: "Fundo La Paz" },
      { value: "2", label: "Estancia Mallorca" }
    ];
  }

  function getDiios(idEstablecimiento) {
    // https://5d80ecc899f8a20014cf9cc8.mockapi.io/titulares/:idTitular/establecimientos/:idEstablecimiento/diios
    return [
      {
        diio: "00001",
        marca: "ACME",
        vendedor: "Jim S",
        fechaCompra: "10-10-2010"
      },
      {
        diio: "00002",
        marca: "ACME",
        vendedor: "John T",
        fechaCompra: "19-10-2010"
      },
      {
        diio: "00006",
        marca: "ACME",
        vendedor: "Jim S",
        fechaCompra: "11-11-2010"
      }
    ];
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
          setData(getDiios(values.establecimiento.value));
          setSubmitting(false);
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
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.titular}
                touched={touched.titular}
              />
              <EstablecimientoSelect
                value={values.establecimiento}
                establecimientos={getEstablecimientos(1)}
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
      <Select
        id="establecimiento"
        options={props.establecimientos}
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
