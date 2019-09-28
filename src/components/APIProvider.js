import React from "react";
import API from "../lib/API";

const APIContext = React.createContext();

const APIProvider = props => {
  return (
    <APIContext.Provider value={new API()}>
      {props.children}
    </APIContext.Provider>
  );
};

export { APIProvider };
export default APIContext;
