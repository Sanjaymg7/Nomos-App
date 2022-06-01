import React from "react";
import Button from "./Button";
import Input from "./Input";
import "./SignupComp1.css";

const SignupComp1 = (props) => {
  const nameChangeHandler = (val) => {
    props.comp1Data.onNameChange(val);
  };

  const phoneChangeHandler = (val) => {
    props.comp1Data.onPhoneChange(val);
  };

  const emailChangeHandler = (val) => {
    props.comp1Data.onEmailChange(val);
  };

  const passwordChangeHandler = (val) => {
    props.comp1Data.onPasswordChange(val);
  };

  const btnClickHandler = () => {
    props.comp1Data.compSubmit(2);
  };

  return (
    <div className="comp1Container">
      <h3 className="comp1h3">Let's create an account</h3>
      <div className="inputContainer">
        <span className="comp1Text">Full Name</span>
        <Input
          inpType={"text"}
          inpClassName={"nameInput"}
          inputVal={props.nameVal}
          onChangeHandler={nameChangeHandler}
        />
        <span className="comp1Text">Phone</span>
        <Input
          inpType={"phone"}
          inpClassName={"phoneInput"}
          inputVal={props.phoneVal}
          onChangeHandler={phoneChangeHandler}
        />
        <span className="comp1Text">Email</span>
        <Input
          inpType={"email"}
          inpClassName={"emailInput"}
          inputVal={props.emailVal}
          onChangeHandler={emailChangeHandler}
        />
        <span className="comp1Text">Password</span>
        <Input
          inpType={"password"}
          inpClassName={"passwordInput"}
          inputVal={props.passwordVal}
          onChangeHandler={passwordChangeHandler}
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
          btnContent={"Next"}
          className={"signupOne"}
          onBtnClick={btnClickHandler}
        />
      </div>
    </div>
  );
};

export default SignupComp1;
