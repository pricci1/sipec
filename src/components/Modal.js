import React, { useState } from "react";
import { createPortal } from "react-dom";

function useModal() {
  const [modalIsOpened, setOpen] = useState(false);
  const toggleModal = () => setOpen(prevState => !prevState);
  const modal = ({ children }) => (
    <Modal open={modalIsOpened} toggle={toggleModal}>
      {children}
    </Modal>
  );
  return { modal, modalIsOpened, toggleModal };
}

const Portal = ({ children }) => {
  const modalDiv = document.getElementById("modal");
  return createPortal(<>{children}</>, modalDiv);
};

export const Modal = ({ children, toggle, open }) => {
  return (
    <Portal>
      {open && (
        <div
          className="modal d-table"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggle}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default useModal;
