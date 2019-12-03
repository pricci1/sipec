import React, { useState, useContext, useEffect } from "react";
import APIContext from "../APIProvider";
import DualListBox from "react-dual-listbox";
import {
  getEstablishmentByIdApi,
  getEntries
} from "../../lib/ApiEstablishment";
import "react-dual-listbox/lib/react-dual-listbox.css";

const EstablishmentRubros = ({ establishmentId }) => {
  const api = useContext(APIContext);
  const [selected, setSelected] = useState([2, 5]);
  const [establishmentName, setEstablishmentName] = useState();
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    getEstablishmentById();
  }, [establishmentName]);
  useEffect(() => {
    getAllEntries();
  }, []);

  async function getAllEntries() {
    const data = await getEntries(api);
    setEntries(data);
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
      <h3>Rubros {establishmentId}</h3>
      <DualListBox
        options={entries}
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

export default EstablishmentRubros;
