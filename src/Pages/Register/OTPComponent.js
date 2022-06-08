import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { putCall } from "../../DataFetch";
import OtpInput from "react-otp-input";
import Button from "../../Components/Button/Button";
import "./OTPComponent.css";

const OTPComponent = ({ renderSignupComponent, userId }) => {
  const [, setCookie] = useCookies(["access_token"]);
  const [otp, setOtp] = useState(0);

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
        setCookie("access_token", data.access_token, { path: "/" });
        renderSignupComponent("skillsComponent");
      }
    } catch (err) {
      console.log(err);
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
        btnContent={"Confirm"}
        className={"btnGrey"}
        onBtnClick={btnClickHandler}
      />
      <span className="resendMessage">Didn't receive? Resend OTP</span>
    </div>
  );
};

export default React.memo(OTPComponent);
