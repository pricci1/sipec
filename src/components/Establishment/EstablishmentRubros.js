import React, { useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

const options = [
  { value: 1, label: "Miel" },
  { value: 2, label: "Leche" },
  { value: 3, label: "Huevo" },
  { value: 4, label: "Carne" },
  { value: 5, label: "Reproducción" },
  { value: 6, label: "Pelo" }
];

const EstablishmentRubros = ({ establishmentId }) => {
  const [selected, setSelected] = useState([2, 5]);

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
        options={options}
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
