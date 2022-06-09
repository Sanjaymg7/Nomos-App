import React, { useState } from "react";
import { postCall } from "../../../Components/Services/DataFetch";
import { modalInitialState } from "../../../Library/Constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import "./UserDataComponent.css";
import Modal from "../../../Components/Modal/Modal";

const UserDataComponent = ({ renderSignupComponent, updateId }) => {
  const [buttonContent, setButtonContent] = useState("Next");
  const [modal, setModal] = useState(modalInitialState);
  const validateUser = (userDetails) => {
    if (userDetails.user_name.trim() === "") {
      setModal({ modalContent: "Please provide valid name", showModal: true });
      return false;
    } else if (
      userDetails.phone_no.trim() === "" ||
      userDetails.phone_no.length !== 13
    ) {
      setModal({
        modalContent: "Please provide valid phone number (10 digits)",
        showModal: true,
      });
      return false;
    } else if (
      userDetails.email.trim() === "" ||
      userDetails.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+[a-zA-Z]+$") ===
        null
    ) {
      setModal({ modalContent: "Please provide valid email", showModal: true });
      return false;
    } else if (userDetails.password.trim() === "") {
      setModal({
        modalContent: "Please provide valid password",
        showModal: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleCloseModal = (e) => {
    setModal(modalInitialState);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const user_name = e.target[0].value;
    const phone_no = e.target[1].value.replace(/-/g, "").replace(/ /g, "");
    const email = e.target[2].value;
    const password = e.target[3].value;
    const userData = {
      user_name,
      phone_no,
      email,
      password,
      type: 2,
      user_location:
        '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    };
    const isValidUser = validateUser(userData);
    if (isValidUser) {
      setButtonContent("Please Wait..");
      try {
        const data = await postCall("users/", userData);
        if (data) {
          updateId(data.user_id);
          renderSignupComponent("otpComponent");
        }
      } catch (err) {
        setButtonContent("Next");
        setModal({ modalContent: err, showModal: true });
      }
    }
  };

  return (
    <div className="comp1Container">
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <h3 className="comp1h3">Let's create an account</h3>
      <div className="inputContainer">
        <form onSubmit={formSubmitHandler}>
          <Input
            type={"text"}
            className={"nameInput"}
            labelContent="Full Name"
          />
          <span className="comp1Text">Phone</span>
          <PhoneInput
            country={"in"}
            containerStyle={{
              margin: "0.5em 0em 1.6em",
            }}
            inputStyle={{
              width: "100%",
              border: "none",
              backgroundColor: "#eee",
            }}
          />
          <Input type={"email"} className={"emailInput"} labelContent="Email" />
          <Input
            type={"password"}
            className={"passwordInput"}
            labelContent="Password"
          />
          <div className="policyContainer">
            <span className="policyMessage">
              By continuing, I agree to the
              <br />
              <span className="textGreen">Terms and Conditions</span> and{" "}
              <span className="textGreen">Privacy Policy</span>
            </span>
          </div>
          <Button
            btnName={buttonContent}
            className={"btnGreen"}
            btnDisable={buttonContent === "Next" ? false : true}
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(UserDataComponent);
