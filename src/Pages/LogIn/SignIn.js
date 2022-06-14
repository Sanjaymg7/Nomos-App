import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { postCall } from "../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { modalInitialState } from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Label from "../../Components/Label/Label";
import Modal from "../../Components/Modal/Modal";

const SignIn = () => {
  const [modal, setModal] = useState(modalInitialState);
  const [buttonName, setButtonName] = useState("Sign In");
  const navigate = useNavigate();

  const validateUser = (userData) => {
    const { email, password } = userData;
    if (email === "" || !email.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")) {
      alert("Please enter valid User Email");
      return false;
    } else if (password.length < 6) {
      alert("Password should be above 6 characters");
      return false;
    } else {
      return true;
    }
  };
  const userSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const userData = {
      email,
      password,
      type: 2,
    };
    const isValidUser = validateUser(userData);
    if (isValidUser) {
      try {
        setButtonName("Signing in...");
        const userDetail = await postCall("users/sign_in", userData);
        if (userDetail) {
          setButtonName("Sign In");
          localStorage.setItem("access_token", userDetail.access_token);
          navigate("/home");
        }
      } catch (err) {
        setButtonName("Sign In");
        setModal({ modalContent: err, showModal: true });
      }
    }
  };
  return (
    <>
      {modal.showModal ? (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      ) : (
        <>
          <Header />
          <form className="signin" onSubmit={userSignIn}>
            <Label className="signin-label" labelName="Email" />
            <br />
            <Input className="input" />
            <Label className="signin-label" labelName="Password" />
            <br />
            <Input className="input" type="password" />
            <Button className="btn sign-in" btnName={buttonName} />
          </form>
          <p
            onClick={() => navigate("/forgotpassword")}
            className="forgot-para"
          >
            Forgot password?
          </p>
        </>
      )}
    </>
  );
};

export default SignIn;
