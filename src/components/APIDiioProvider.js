import React from "react";
import APIDiio from "../lib/APIDiio";

const APIDiioContext = React.createContext();

const APIDiioProvider = props => {
  return (
    <APIDiioContext.Provider value={new APIDiio()}>
      {props.children}
    </APIDiioContext.Provider>
  );
};

export { APIDiioProvider };
export default APIDiioContext;
