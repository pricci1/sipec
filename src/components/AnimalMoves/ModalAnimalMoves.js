import React from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

class ModalAnimalMoves extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.show.bind(this)}>Ver</button>

                <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                    <div>Información del Movimiento</div>
                </Rodal>
            </div>
        )
    }
}

export default ModalAnimalMoves;

/*import React, { useState } from "react";

const PucharseDetailsDiioModal = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <a style={{color: 'blue'}} onClick={handleShow} href="/">{props.text}</a>
        <div className="modal" show={show} onHide={handleClose}>
          <div className="modal-header" closeButton>
            <h4 className="modal-title">Información de el Movimiento</h4>
          </div>
          <div className="modal-body">{props.text}</div>
          <div className="modal-footer">
            <div role="button" className="btn btn-primary" onClick={handleClose}>
              Close
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default PucharseDetailsDiioModal;+*/