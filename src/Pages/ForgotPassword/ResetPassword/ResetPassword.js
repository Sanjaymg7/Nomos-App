import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../../Components/Button/Button";
import { postCall } from "../../../Components/Services/DataFetch";
import "./ResetPassword.css";
import OtpInput from "react-otp-input";
import ConfirmPassword from "../ConfirmPassword";
import { modalInitialState } from "../../../Library/Constants";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import Label from "../../../Components/Label/Label";

const ResetPassword = () => {
  const [otp, setOTP] = useState("");
  const [isOTP, setIsOTP] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [modal, setModal] = useState(modalInitialState);
  const [buttonText, setButtonText] = useState(false);
  const [isConfirmPasswordPage, setConfirmPasswordPage] = useState(false);

  const inputStyle = {
    width: "3.5rem",
    height: "3.5rem",
    margin: "1.5rem 1rem",
    fontSize: "1rem",
    borderRadius: 4,
    border: "0.125rem solid rgba(0,0,0,0.3)",
  };

  const phoneInput = async (e) => {
    e.preventDefault();
    const phoneNo = e.target[0].value.replace(/-/g, "").replace(/ /g, "");
    if (phoneNo === "" || phoneNo.length !== 13) {
      setModal({
        modalContent: "Please provide valid phone number (10 digits)",
        showModal: true,
      });
    } else {
      setPhoneNo(phoneNo);
      setButtonText(true);
      try {
        const isNumber = await postCall("users/reset_password", {
          phone_no: phoneNo,
        });
        if (isNumber) {
          setIsOTP(!isOTP);
          setButtonText(false);
        }
      } catch (err) {
        setModal({ modalContent: err, showModal: true });
        setButtonText(false);
      }
    }
  };
  const handleOtpChange = (otp) => {
    setOTP(otp);
  };
  const validateOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setModal({
        modalContent: "Please provide valid OTP",
        showModal: true,
      });
    } else {
      setButtonText(true);
      try {
        const otpValidate = await postCall("users/confirm_otp", {
          phone_no: phoneNo,
          otp,
        });
        if (otpValidate) {
          setConfirmPasswordPage(!isConfirmPasswordPage);
          setButtonText(false);
        }
        localStorage.setItem("access_token", otpValidate.reset_token);
      } catch (err) {
        setModal({ modalContent: err, showModal: true });
        setButtonText(false);
      }
    }
  };
  const resendOtp = async () => {
    try {
      await postCall("users/reset_password", {
        phone_no: phoneNo,
      });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      {isConfirmPasswordPage ? (
        <ConfirmPassword />
      ) : (
        <>
          <Header navigateTo="signin" />
          {isOTP ? (
            <Label className="otp-span" labelName="Enter OTP" />
          ) : (
            <Label className="phone-input-span" labelName="Phone Number" />
          )}
          <form
            className="phone-input-form"
            onSubmit={isOTP ? validateOTP : phoneInput}
          >
            {isOTP ? (
              <OtpInput
                numInputs={4}
                inputStyle={inputStyle}
                value={otp}
                onChange={handleOtpChange}
                seperator={<span> </span>}
              />
            ) : (
              <PhoneInput
                country={"in"}
                containerStyle={{
                  margin: "0.5em 0em 1.6em",
                }}
                inputStyle={{
                  width: "100%",
                  border: "none",
                  height: "3rem",
                  fontSize: "large",
                  backgroundColor: "#eee",
                }}
              />
            )}
            <Button
              className="phone-input-btn"
              btnName={
                isOTP
                  ? buttonText
                    ? "Loading..."
                    : "Confirm"
                  : buttonText
                  ? "Loading..."
                  : "Send OTP"
              }
            />
          </form>
          {isOTP && (
            <p onClick={resendOtp} className="resend-otp">
              Resend OTP?
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
