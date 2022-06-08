import React from "react";
import "./Button.css";

const Button = ({
  onBtnClick,
  btnContent,
  className,
  btnValue,
  btnDisable,
}) => {
  return (
    <button
      value={btnValue}
      className={className}
      onClick={onBtnClick}
      disabled={btnDisable}
    >
      {btnContent}
    </button>
  );
};

export default React.memo(Button);
