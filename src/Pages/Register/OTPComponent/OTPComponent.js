import React, { useState, useContext } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import {
  confirm,
  requestHeader,
  users,
  verifyOTP,
  waitingMessage,
} from "../../../Library/Constants";
import { putCall, postCall } from "../../../Components/Services/DataFetch";
import OtpInput from "react-otp-input";
import Button from "../../../Components/Button/Button";
import "./OTPComponent.css";
import Modal from "../../../Components/Modal/Modal";

const OTPComponent = ({ renderSignupComponent, userId, userData }) => {
  const [otp, setOtp] = useState(0);
  const [buttonData, setButtonData] = useState({
    value: confirm,
    isActive: false,
  });
  const [modal, setModal] = useContext(ModalContext);

  const validateOTP = (val) => {
    if (val.length === 4) {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
    }
  };

  const handleOtp = (val) => {
    setOtp(val);
    validateOTP(val);
  };

  const handleResendOTP = async () => {
    try {
      await postCall(users, userData, requestHeader);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      const data = await putCall(
        verifyOTP,
        {
          user_id: userId,
          otp,
        },
        requestHeader
      );
      if (data) {
        localStorage.setItem("access_token", data.access_token);
        renderSignupComponent("skillsComponent");
      }
    } catch (err) {
      setButtonData({ value: confirm, isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  const otpInputStyles = {
    width: "3em",
    height: "3em",
    margin: "1.25em 1em",
    fontSize: "1em",
    borderRadius: 4,
    border: "0.125em solid rgba(0,0,0,0.3)",
  };

  return (
    <div className="comp2Container">
      {modal.showModal && <Modal />}
      <h3 className="comp2h3">Confirm OTP</h3>
      <p className="comp2Text">OTP is sent to your registered mobile number</p>
      <form onSubmit={formSubmitHandler}>
        <div className="otpContainer">
          <OtpInput
            containerStyle="otpModal"
            inputStyle={otpInputStyles}
            value={otp}
            onChange={handleOtp}
            numInputs={4}
            isInputNum={true}
          />
        </div>
        <Button
          btnName={buttonData.value}
          className={buttonData.isActive ? "btnGreen" : "btnGrey"}
          btnDisable={buttonData.isActive ? false : true}
        />
      </form>
      <p className="resendMessage" onClick={handleResendOTP}>
        Didn't receive? Resend OTP
      </p>
    </div>
  );
};

export default React.memo(OTPComponent);
