import React from "react";
import "./Button.css";

const Button = ({ onBtnClick, btnContent, className }) => {
  return (
    <button className={className} onClick={onBtnClick}>
      {btnContent}
    </button>
  );
};

export default Button;
