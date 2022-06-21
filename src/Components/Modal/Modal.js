import React, { useContext } from "react";
import { ModalContext } from "../../App";
import { modalInitialState } from "../../Library/Constants";
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
          <h1 className="modalMessage">{modal.modalContent}</h1>
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
