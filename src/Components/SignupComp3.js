import React from "react";
import Button from "./Button";
import "./SignupComp3.css";

const SignupComp3 = (props) => {
  const btnClickHandler = () => {
    props.compSubmit(4);
  };
  return (
    <div className="comp3Container">
      <h3 className="comp3h3">Selected Skills (0)</h3>
      <span className="comp3text">Skills are shown on your profile</span>
      <Button
        btnContent={"Next"}
        className={"signupThree"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default SignupComp3;
