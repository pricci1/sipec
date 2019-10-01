import React from "react";
import DiioTable from "../components/Diio/PucharseListDiio";

const diioHeaders = ["header a", "header b"];
const diioData = ["dato a", "dato b"];
const diioProps = { headers: diioHeaders, data: diioData };

const DIIOMenu = () => {
  return <DiioTable props={diioProps} />;
};

export default DIIOMenu;
