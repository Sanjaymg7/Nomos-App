import React, { useState, useContext } from "react";
import { ModalContext } from "../../App";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import { requestHeader } from "../../Library/Constants";
import { putCall } from "../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import Label from "../../Components/Label/Label";

const ConfirmPass = () => {
  const [modal, setModal] = useContext(ModalContext);
  const [buttonText, setButtonText] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const { newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword && newPassword !== "") {
      return true;
    } else if (newPassword === "" && confirmPassword === "") {
      setModal({
        modalContent: "Please Enter password",
        showModal: true,
      });
    } else {
      setModal({
        modalContent: "Password Mis match",
        showModal: true,
      });
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
    if (validatePassword(password)) {
      setButtonText(true);
      try {
        const confirmPassword = await putCall(
          "users/reset_password",
          {
            new_password: newPassword,
            reset_token: localStorage.getItem("access_token"),
          },
          requestHeader
        );
        if (confirmPassword) {
          localStorage.removeItem("access_token");
          setButtonText(false);
          setModal({
            modalContent: "reset password successful",
            showModal: true,
          });
          navigate("/signin");
        }
      } catch (err) {
        setModal({
          modalContent: "reset password unsuccessfull \n Please try again",
          showModal: true,
        });
        setButtonText(false);
      }
    }
  };
  return (
    <>
      {modal.showModal && <Modal />}
      <Header navigateTo="signIn" />
      <form className="signin" onSubmit={confirmPassword}>
        <Label labelName="Enter New Password" />
        <Input className="input" type="password" />
        <Label labelName="Confirm New Password" />
        <Input className="input" type="password" />
        <Button
          className="btn sign-in"
          btnName={buttonText ? "Loading..." : "Reset Password"}
          btnDisable={buttonText === "Loading..." ? true : false}
        />
      </form>
    </>
  );
};

export default ConfirmPass;
