import React from "react";
import { Route } from "react-router-dom";
import { DIIOMenu } from "./DIIOMenu";

const MenuRouter = () => (
  <div>
    <Route exact path="/consulta-diio" component={DIIOMenu} />
  </div>
);
export default MenuRouter;
