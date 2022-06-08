import React from "react";
import "./Input.css";

const Input = ({ value, onInputChange = () => {}, type, className }) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default React.memo(Input);
