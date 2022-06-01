import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Button from "./Button";
import Input from "./Input";
import "./SignupComp2.css";

const SignupComp2 = (props) => {
  const [otp, setOtp] = useState(0);
  const otpChangeHandler = () => {
    console.log("OTP is valid");
  };

  const handleOtp = (val) => {
    setOtp(val);
  };

  const btnClickHandler = () => {
    console.log(otp);
    // props.compSubmit(3);
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
