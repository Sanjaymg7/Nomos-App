import React from "react";
import Button from "./Button";
import "./SignupComp4.css";

const SignupComp4 = (props) => {
  const btnClickHandler = () => {
    props.compSubmit(1);
  };
  return (
    <div className="comp4Container">
      <h3 className="comp4h3">Join Community (0)</h3>
      <span className="comp4Text">
        Select from the list below or create your own
      </span>
      <div className="messageContainer">
        <span className="comp4Message">
          No communities around.
          <br /> You can skip or create your own.
        </span>
        <div className="comInputModal">
          <div className="btnContainer">
            <span className="addBtn">+</span>
          </div>
          <span className="comInputText">Create Your Community</span>
        </div>
      </div>
      <Button
        btnValue={"Finish"}
        btnClass={"signupFour"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default SignupComp4;
