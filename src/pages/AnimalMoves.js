import React, {
  useState,
  useContext
} from "react";
import {
  Formik,
  Field
} from "formik";
import * as Yup from "yup";
import DatePickerField from "../components/AnimalMoves/DatePickerField";
import Dropdown from "../components/AnimalMoves/Dropdown";
import RangeInput from "../components/AnimalMoves/RangeInput";
//import EstablishmentOriginSelect from "../components/AnimalMoves/EstablishmentOriginSelect";
//import EstablishmentDestinationSelect from "../components/AnimalMoves/EstablishmentDestinationSelect";
import AnimalMovesTable from "../components/AnimalMoves/AnimalMovesTable";
import RadioButton from "../components/AnimalMoves/RadioButton";
import RadioButtonGroup from "../components/AnimalMoves/RadioButtonGroup";
import APIContext from "../components/APIProvider"
import Autocomplete from "react-autocomplete";


const AnimalMoves = () => {
  const apiInstance = useContext(APIContext)
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
  const [data, setData] = useState([]);
  const [moves, setmoves] = useState([]);
  const [rupOptions, setrupOptions] = useState([]);


  async function autocompleteOriginRUP(event) {
    //setoriginRUP(event.target.value);
    const response = await apiInstance.get(
      "/autocomplete_rup?rup=" + event.target.value
    );
    const data1 = response.data.establishments.map(establishment => ({
      label: establishment.rup + ' / ' + establishment.name,
      value: establishment.rup
    }));
    setrupOptions(data1);
  }
  async function autocompleteDestinyRUP(event) {
    //setdestinyRUP(event.target.value);
    const response = await apiInstance.get(
      "/autocomplete_rup?rup=" + event.target.value
    );
    const data1 = response.data.establishments.map(establishment => ({
      label: establishment.rup + ' / ' + establishment.name,
      value: establishment.rup
    }));
    setrupOptions(data1);
  }
  async function getAnimalMovements() {
    const moves = await apiInstance.get("/animal_movement_table")
    setmoves(moves)


  }
  useEffect(() => {
    getAnimalMovements()
  }, []);
  async function getAnimalMoves(
    originRUP,
    destinyRUP,
    dateDeparture,
    dateArrival,
    nForm,
    state,
    radioGroup
  ) {
    //no terminada falta agregar a la tabla los datos que se sacan de get estableciminetos y combinarlos con moves

    var moves = getAnimalMovements();
    /*var dataMap = moves.data.map(obj => ({
      diio: obj.diios.map(o => ({ diio_data: o[0].diio_type_id }))
    }));*/
    var movesMap = moves.data.map(
      ({
        animal_move: {
          arrival,
          departure,
          created_at,
          id
        },
        destination_establishment: {
          rup: rup_destination,
          name: name_destination
        },
        origin_establishment: {
          rup: rup_origin,
          name: name_origin
        },
        diios
      }) => ({
        arrival,
        departure,
        created_at,
        rup_destination,
        name_destination,
        rup_origin,
        name_origin,
        id,
        diio: diios.map(o => ({
          diio_data: o.diio_type_id
        }))
      })
    );


    if (originRUP != "") {
      movesMap = movesMap.filter(d => d.rup_origin == originRUP);
    }



    if (destinyRUP != "") {
      movesMap = movesMap.filter(
        d => d.rup_destination == destinyRUP
      );
    }

    if (dateDeparture != "") {
      var dtd = new Date(dateDeparture);
      movesMap = movesMap.filter(d => new Date(d.departure).getTime() >= dtd);
    }
    if (dateArrival != "") {
      var dta = new Date(dateArrival);
      movesMap = movesMap.filter(d => new Date(d.arrival).getTime() <= dta);
    }
    if (nForm != "") {
      movesMap = movesMap.filter(d => d.id == nForm);
    }

    if (state != null) {
      if (state == "Aceptado") {
        movesMap = movesMap.filter(d => d.diio.length != 0 && d.diio[0].diio_data == 1);
      }
      if (state == "Con problemas") {
        movesMap = movesMap.filter(d => d.diio.length !== 0 && d.diio[0].diio_data === 2);
      }
      if (state == "En transito") {
        movesMap = movesMap.filter(d => d.diio.length !== 0 && d.diio[0].diio_data === 3);
      }


    }
    if (radioGroup != "") {
      if (radioGroup == "lote") {
        movesMap = movesMap.filter(d => d.diio.length !== 0);
      }
      if (radioGroup == "diio") {
        movesMap = movesMap.filter(d => d.diio.length === 0);

      }
    }


    return movesMap;
  }
  /*if(loading){
    return(<div></div>)
  }*/

  return ( <
    >
    <
    h2 > Movimiento Animal < /h2> <
    Formik initialValues = {
      {
        originRUP: "",
        destinyRUP: "",
        dateArrival: "",
        dateDeparture: "",
        nForm: "",
        state: "",
        radioGroup: ""
      }
    }
    onSubmit = {
      (values, {
        setSubmitting
      }) => {
        getAnimalMoves(
          values.originRUP,
          values.destinyRUP,
          values.dateDeparture,
          values.dateArrival,
          values.nForm,
          values.state,
          values.radioGroup
        ).then(response => {
          setData(response);
          console.log(response);
        });

        setSubmitting(false); // This can also be used for displaying a spinner
      }
    }
    validationSchema = {
      Yup.object().shape({
        originRUP: Yup.object().nullable(),
        destinyRUP: Yup.object().nullable(),
        dateDeparture: Yup.object().nullable(),
        dateArrival: Yup.object().nullable(),
        nForm: Yup.object().nullable(),
        state: Yup.object().nullable(),
        lote: Yup.object().nullable(),
        diio: Yup.object().nullable()
      })
    } >
    {
      props => {
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
          //setFieldTouched,
          handleReset
        } = props;
        return ( <
          form onSubmit = {
            handleSubmit
          } >
          <
          div className = {
            "col-md-11"
          } >
          <
          div className = {
            "col-md-3"
          } >
          <
          span style = {
            {
              marginRight: 30
            }
          } > RUP Origen < /span> <
          Autocomplete name = "originRUP"
          inputProps = {
            {
              className: "form-control"
            }
          }
          getItemValue = {
            item => item.value
          }
          items = {
            rupOptions
          }
          renderItem = {
            (item, isHighlighted) => ( <
              div className = "form-control" > {
                item.label
              } < /div>
            )
          }
          value = {
            values.originRUP
          }
          onChange = {
            autocompleteOriginRUP
          }
          onSelect = {
            val => setFieldValue("originRUP", val)
          }
          /> <
          /div> <
          div className = {
            "col-md-3"
          }
          style = {
            {
              marginBottom: 10
            }
          } >
          <
          span style = {
            {
              marginRight: 10
            }
          } > RUP Destino < /span> <
          Autocomplete name = "destinyRUP"
          inputProps = {
            {
              className: "form-control"
            }
          }
          getItemValue = {
            item => item.value
          }
          items = {
            rupOptions
          }
          renderItem = {
            (item, isHighlighted) => ( <
              div className = "form-control" > {
                item.label
              } < /div>
            )
          }
          value = {
            values.destinyRUP
          }
          onChange = {
            autocompleteDestinyRUP
          }
          onSelect = {
            val => setFieldValue("destinyRUP", val)
          }
          /> <
          /div> <
          /div>

          <
          div >
          <
          label htmlFor = "dateDeparture" > Desde < /label> <
          DatePickerField name = "dateDeparture"
          value = {
            values.dateDeparture
          }
          onChange = {
            setFieldValue
          }
          className = "form-control"
          dateFormat = "YYYY-MM-DD" /
          >
          <
          /div> <
          div >
          <
          label htmlFor = "dateArrival" > Hasta < /label> <
          DatePickerField name = "dateArrival"
          value = {
            values.dateArrival
          }
          onChange = {
            setFieldValue
          }
          className = "form-control" /
          >
          <
          /div>

          <
          div >
          <
          RangeInput id = {
            "nForm"
          }
          title = {
            "Nº Formulario"
          }
          value = {
            values.nForm
          }
          onChange = {
            handleChange
          }
          onBlur = {
            handleBlur
          }
          /> <
          /div> <
          div >
          <
          Dropdown id = {
            "state"
          }
          title = {
            "Estado Formulario"
          }
          onChange = {
            handleChange
          }
          onBlur = {
            handleBlur
          }
          value = {
            values.state
          }
          options = {
            ["Aceptado", "Con problemas", "En transito"]
          }
          /> <
          /div> <
          RadioButtonGroup id = "radioGroup"
          value = {
            values.radioGroup
          }
          error = {
            errors.radioGroup
          }
          touched = {
            touched.radioGroup
          } >
          <
          Field component = {
            RadioButton
          }
          name = "radioGroup"
          id = "lote"
          label = "Por lote" /
          >
          <
          Field component = {
            RadioButton
          }
          name = "radioGroup"
          id = "diio"
          label = "Por DIIO" /
          >
          <
          /RadioButtonGroup>

          <
          button type = "button"
          className = "btn btn-secondary"
          onClick = {
            handleReset
          }
          disabled = {
            !dirty || isSubmitting
          } >
          Reset <
          /button> <
          button type = "submit"
          disabled = {
            isSubmitting
          }
          className = "btn btn-primary ml-1" >
          Submit <
          /button> <
          /form>
        );
      }
    } <
    /Formik> <
    br / >
    <
    AnimalMovesTable headers = {
      [
        "Nª Formulario",
        "Fecha Formulario",
        "RUP Origen",
        "Establecimiento Origen",
        "RUP Destino",
        "Establecimiento Destino",
        "Salida",
        "Llegada",
        "Ver Detalle"
      ]
    }
    data = {
      data.map(moves => [
        moves.id,
        moves.created_at,
        moves.rup_origin,
        moves.name_origin,
        moves.rup_destination,
        moves.name_destination,
        moves.departure,
        moves.arrival
      ])
    }
    /> <
    />
  );
};


export default AnimalMoves;