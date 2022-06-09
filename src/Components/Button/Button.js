import React from "react";
import "./Button.css";

const Button = ({ onBtnClick, btnName, className, btnValue, btnDisable }) => {
  return (
    <button
      value={btnValue}
      className={className}
      onClick={onBtnClick}
      disabled={btnDisable}
    >
      {btnName}
    </button>
  );
};

export default React.memo(Button);
