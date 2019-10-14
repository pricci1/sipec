import React from "react";
import { Router } from "@reach/router";
import DeclarationsList from "./DeclarationsList";
import NewDeclaration from "./NewDeclaration";

const AnimalExistence = () => {
  return (
    <Router>
      <DeclarationsList path="/" />
      <NewDeclaration path="new" />
    </Router>
  );
};

export default AnimalExistence;
