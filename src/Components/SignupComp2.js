import React, { useState } from "react";
import { doPUTCall } from "../DataFetch";
import OtpInput from "react-otp-input";
import Button from "./Button";
import "./SignupComp2.css";

const SignupComp2 = ({ renderSignupComponent, userId, updateAccessToken }) => {
  const [otp, setOtp] = useState(0);

  const handleOtp = (val) => {
    setOtp(val);
  };

  const btnClickHandler = () => {
    const otpBody = {
      user_id: userId,
      otp,
    };
    doPUTCall("users/verify_otp", otpBody)
      .then((data) => {
        if (data.responseCode === 200) {
          updateAccessToken(data.responseData.access_token);
          renderSignupComponent(3);
        } else {
          alert(data.responseMessage);
        }
      })
      .catch((err) => alert(err));
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
          inputStyle={{
            width: "3em",
            height: "3em",
            margin: "1.25em 1em",
            fontSize: "1em",
            borderRadius: 4,
            border: "0.125em solid rgba(0,0,0,0.3)",
          }}
          value={otp}
          onChange={handleOtp}
          numInputs={4}
          isInputNum={true}
        />
      </div>
      <Button
        btnContent={"Confirm"}
        className={"signupTwo"}
        onBtnClick={btnClickHandler}
      />
      <span className="resendMessage">Didn't receive? Resend OTP</span>
    </div>
  );
};

export default SignupComp2;
