import React from "react";
import "./Button.css";

const Button = ({
  onBtnClick,
  btnContent,
  className,
  btnValue = btnContent,
}) => {
  return (
    <button value={btnValue} className={className} onClick={onBtnClick}>
      {btnContent}
    </button>
  );
};

export default Button;
