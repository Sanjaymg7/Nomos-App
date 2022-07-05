import React, { useState, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import {
  loading,
  requestHeader,
  ResetPasswordEndPoint,
  signIn,
} from "../../Library/Constants";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import Label from "../../Components/Label/Label";
import useDataFetch from "../../Hooks/useDataFetch";

const ConfirmPass = () => {
  const [modal, setModal] = useContext(ModalContext);
  const [buttonText, setButtonText] = useState(false);
  const [button, setButton] = useState(false);
  const navigate = useNavigate();
  const [, putCall] = useDataFetch();

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
        setButton(true);
        const confirmPassword = await putCall(
          ResetPasswordEndPoint,
          {
            new_password: newPassword,
            reset_token: localStorage.getItem("access_token"),
          },
          requestHeader
        );
        if (confirmPassword) {
          localStorage.removeItem("access_token");
          setButtonText(false);
          navigate(signIn);
        }
      } catch (err) {
        setModal({
          modalContent: "reset password unsuccessfull \n Please try again",
          showModal: true,
        });
        setButtonText(false);
        setButton(false);
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
          btnDisable={button ? true : false}
          className={button ? "btnInActive" : "btnActive"}
          btnName={buttonText ? loading : "Reset Password"}
        />
      </form>
    </>
  );
};

export default ConfirmPass;
