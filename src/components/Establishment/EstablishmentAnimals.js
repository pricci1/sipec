import React, { useState, useEffect, useContext } from "react";
import APIContext from "../../components/APIProvider";
import {
  getEstablishmentAnimalsApi,
  getSpeciesApi,
  getEstablishmentsApi
} from "../../lib/ApiEstablishment";
import { Formik } from "formik";
import Selector from "../../components/Diio/Utilities/FormikSelector";
import EstablishmentAnimalsTable from "./EstablishmentAnimalsTable";

const EstablishmentAnimals = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [state, setState] = useState({
    infoAvailable: false,
    message: "No hay resultados disponibles"
  });
  const [establishmentRupName, setEstablishmentRupName] = useState({
    establishmentRupName: ""
  });
  const [data, setData] = useState();

  async function getEstablishmentAnimals(establishment_id, species_id) {
    setState({ infoAvailable: false, message: "Cargando..." });
    const info = await getEstablishmentAnimalsApi(
      api,
      establishment_id,
      species_id
    );
    setData(
      info.map(
        ({
          fecha_nacimiento: birthdate,
          lugar_nacimiento: place_of_birth,
          numero_diio: diio,
          raza: race,
          sexo: sex
        }) => ({
          birthdate,
          place_of_birth,
          diio,
          race,
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

  async function getSpecies() {
    //const species = [{ value: 1, label: "Vaca" }];
    const species = await getSpeciesApi(api);
    return species;
  }

  useEffect(() => {
    getEstablishmentRupName(establishmentId);
    // console.log(data);
  }, []);

  return (
    <>
      <h3>Listado de Animales</h3>
      <p>
        <b>Establecimiento:</b> {establishmentRupName.establishmentRupName}
      </p>
      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          getEstablishmentAnimals(establishmentId, values.species_id.value);
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
              <Selector
                fieldName="species_id"
                labelName=":Especie"
                fieldValue={values.species_id}
                onBlur={setFieldTouched}
                onChange={(field, fieldValue) => {
                  setFieldValue(field, fieldValue);
                }}
                data={getSpecies}
              />
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
            animal.race,
            animal.birthdate,
            "Novillo",
            animal.place_of_birth,
            animal.sex,
            "No pabco"
          ])}
        />
      ) : (
        <p>{state.message}</p>
      )}
    </>
  );
};

export default EstablishmentAnimals;
