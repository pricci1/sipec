import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { async } from "q";

const DiioDetailsModal = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const apiUrl = "https://5d80ecc899f8a20014cf9cc8.mockapi.io";

  const [details, setDetails] = useState([]);

  async function getPurchaseDiioDetails() {
    const detail = await axios.get(
      `${apiUrl}/diio_purchases/${props.diio_purchase_id}`
    );
    console.log(detail);
    setDetails(detail.data);
  }

  useEffect(() => {
    getPurchaseDiioDetails();
  }, []);

  return (
    <>
      <a style={{ color: "blue" }} onClick={handleShow}>
        {props.diio_purchase_id}
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details.estado}
          <br />
          {details.rut_comprador}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiioDetailsModal;
