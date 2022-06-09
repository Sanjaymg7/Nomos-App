import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../../Components/Button/Button";
import { postCall } from "../../../Components/Services/DataFetch";
import "./ResetPassword.css";
import OtpInput from "react-otp-input";
import ConfirmPassword from "../ConfirmPassword/ConfirmPassword";
import { useCookies } from "react-cookie";
import Header from "../../../Components/Header/Header";

const ResetPassword = () => {
  const [otp, setOTP] = useState("");
  const [isOTP, updateOTP] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [isConfirmPasswordPage, setConfirmPasswordPage] = useState(false);
  const [, setCookie] = useCookies("");

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
    setPhoneNo(phoneNo);
    const isNumber = await postCall("users/reset_password", {
      phone_no: phoneNo,
    });
    if (isNumber) {
      updateOTP(!isOTP);
    }
  };
  const handleOtpChange = (otp) => {
    setOTP(otp);
  };
  const validateOTP = async (e) => {
    e.preventDefault();
    const otpValidate = await postCall("users/confirm_otp", {
      phone_no: phoneNo,
      otp,
    });
    if (otpValidate) {
      setConfirmPasswordPage(!isConfirmPasswordPage);
    }
    setCookie("access_token", otpValidate.reset_token, {
      path: "/",
    });
  };

  return (
    <>
      {isConfirmPasswordPage ? (
        <ConfirmPassword />
      ) : (
        <>
          <Header />
          {isOTP && <div className="otp-span">Enter OTP</div>}
          {!isOTP && <div className="phone-input-span"> Phone</div>}
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
              btnContent={isOTP ? "Confirm" : "Send OTP"}
            />
          </form>
        </>
      )}
    </>
  );
};

export default React.memo(ResetPassword);
