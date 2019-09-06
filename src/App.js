import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";

const App = () => {
  return (
    <div>
      <header>
        <Link to="/">SIPEC</Link>
      </header>
      <h2>Que?</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
