import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { getEstablishmentInfo } from "../../lib/ApiEstablishment";
import APIContext from "../../components/APIProvider";
import { number } from "prop-types";
import { formatDistanceStrict } from "date-fns";
import { Card } from "react-bootstrap";

const EstablishmentInfo = ({ establishmentId }) => {
  return <p>Información del establecimiento con id {establishmentId}</p>;
};

export default EstablishmentInfo;
