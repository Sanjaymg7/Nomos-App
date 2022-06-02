import React from "react";
import "./Input.css";

const Input = ({ value, OnInputChange = () => {}, type, className }) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={(e) => OnInputChange(e.target.value)}
    />
  );
};

export default Input;
