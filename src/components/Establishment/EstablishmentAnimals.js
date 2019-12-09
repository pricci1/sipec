import React, { useState, useEffect, useContext } from "react";
import APIContext from "../../components/APIProvider";
import {
  getEstablishmentAnimalsApi,
  getSpeciesApi,
  getEstablishmentsApi,
  getBreedApi
} from "../../lib/ApiEstablishment";
import { Formik } from "formik";
import Selector from "../../components/Diio/Utilities/FormikSelector";
import EstablishmentAnimalsTable from "./EstablishmentAnimalsTable";
import DatePicker from "react-datepicker";

const EstablishmentAnimals = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [state, setState] = useState({
    infoAvailable: false,
    message: ""
  });
  const [establishmentRupName, setEstablishmentRupName] = useState({
    establishmentRupName: ""
  });
  const [data, setData] = useState();

  async function getEstablishmentAnimals(
    establishment_id,
    species_id,
    birth_establishment_id,
    sex,
    breed,
    diio_start,
    diio_end,
    date_from,
    date_to
  ) {
    setState({ infoAvailable: false, message: "Cargando..." });
    const info = await getEstablishmentAnimalsApi(
      api,
      establishment_id,
      species_id,
      birth_establishment_id,
      sex,
      breed,
      diio_start,
      diio_end,
      date_from,
      date_to
    );
    setData(
      info.map(
        ({
          fecha_nacimiento: birthdate,
          lugar_nacimiento: place_of_birth,
          numero_diio: diio,
          raza: breed,
          sexo: sex
        }) => ({
          birthdate,
          place_of_birth,
          diio,
          breed,
          sex
        })
      )
    );
    if (info.length > 0) {
      setState({ infoAvailable: true });
    } else {
      setState({ message: "No hay resultados disponibles" });
    }
  }

  function getStringDiio(diio) {
    let diioString;
    if (diio.includes("Modelo") || diio.includes("modelo")) {
      diioString = diio.split(" ")[1];
    } else {
      diioString = diio.toString();
    }
    let zeros = 5 - diioString.length;
    return "0".repeat(zeros) + diioString;
  }

  async function getEstablishmentRupName(establishment_id) {
    const info = await getEstablishmentsApi(api, establishment_id);
    const rupName = info.find(item => item.value == establishment_id);
    setEstablishmentRupName({ establishmentRupName: rupName.label });
  }

  async function getEstablishments() {
    const establishments = await getEstablishmentsApi(api);
    return establishments;
  }

  async function getSexs() {
    return [
      { value: "Macho", label: "Macho" },
      { value: "Hembra", label: "Hembra" }
    ];
  }

  async function getSpecies() {
    //const species = [{ value: 1, label: "Vaca" }];
    const species = await getSpeciesApi(api);
    return species;
  }

  async function getBreeds() {
    const breeds = await getBreedApi(api);
    return breeds;
  }

  useEffect(() => {
    getEstablishmentRupName(establishmentId);
  }, []);

  return (
    <>
      <h3>Listado de Animales</h3>
      <p>
        <b>Establecimiento:</b> {establishmentRupName.establishmentRupName}
      </p>
      <Formik
        initialValues={{
          birth_establishment_id: "",
          species_id: "",
          sex: "",
          breed: "",
          diioStart: "",
          diioEnd: "",
          date: { from: "", to: "" }
        }}
        onSubmit={(values, { setSubmitting }) => {
          getEstablishmentAnimals(
            establishmentId,
            values.species_id.value,
            values.birth_establishment_id.value,
            values.sex.value,
            values.breed.value,
            values.diioStart,
            values.diioEnd,
            values.date.from,
            values.date.to
          );
          setSubmitting(false);
        }}
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
              <div style={{ marginLeft: "90px", marginTop: "10px" }}>
                <Selector
                  fieldName="species_id"
                  labelName="Especie"
                  fieldValue={values.species_id}
                  onBlur={setFieldTouched}
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue);
                  }}
                  data={getSpecies}
                />
              </div>
              <div style={{ marginLeft: "90px", marginTop: "10px" }}>
                <Selector
                  fieldName="birth_establishment_id"
                  labelName="Establecimiento de nacimiento"
                  fieldValue={values.birth_establishment_id}
                  onBlur={setFieldTouched}
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue);
                  }}
                  data={getEstablishments}
                />
              </div>
              <div style={{ marginLeft: "90px" }}>
                <Selector
                  fieldName="sex"
                  labelName="Sexo"
                  fieldValue={values.sex}
                  onBlur={setFieldTouched}
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue);
                  }}
                  data={getSexs}
                />
              </div>
              <div style={{ marginLeft: "90px", marginTop: "10px" }}>
                <Selector
                  fieldName="breed"
                  labelName="Raza"
                  fieldValue={values.breed}
                  onBlur={setFieldTouched}
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue);
                  }}
                  data={getBreeds}
                />
              </div>
              <div
                className="row"
                style={{
                  textAlign: "justify",
                  marginTop: "10px",
                  marginLeft: "1px",
                  marginBottom: "10px"
                }}
              >
                <label htmlFor="from-date">Fecha de nacimiento desde</label>
                <div className="col-md-2">
                  <DatePicker
                    id="from-date"
                    //onBlur={handleBlur}
                    className="form-control"
                    selected={values.date.from}
                    onChange={value => {
                      setFieldValue("date.from", value);
                    }}
                    //onSelect={handleChange}
                    name="date.from"
                    dateFormat="yy/MM/dd"
                  />
                </div>
                <label htmlFor="to-date">hasta</label>
                <div className="col-md-2">
                  <DatePicker
                    id="to-date"
                    //onBlur={handleBlur}
                    className="form-control"
                    selected={values.date.to}
                    onChange={value => {
                      setFieldValue("date.to", value);
                    }}
                    minDate={values.date.from}
                    //onSelect={handleChange}
                    name="date.to"
                    dateFormat="yy/MM/dd"
                  />
                </div>
              </div>
              <label
                htmlFor="diioStart"
                style={{
                  marginLeft: "40px"
                }}
              >
                Rangeo de DIIO desde
              </label>
              <input
                id="diioStart"
                name="diioStart"
                className="diio"
                type="number"
                style={{ marginLeft: 10, marginRight: 10 }}
                onBlur={setFieldTouched}
                onChange={val => {
                  setFieldValue("diioStart", val.target.value);
                }}
                value={values.diioStart}
              />
              <label htmlFor="diioEnd">hasta</label>
              <input
                id="diioEnd"
                name="diioEnd"
                className="diio"
                type="number"
                style={{ marginLeft: 10, marginRight: 10 }}
                onBlur={setFieldTouched}
                onChange={val => {
                  setFieldValue("diioEnd", val.target.value);
                }}
                value={values.diioEnd}
              />
              <br></br>
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </form>
          );
        }}
      </Formik>
      {state.infoAvailable ? (
        <EstablishmentAnimalsTable
          headers={[
            "DIIO",
            "Raza",
            "Fecha de nacimiento",
            "Categoría",
            "Establecimiento de nacimiento",
            "Sexo",
            "PABCO"
          ]}
          data={data.map(animal => [
            getStringDiio(animal.diio),
            animal.breed,
            animal.birthdate,
            "Novillo",
            animal.place_of_birth,
            animal.sex,
            "No pabco"
          ])}
        />
      ) : (
        <p>
          <b>{state.message}</b>
        </p>
      )}
    </>
  );
};

export default EstablishmentAnimals;
