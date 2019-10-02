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
import RadioButtonGroup from "../components/AnimalMoves/RadioButtonGroup";

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
  const apiUrl = "http://sipec-backend.herokuapp.com";
  const [data, setData] = useState([]);

  async function getEstablishment() {
    const Establecimento = await axios.get(`${apiUrl}/establishments`);
    console.log(Establecimento.data);
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

    var moves = await axios.get(`${apiUrl}/animal_movement_table`);
    console.log(moves.data);
    /*if (establishmentOrigin != false) {
      moves = moves.data.filter(
        d => (d.origin_establishment.id = establishmentOrigin)
      );
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
        animal_move: { arrival, departure, created_at, id },
        destination_establishment: {
          rup: rup_destination,
          name: name_destination
        },
        origin_establishment: { rup: rup_origin, name: name_origin }
      }) => ({
        arrival,
        departure,
        created_at,
        rup_destination,
        name_destination,
        rup_origin,
        name_origin,
        id
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
          ).then(response => {
            setData(response);
            console.log(response);
          });

          setSubmitting(false); // This can also be used for displaying a spinner
        }}
        validationSchema={Yup.object().shape({
          establishmentOrigin: Yup.object().nullable(),
          establishmentDestination: Yup.object().nullable(),
          dateDepartue: Yup.object().nullable(),
          dateArrival: Yup.object().nullable(),
          nForm: Yup.object().nullable(),
          state: Yup.object().nullable(),
          lote: Yup.object().nullable(),
          diio: Yup.object().nullable()
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
          "Ver Detalle"
        ]}
        data={data.map( moves => [
          moves.id,
          moves.created_at,
          moves.rup_origin,
          moves.name_origin,
          moves.rup_destination,
          moves.name_destination,
          moves.departure,
          moves.arrival
        ])}
      />
    </>
  );
};

//crear boton de nuevo movimiento
//crear modal

export default AnimalMoves;
