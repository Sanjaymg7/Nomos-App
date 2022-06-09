import React, { useState } from "react";
import Button from "../Button/Button";
import "./Modal.css";

const Modal = ({ modalContent, closeModal }) => {
  return (
    <div>
      <div className="modalContainer">
        <div className="modal">
          <h1 className="modalMessage">{modalContent}</h1>
          <Button
            btnName="Close"
            className={"btnBlue"}
            onBtnClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
