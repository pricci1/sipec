import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const PucharseDetailsDiioModal = props => {
  const backendUrl = "http://sipec-backend.herokuapp.com";

  const [details, setDetails] = useState([]);

  async function getPurchaseDiioDetails() {
    const detail = await axios.get(
      `${backendUrl}/diio_purchases/${props.purchase_diio_id}`
    );
    var {
      diio_purchase: { confirmed, brand, created_at: date },
      establishment: {
        rup: purchaser_rut,
        name: purchaser_name,
        establishment_type: purchaser_type
      },
      diio_provider: { rut: provider_rut, person_type: provider_type }
    } = detail.data;
    setDetails({
      confirmed,
      brand,
      date,
      purchaser_name,
      purchaser_rut,
      purchaser_type,
      provider_rut,
      provider_type
    });
  }

  useEffect(() => {
    getPurchaseDiioDetails();
  }, []);

  function getStringState(state) {
    if (state) {
      return "Vendido";
    } else {
      return "Espera";
    }
  }

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999"
      }}
    >
      <div
        style={{
          padding: 20,
          background: "#fff",
          borderRadius: "2px",
          display: "inline-block",
          minHeight: "50vh",
          margin: "1rem",
          position: "relative",
          minWidth: "30vw",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          justifySelf: "center"
        }}
      >
        <h2>Detalles compra</h2>
        <hr></hr>
        <p>
          <b>Marca:</b> {details.brand}
        </p>
        <p>
          <b>Estado:</b> {getStringState(details.confirmed)}
        </p>
        <p>
          <b>Fecha:</b> {details.date}
        </p>
        <h4>Datos del Vendedor</h4>
        <p>
          <b>Rol:</b> {details.provider_type}
        </p>
        <p>
          <b>RUT:</b> {details.provider_rut}
        </p>
        <h4>Datos del Comprador</h4>
        <p>
          <b>Tipo:</b> {details.purchaser_type}
        </p>
        <p>
          <b>RUT:</b> {details.purchaser_rut}
        </p>
        <p>
          <b>Nombre:</b> {details.purchaser_name}
        </p>
        <button onClick={props.onClose}>Cerrar</button>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default PucharseDetailsDiioModal;
