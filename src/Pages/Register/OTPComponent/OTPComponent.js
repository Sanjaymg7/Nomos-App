import React, { useState } from "react";
import { modalInitialState } from "../../../Library/Constants";
import { putCall } from "../../../Components/Services/DataFetch";
import OtpInput from "react-otp-input";
import Button from "../../../Components/Button/Button";
import "./OTPComponent.css";
import Modal from "../../../Components/Modal/Modal";

const OTPComponent = ({ renderSignupComponent, userId }) => {
  const [otp, setOtp] = useState(0);
  const [modal, setModal] = useState(modalInitialState);

  const handleCloseModal = (e) => {
    setModal(modalInitialState);
  };

  const handleOtp = (val) => {
    setOtp(val);
  };

  const btnClickHandler = async () => {
    const requestBody = {
      user_id: userId,
      otp,
    };
    try {
      const data = await putCall("users/verify_otp", requestBody);
      if (data) {
        localStorage.setItem("access_token", data.access_token);
        renderSignupComponent("skillsComponent");
      }
    } catch (err) {
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
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <h3 className="comp2h3">Confirm OTP</h3>
      <span className="comp2Text">
        OTP is sent to your registered mobile number
      </span>
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
        btnName={"Confirm"}
        className={"btnGrey"}
        onBtnClick={btnClickHandler}
      />
      <span className="resendMessage">Didn't receive? Resend OTP</span>
    </div>
  );
};

export default React.memo(OTPComponent);
