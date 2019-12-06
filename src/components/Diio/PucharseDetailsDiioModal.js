import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import APIContext from "../../components/APIProvider";
import { getDiioPurchaseDetails } from "../../lib/APIDiio";

const PucharseDetailsDiioModal = props => {
  const api = useContext(APIContext);

  const [details, setDetails] = useState([]);
  const [state, setState] = useState({ infoAvailable: false });

  async function getDiioPurchaseDetailsApi() {
    setState({ infoAvailable: false });
    const data = await getDiioPurchaseDetails(api, props.purchase_diio_id);
    var {
      diio_purchase: { confirmed, brand, created_at: date, diio_id },
      establishment: {
        rup: purchaser_rut,
        name: purchaser_name,
        establishment_type: purchaser_type
      },
      diio_provider: { rut: provider_rut, person_type: provider_type },
      diio_range //: { min: range_min, max: range_max }
    } = data;
    setDetails({
      diio_id,
      confirmed,
      brand,
      date,
      purchaser_name,
      purchaser_rut,
      purchaser_type,
      provider_rut,
      provider_type,
      //range_min,
      //range_max
      diio_range
    });
    setState({ infoAvailable: true });
  }

  useEffect(() => {
    getDiioPurchaseDetailsApi();
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
        <hr />
        {state.infoAvailable ? (
          <>
            <p>
              <b>Marca:</b> {details.brand}
            </p>
            <p>
              <b>Estado:</b> {getStringState(details.confirmed)}
            </p>
            <p>
              <b>Fecha:</b>{" "}
              {typeof details.date === "undefined"
                ? details.date
                : details.date.split("T")[0]}
            </p>
            <p>
              <b>Rango:</b>{" "}
              {details.diio_range != null ? (
                <p>
                  {details.diio_range.min} - {details.diio_range.max}
                </p>
              ) : (
                <p>
                  {details.diio_id} - {details.diio_id}
                </p>
              )}
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
            <button className="btn btn-outline-primary" onClick={props.onClose}>
              Cerrar
            </button>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default PucharseDetailsDiioModal;
