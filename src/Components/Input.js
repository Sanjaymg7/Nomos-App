import React from "react";
import "./Input.css";

const Input = ({value, OnInputChange, type}) => {
  return <input type={type} value={value}  onChange={(e)=>OnInputChange(e.target.value)}/>;
};

export default Input;
