import React, { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import "./DIIOMenu.css";
import EstablishmentInfo from "../components/Establishment/EstablishmentInfo";
import EstablishmentAnimals from "../components/Establishment/EstablishmentAnimals";

const MyEstablishmentMenu = ({ establishmentId }) => {
  const [componentToRender, setComponentToRender] = useState("info");
  return (
    <div>
      <div className="row">
        <div className=" d-flex flex-column">
          <ButtonGroup>
            <button
              className={`btn btn-danger ${
                componentToRender === "info" ? "active" : ""
              }`}
              onClick={() => setComponentToRender("info")}
            >
              Antecedentes
            </button>
            <button
              className={`btn btn-danger ${
                componentToRender === "animals" ? "active" : ""
              }`}
              onClick={() => setComponentToRender("animals")}
            >
              Animales
            </button>
          </ButtonGroup>
        </div>
        <div className="col-md-4"></div>
      </div>
      {componentToRender === "info" ? (
        <EstablishmentInfo establishmentId={establishmentId} />
      ) : (
        <EstablishmentAnimals establishmentId={establishmentId} />
      )}
    </div>
  );
};

export default MyEstablishmentMenu;
