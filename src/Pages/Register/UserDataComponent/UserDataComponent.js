import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import {
  modalInitialState,
  next,
  requestHeader,
  users,
  waitingMessage,
} from "../../../Library/Constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Label from "../../../Components/Label/Label";
import "./UserDataComponent.css";
import Modal from "../../../Components/Modal/Modal";
import useDataFetch from "../../../Hooks/useDataFetch";

const UserDataComponent = ({ renderSignupComponent, updateData }) => {
  const [userData, setUserData] = useState({
    user_name: "",
    phone_no: "",
    email: "",
    password: "",
    type: 2,
    user_location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
  });
  const [buttonData, setButtonData] = useState({
    value: next,
    isActive: false,
  });
  const [modal, setModal] = useContext(ModalContext);
  const [, , postCall] = useDataFetch();

  const validateUser = () => {
    if (userData.user_name.trim() !== "") {
      if (userData.phone_no.trim() !== "") {
        if (
          userData.email.trim() !== "" ||
          userData.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+[a-zA-Z]+$") !==
            null
        ) {
          if (userData.password.trim() !== "") {
            return setButtonData({ ...buttonData, isActive: true });
          }
        }
      }
    }
    setButtonData({ ...buttonData, isActive: false });
  };

  useEffect(() => {
    setModal(modalInitialState);
  }, []);

  const handleFormInputChange = (el) => {
    if (el.className === "nameInput") {
      setUserData({ ...userData, user_name: el.value });
    } else if (el.className === "emailInput") {
      setUserData({ ...userData, email: el.value });
    } else if (el.className === "passwordInput") {
      setUserData({ ...userData, password: el.value });
    } else {
      setUserData({ ...userData, phone_no: el.value });
    }
    validateUser();
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    userData.phone_no = userData.phone_no.replace(/-/g, "").replace(/ /g, "");
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      const data = await postCall(users, userData, requestHeader);
      if (data) {
        updateData(data.user_id, userData);
        renderSignupComponent("otpComponent");
      }
    } catch (err) {
      setButtonData({ value: next, isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div className="comp1Container">
      {modal.showModal && <Modal />}
      <h3 className="comp1h3">Let's create an account</h3>
      <div className="inputContainer">
        <form
          onSubmit={formSubmitHandler}
          onChange={(e) => handleFormInputChange(e.target)}
        >
          <Input
            type={"text"}
            className={"nameInput"}
            labelContent="Full Name"
          />
          <Label className="comp1Text" labelName="Phone" />
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
            btnName={buttonData.value}
            className={buttonData.isActive ? "btnGreen" : "btnGrey"}
            btnDisable={buttonData.isActive ? false : true}
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(UserDataComponent);
