import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIProvider } from "./components/APIProvider";
import Sipec from "./routes/Sipec";

const App = () => {
  return (
    <APIProvider>
      <Sipec />
    </APIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
