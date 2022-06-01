import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div>
      <input
        type={props.inpType}
        className={props.inpClassName}
        value={props.inputVal}
        onChange={(e) => props.onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default Input;
