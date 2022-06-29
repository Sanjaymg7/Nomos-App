import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ModalContext } from "../../Components/Context/Context";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { postCall } from "../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import {
  requestHeader,
  home,
  forgotPassword,
  waitingMessage,
  modalInitialState,
  signInName,
} from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Label from "../../Components/Label/Label";
import Modal from "../../Components/Modal/Modal";
import { signInEndPoint } from "../../Library/Constants";

const SignIn = () => {
  const location = useLocation();
  const [modal, setModal] = useContext(ModalContext);
  const [buttonName, setButtonName] = useState(signInName);
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const validateUser = (userData) => {
    const { email, password } = userData;
    if (email === "" || !email.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")) {
      setModal({
        modalContent: "Please enter valid User Email",
        showModal: true,
      });
      return false;
    } else if (password.length < 6) {
      setModal({
        modalContent: "Password should be above 6 characters",
        showModal: true,
      });
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setModal(modalInitialState);
  }, []);

  const userSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const userData = {
      email,
      password,
      type: 2,
    };
    if (validateUser(userData)) {
      try {
        setButton(true);
        setButtonName(waitingMessage);
        const userDetail = await postCall(
          signInEndPoint,
          userData,
          requestHeader
        );
        if (userDetail) {
          setButtonName(signInName);
          localStorage.setItem("user_id", userDetail.user_id);
          localStorage.setItem("access_token", userDetail.access_token);
          navigate(location.state?.from?.pathname || home);
        }
      } catch (err) {
        setButtonName(signInName);
        setModal({ modalContent: err, showModal: true });
      } finally {
        setButton(false);
      }
    }
  };
  return (
    <>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <>
        <Header />
        <form className="signin" onSubmit={userSignIn}>
          <Label className="signin-label" labelName="Email" />
          <Input className="input" />
          <Label className="signin-label" labelName="Password" />
          <Input className="input" type="password" />
          <Button
            btnDisable={button ? true : false}
            className={button ? "btnInActive" : "btnActive"}
            btnName={buttonName}
          />
        </form>
        <p onClick={() => navigate(forgotPassword)} className="forgot-para">
          Forgot password?
        </p>
      </>
    </>
  );
};

export default SignIn;
