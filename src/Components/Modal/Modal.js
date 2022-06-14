import React, { useState } from "react";
import { modalInitialState } from "../../Library/Constants";
import Button from "../Button/Button";
import "./Modal.css";

const Modal = ({ modalContent, closeModal }) => {
  const handleCloseModal = () => {
    closeModal(modalInitialState);
  };

  return (
    <div>
      <div className="modalContainer">
        <div className="modal">
          <h1 className="modalMessage">{modalContent}</h1>
          <Button
            btnName="Close"
            className={"btnBlue"}
            onBtnClick={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
