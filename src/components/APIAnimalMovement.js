import React from "react";
import APIAnimalMovement from "../lib/APIAnimalMovement";

const APIAnimalMovementContext = React.createContext();

const APIAnimalMovementProvider = props => {
  return (
    <APIAnimalMovementContext.Provider value={new APIAnimalMovement()}>
      {props.children}
    </APIAnimalMovementContext.Provider>
  );
};

export { APIAnimalMovementProvider };
export default APIAnimalMovementContext;
