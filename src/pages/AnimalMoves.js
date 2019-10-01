import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePickerField from "../components/AnimalMoves/DatePickerField";
import Dropdown from "../components/AnimalMoves/Dropdown";
import RangeInput from "../components/AnimalMoves/RangeInput";
import EstablishmentOriginSelect from "../components/AnimalMoves/EstablishmentOriginSelect";

import EstablishmentDestinationSelect from "../components/AnimalMoves/EstablishmentDestinationSelect";
import AnimalMovesTable from "../components/AnimalMoves/AnimalMovesTable";
import RadioButton from "../components/AnimalMoves/RadioButton";
import RadioButtonGroup from "../components/AnimalMoves/RadioButtonGroup"


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
  const apiUrl = "sipec-backend.herokuapp.com";
  const [data, setData] = useState([]);

  async function getEstablishment() {
    const Establecimento = await axios.get(`${apiUrl}/establishments`);
    return Establecimento.data.map(({ id, name, rup }) => ({
      value: id,
      label: rup + "/" + name
    }));
    //RUP como id
  }

  async function getAnimalMoves(
    establishmentOrigin,
    establishmentDestination,
    dateDepartue,
    dateArrival,
    nForm,
    state,
    radioGroup
  ) {
    //no terminada falta agregar a la tabla los datos que se sacan de get estableciminetos y combinarlos con moves
    var moves = [];
    moves = await axios.get(`${apiUrl}/animal_movement_table`);
    /*if (RUPDestino != null) {
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
    }*/
    console.log(moves);

    return moves.data.map(
      ({
        establishmentOrigin,
        establishmentDestination,
        dateDepartue,
        dateArrival,
        id,
        state
      }) => ({
        establishmentOrigin,
        establishmentDestination,
        dateDepartue,
        dateArrival,
        id,
        state
      })
    );
  }

  return (
    <>
      <h2>Movimiento Animal</h2>
      <Formik
        initialValues={{
          establishmentOrigin: "",
          establishmentDestination: "",
          dateArrival: "",
          dateDepartue: "",
          nForm: "",
          state: "",
          radioGroup: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          getAnimalMoves(
            values.establishmentOrigin.value,
            values.establishmentDestination.value,
            values.dateDepartue.value,
            values.dateArrival.value,
            values.nForm.value,
            values.state.value,
            values.radioGroup.value
          ).then(moves => setData(moves));
          setSubmitting(false); // This can also be used for displaying a spinner
        }}
        validationSchema={Yup.object().shape({
          establishmentOrigin: Yup.object()
            .nullable()
            .required(),
          establishmentDestination: Yup.object()
            .nullable()
            .required(),

          dateDepartue: Yup.object()
            .nullable()
            .required(),
          dateArrival: Yup.object()
            .nullable()
            .required(),
          nForm: Yup.object()
            .nullable()
            .required(),
          state: Yup.object()
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
              <EstablishmentOriginSelect
                value={values.establishmentOrigin}
                establishmentOrigin={getEstablishment}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.establishmentOrigin}
                touched={touched.establishmentOrigin}
              />
              <EstablishmentDestinationSelect
                value={values.establishmentDestination}
                establishmentDestination={getEstablishment}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.establishmentDestination}
                touched={touched.establishmentDestination}
              />

              <div>
                <label htmlFor="dateDeparture">Desde</label>
                <DatePickerField
                  name="dateDeparture"
                  value={values.dateDeparture}
                  onChange={setFieldValue}
                />
              </div>
              <div>
                <label htmlFor="dateArrival">Hasta</label>
                <DatePickerField
                  name="dateArrival"
                  value={values.dateArrival}
                  onChange={setFieldValue}
                />
              </div>

              <div>
                <RangeInput
                  id={"nForm"}
                  title={"Nº Formulario"}
                  value={values.nForm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <Dropdown
                  id={"state"}
                  title={"Estado Formulario"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  options={["Aceptado", "Con problemas", "En transito"]}
                />
              </div>
              <RadioButtonGroup
                id="radioGroup"
                value={values.radioGroup}
                error={errors.radioGroup}
                touched={touched.radioGroup}
              >
                <Field
                  component={RadioButton}
                  name="radioGroup"
                  id="lote"
                  label="Por lote"
                />
                <Field
                  component={RadioButton}
                  name="radioGroup"
                  id="diio"
                  label="Por DIIO"
                />
              </RadioButtonGroup>
              
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
                onClick={() => {
                  alert(JSON.stringify(data));
                }}
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
        data={data.map( moves => [
          moves.id,
          moves.RUPOrigen,
          moves.establecimientoOrigen,
          moves.RUPDestino,
          moves.establecimientoDestino,
          moves.desde,
          moves.hasta,
          moves.estadoFormulario
        ]
        )}
      />
    </>
  );
};

//crear boton de nuevo movimiento
//crear modal

export default AnimalMoves;
