import React, { useState, useEffect, useContext } from "react";
import APIContext from "../APIProvider";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  getEstablishmentByIdApi,
  getSpecies,
  getEstablishmentSpeciesApi
} from "../../lib/ApiEstablishment";

const EstablishmentSpecies = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [selected, setSelected] = useState([2, 5]);
  const [establishmentName, setEstablishmentName] = useState();
  const [species, setSpecies] = useState([]);
  useEffect(() => {
    getEstablishmentById();
  }, [establishmentName]);
  useEffect(() => {
    getAllSpecies();
  }, []);
  useEffect(() => {
    getEstablishmentSpecies();
  }, []);
  async function getAllSpecies() {
    const data = await getSpecies(api);
    setSpecies(data);
  }

  async function getEstablishmentSpecies() {
    const data = await getEstablishmentSpeciesApi(api, establishmentId);
    let selectedList = [];
    for (var key in data) {
      selectedList.push(data[key].value);
    }
    setSelected(selectedList);
  }

  async function getEstablishmentById() {
    const data = await getEstablishmentByIdApi(api, establishmentId);
    if (!data) {
      setEstablishmentName("Default");
    } else {
      setEstablishmentName(data.name);
    }
  }

  const onChange = selected => {
    setSelected(selected);
  };

  const onClickCallback = () => {
    // TODO: send to backend
    alert(selected);
  };

  return (
    <>
      <h3>Especies {establishmentName}</h3>
      <DualListBox
        options={species}
        selected={selected}
        onChange={onChange}
        icons={{
          moveLeft: <span>&larr;</span>,
          moveAllLeft: [
            <span key={0}>&larr;</span>,
            <span key={1}>&larr;</span>
          ],
          moveRight: <span>&rarr;</span>,
          moveAllRight: [
            <span key={0}>&rarr;</span>,
            <span key={1}>&rarr;</span>
          ],
          moveDown: <span>&darr;</span>,
          moveUp: <span>&uarr;</span>
        }}
      />
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={onClickCallback}
      >
        Actualizar
      </button>
    </>
  );
};

export default EstablishmentSpecies;
