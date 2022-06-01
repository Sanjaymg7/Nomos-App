import React from "react";
import Button from "./Button";
import Input from "./Input";
import "./SignupComp2.css";

const SignupComp2 = (props) => {
  const otpChangeHandler = () => {
    console.log("OTP is valid");
  };

  const btnClickHandler = () => {
    props.compSubmit(3);
  };
  return (
    <div className="comp2Container">
      <h3 className="comp2h3">Confirm OTP</h3>
      <span className="comp2Text">
        OTP is sent to your registered mobile number
      </span>
      <Input
        inpType={"text"}
        inpClassName={"otpInput"}
        inputVal={""}
        onChangeHandler={otpChangeHandler}
      />
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
