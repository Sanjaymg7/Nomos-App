import React, { useState } from "react";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import Header from "../../../Components/Header/Header";
import { modalInitialState } from "../../../Library/Constants";
import { putCall } from "../../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Components/Modal/Modal";

const ConfirmPass = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(modalInitialState);

  const validatePassword = (password) => {
    const { newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword && newPassword !== "") {
      return true;
    } else if (newPassword === "" && confirmPassword === "") {
      alert("Please Enter password");
    } else {
      alert("Password Mis match");
    }
  };

  const confirmPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    const password = {
      newPassword,
      confirmPassword,
    };
    const isValidPassword = validatePassword(password);
    if (isValidPassword) {
      try {
        const confirmPassword = await putCall("users/reset_password", {
          new_password: newPassword,
          reset_token: localStorage.getItem("access_token"),
        });
        if (confirmPassword) {
          localStorage.removeItem("access_token");
          navigate("/signin");
        }
      } catch (err) {
        setModal({ modalContent: err, showModal: true });
      }
    }
  };
  return (
    <>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header />
      <form className="signin" onSubmit={confirmPassword}>
        <label>Enter New Password</label>
        <br />
        <Input className="input" type="password" />
        <label>Confirm New Password</label>
        <br />
        <Input className="input" type="password" />
        <Button className="btn sign-in" btnName="Reset Password" />
      </form>
    </>
  );
};

export default ConfirmPass;
