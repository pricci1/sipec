import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";
import axios from "axios";

import AnimalMovesTable from "../components/AnimalMoves/AnimalMovesTable";

const AnimalMoves = () => {
  /*
    // FORM
  // Inputs:    Desde
                Hasta
                origen
                destino
                nº de formulario
                Estado de formulario
                

  // Inputs autofill:   RUP
  //                    Establecimiento

  // RETURN
  // nºde formulario,fecha de formulario, RUP origen, Establecimineto orgien, RUP destino, Establecimento Destino, salida, llegada, estado
  */
  const apiUrl = "";
  const [data, setData] = useState([]);
  //const [selectedRUP, setSelectedRUP] = useState();
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState();

  async function getEstablecimiento() {
    const Establecimento = await axios.get(`${apiUrl}/Establecimiento`);
    return Establecimento.data.map(({ id, name }) => ({
      value: id,
      label: name
    }));
    //RUP como id
  }

  async function getAnimalMoves(
    RUPOrigen,
    establecimientoOrigen,
    RUPDestino,
    establecimientoDestino,
    desde,
    hasta,
    nFormulario,
    estadoFormulario,
    lote,
    DIIO
  ) {
    //no terminada falta agregar a la tabla los datos que se sacan de get estableciminetos y combinarlos con moves
    var moves = [];
    moves = await axios.get(`${apiUrl}/MovimientoAnimal`);
    if (RUPDestino != null) {
      moves = moves.data.filter(d => (d.rupD = RUPDestino));
    }
    if (RUPOrigen != null) {
      moves = moves.data.filter(d => (d.rupO = RUPOrigen));
    }
    if (establecimientoOrigen != null) {
      moves = moves.data.filter(d => (d.estaO = establecimientoOrigen));
    }
    if (establecimientoDestino != null) {
      moves = moves.data.filter(d => (d.estaD = establecimientoDestino));
    }
    if (desde != null) {
      moves = moves.data.filter(d => (d.desde = desde));
    }
    if (hasta != null) {
      moves = moves.data.filter(d => (d.rup = hasta));
    }
    if (nFormulario != null) {
      moves = moves.data.filter(d => (d.rup = nFormulario));
    }
    if (estadoFormulario != null) {
      moves = moves.data.filter(d => (d.rup = estadoFormulario));
    }

    return moves.data.map(
      ({
        RUPOrigen,
        establecimientoOrigen,
        RUPDestino,
        establecimientoDestino,
        desde,
        hasta,
        nFormulario,
        estadoFormulario
      }) => ({
        RUPOrigen,
        establecimientoOrigen,
        RUPDestino,
        establecimientoDestino,
        desde,
        hasta,
        nFormulario,
        estadoFormulario
      })
    );
  }

  return (
    <>
      <h2>Movimiento Animal</h2>
      <Formik
        initialValues={{
          rupOrigen: null,
          establecimientoOrigen: null,
          rupDestino: null,
          establecimientoDestino: null,
          desde: null,
          hasta: null,
          nFormulario: null,
          estadoFormulario: null,
          lote: null,
          diio: null
        }}
        onSubmit={(values, { setSubmitting }) => {
          getAnimalMoves(
            values.rupOrigen.value,
            values.establecimientoOrigen.value,
            values.rupDestino.value,
            values.establecimientoDestino.value,
            values.desde.value,
            values.hasta.value,
            values.nFormulario.value,
            values.estadoFormulario.value,
            values.lote.value,
            values.diio.value
          ).then(moves => setData(moves));
          setSubmitting(false); // This can also be used for displaying a spinner
        }}
        validationSchema={Yup.object().shape({
          rupOrigen: Yup.object()
            .nullable()
            .required(),
          rupDestino: Yup.object()
            .nullable()
            .required(),
          establecimientoOrigen: Yup.object()
            .nullable()
            .required(),
          establecimientoDestino: Yup.object()
            .nullable()
            .required(),
          desde: Yup.object()
            .nullable()
            .required(),
          hasta: Yup.object()
            .nullable()
            .required(),
          nFormulario: Yup.object()
            .nullable()
            .required(),
          estadoFormulario: Yup.object()
            .nullable()
            .required(),
          lote: Yup.object()
            .nullable()
            .required(),
          diio: Yup.object()
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
              <RupOrigenSelect
                value={values.rupOrigen}
                establecimientos={getEstablecimiento}
                onChange={(field, fieldValue) => {
                  setSelectedEstablecimiento(fieldValue);
                  setFieldValue(field, fieldValue);
                }}
                onBlur={setFieldTouched}
                error={errors.titular}
                touched={touched.titular}
              />
              <RupDestinoSelect
                key={
                  selectedEstablecimiento ? selectedEstablecimiento.value : 0
                }
                value={values.establecimiento}
                establecimientos={getEstablecimiento}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.establecimiento}
                touched={touched.establecimiento}
              />
              <div>
                <label htmlFor="Desde">Desde</label>
                <input
                  id={"desde"}
                  title={"Desde"}
                  type="text"
                  value={values.desde}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label htmlFor="Hasta"> Hasta</label>
                <input
                  id={"hasta"}
                  title={"Hasta"}
                  type="text"
                  value={values.hasta}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label htmlFor="nFormulario">Nº Formulario</label>
                <input
                  id={"nFormulario"}
                  title={"Nº Formulario"}
                  type="text"
                  value={values.nFormulario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                
              </div>
              <div>
                <label htmlFor="estadoFormulario">Estado Formulario</label>
                <input
                  id={"estado Formulario"}
                  title={"Hasta"}
                  type="text"
                  value={values.hasta}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="radio">
                <label htmlFor="lote">
                  <input
                    id="lote"
                    type="radio"
                    value={values.lote}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Por Lote
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    id="diio"
                    type="radio"
                    value={values.diio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Por DIIO
                </label>
              </div>
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
      <AnimalMovesTable
        headers={[
          "Nª Formulario",
          "Fecha Formulario",
          "RUP Origen",
          "Establecimiento Origen",
          "RUP Destino",
          "Establecimiento Destino",
          "Salida",
          "Llegada",
          "Estado"
        ]}
        data={data.map(moves => [
          moves.nFormulario,
          moves.RUPOrigen,
          moves.establecimientoOrigen,
          moves.RUPDestino,
          moves.establecimientoDestino,
          moves.desde,
          moves.hasta,
          moves.estadoFormulario
        ])}
      />
    </>
  );
};
//mejorar calidad de codigo, se pueden pasar a componentes los inputs asociados
//crear boton de nuevo movimiento
//crear modal
const RupOrigenSelect = props => {
  return (
    <>
      <label htmlFor="RUP">Seleccione RUP/Establecimento Origen</label>
      <AsyncSelect
        id="RUP"
        cacheOptions
        defaultOptions
        loadOptions={props.titulares}
        onChange={value => {
          props.onChange("RUP", value);
        }}
        onBlur={value => {
          props.onBlur("RUP", value);
        }}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div className="text-danger">{props.error}</div>
      )}
    </>
  );
};

const RupDestinoSelect = props => {
  return (
    <>
      <label htmlFor="establecimiento">
        Seleccióne un RUP/Establecimiento Destino
      </label>
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

export default AnimalMoves;
