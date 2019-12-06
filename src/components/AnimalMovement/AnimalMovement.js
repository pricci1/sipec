import React from "react";
import { Router } from "@reach/router";
import NewMovement from "./NewMovement";
import MovementList from "./MovementsList";

const AnimalMovement = () => {
  return (
    <Router>
      <MovementList path="/" />
      <NewMovement path="nueva" />
    </Router>
  );
};

export default AnimalMovement;
