import React, { useState } from "react";

const PucharseDetailsDiioModal = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <a style={{color: 'blue'}} onClick={handleShow} href="/">{props.text}</a>
        <div className="modal" show={show} onHide={handleClose}>
          <div className="modal-header" closeButton>
            <h4 className="modal-title">Modal heading</h4>
          </div>
          <div className="modal-body">{props.text}</div>
          <div className="modal-footer">
            <div type="button" className="btn btn-primary" onClick={handleClose}>
              Close
            </div>
            <div type="button" className="btn btn-secondary" onClick={handleClose}>
              Save Changes
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default PucharseDetailsDiioModal;