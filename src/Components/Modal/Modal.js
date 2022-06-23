import React, { useContext } from "react";
import { ModalContext } from "../Context/Context";
import {
  modalInitialState,
  close,
  errorMessage,
} from "../../Library/Constants";
import Button from "../Button/Button";
import "./Modal.css";

const Modal = () => {
  const [modal, setModal] = useContext(ModalContext);
  const handleCloseModal = () => {
    setModal(modalInitialState);
  };

  return (
    <div>
      <div className="modalContainer">
        <div className="modal">
          <h1 className="modalMessage">
            {typeof modal.modalContent === "string"
              ? modal.modalContent
              : errorMessage}
          </h1>
          <Button
            btnName={close}
            className={"btnBlue"}
            onBtnClick={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
