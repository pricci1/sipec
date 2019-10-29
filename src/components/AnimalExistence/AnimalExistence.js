import React, { useState } from "react";
import { Router } from "@reach/router";
import DeclarationsList from "./DeclarationsList";
import NewDeclaration from "./NewDeclaration";

const fakeData = [
  {
    id: 1,
    rup: "123456789",
    name: "Pajaro Bobo",
    neighborhood: "Las Condes",
    declarationDate: "30/10/19",
    registrationDate: "30/10/19",
    type: "Anual",
    year: "2020"
  },
  {
    id: 2,
    rup: "1.1.1.2",
    name: "Tiger Woods",
    neighborhood: "70",
    declarationDate: "12/12/13",
    registrationDate: "12/12/13",
    type: "Anual",
    year: "2013"
  }
];

const AnimalExistence = () => {
  const [declarations, setDeclarations] = useState(fakeData);
  return (
    <Router>
      <DeclarationsList declarations={declarations} path="/" />
      <NewDeclaration setDeclarations={setDeclarations} path="new" />
    </Router>
  );
};

export default AnimalExistence;
