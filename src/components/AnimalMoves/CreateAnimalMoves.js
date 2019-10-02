import React, { useState, useContext } from "react";
import APIContext from "../APIProvider";
import SpeciesDropdown from "./MinimalComponents/SpeciesDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import Autocomplete from 'react-autocomplete'


const CreateAnimalMoves = () => {
  const api = useContext(APIContext);
  const [originRUP, setoriginRUP] = useState("");
  const [destinyRUP, setdestinyRUP] = useState("");
  const [registerDate, setregisterDate] = useState("");
  const [arriveDate, setarriveDate] = useState("");
  const [driver, setdriver] = useState("");
  const [plate, setplate] = useState("");
  const [initialRange, setinitialRange] = useState("");
  const [finalRange, setfinalRange] = useState("");
  const [rupOptions, setrupOptions] = useState([]);
  const [rupLoading, setrupLoading] = useState(false);
  const AsyncTypeahead = asyncContainer(Typeahead)
  async function validateRUP(event){
    const response = await api.post("/validate_rup", {rup:event.target.value})
    if(response.data.status == "none"){
        alert("RUP no existente")
    }
  }
  async function autocompleteOriginRUP(event){
    setoriginRUP(event.target.value)
    const response = await api.get("/autocomplete_rup?rup=" + event.target.value);
    const data  = response.data.establishments.map(establishment => ({label: establishment.rup}))
    setrupOptions(data);
  }
  async function autocompleteDestinyRUP(event){
    setdestinyRUP(event.target.value)
    const response = await api.get("/autocomplete_rup?rup=" + event.target.value);
    const data  = response.data.establishments.map(establishment => ({label: establishment.rup}))
    setrupOptions(data);

  }
  function handleOriginRUPChange(event) {
    setoriginRUP(event.target.value);
  }
  function handleDestinyRUPChange(event) {
    setdestinyRUP(event.target.value);
  }
  function handleRegisterDateChange(event) {
    setregisterDate(event);
  }
  function handleArriveDateChange(event) {
    setarriveDate(event);
  }
  function handleDriverChange(event) {
    setdriver(event.target.value);
  }
  function handlePlateChange(event) {
    setplate(event.target.value);
  }
  function handleInitialRangeChange(event) {
    setinitialRange(event.target.value);
  }
  function handleFinalRangeChange(event) {
    setfinalRange(event.target.value);
  }
  async function sendRequest() {
    const params = {
      originRUP: originRUP,
      destinyRUP: destinyRUP,
      registerDate: registerDate,
      arriveDate: arriveDate,
      driver: driver,
      plate: plate,
      initialRange: initialRange,
      finalRange: finalRange
    };
    const response = await api.post("/create_animal_movement",params)
    if(response.data.status == "ok"){
      alert("Se creó el movimiento con éxito")
    }
  }

  return (
    <div className={"form-group col-md-11"}>
      <span>Fecha de registro </span>
      <DatePicker
        className={"form-control"}
        selected={registerDate}
        onChange={handleRegisterDateChange}
      />
      <div className={"form-row"} style={{marginTop:10}}>
      <div className={"form-group"}>
        <span>Fecha de Llegada </span>
        <DatePicker
          className={"form-control"}
          selected={arriveDate}
          onChange={handleArriveDateChange}
        />
      </div>
        <div className={"col-md-3"}>
          <span style={{marginRight:30}}>RUP Origen</span>
          <Autocomplete 
            inputProps={{class:"form-control"}}
            getItemValue={(item) => item.label}
            items={rupOptions}
            renderItem={(item, isHighlighted) =>
              <div className="form-control">
                {item.label}
              </div>
            }
            value={originRUP}
            onChange={autocompleteOriginRUP}
            onSelect={(val) => setoriginRUP(val)}
          />
        </div>
        <div className={"col-md-3"} style={{ marginBottom: 10 }}>
          <span style={{marginRight:10}}>RUP Destino</span>
          <Autocomplete 
            inputProps={{class:"form-control"}}
            getItemValue={(item) => item.label}
            items={rupOptions}
            renderItem={(item, isHighlighted) =>
              <div className="form-control">
                {item.label}
              </div>
            }
            value={destinyRUP}
            onChange={autocompleteDestinyRUP}
            onSelect={(val) => setdestinyRUP(val)}
          />
        </div>
      </div>
      <SpeciesDropdown />
      <span>Conductor</span>
      <input
        className={"form-control"}
        value={driver}
        onChange={handleDriverChange}
      ></input>
      <span>Patente Vehículo</span>
      <input
        className={"form-control"}
        value={plate}
        onChange={handlePlateChange}
      ></input>
      <span>Rango DIIO</span>
      <div className={"form-row"}>
        <div className={"col-md-3"}>
          <span>Inicial</span>
          <input
            className={"form-control"}
            value={initialRange}
            onChange={handleInitialRangeChange}
          ></input>
        </div>
        <div className={"col-md-3"}>
          <span>Final</span>
          <input
            className={"form-control"}
            value={finalRange}
            onChange={handleFinalRangeChange}
          ></input>
        </div>
      </div>
      <button onClick={sendRequest} className={"btn btn-success"}>Submit</button>
    </div>
  );
};

export default CreateAnimalMoves;
