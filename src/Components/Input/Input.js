import React from "react";
import "./Input.css";

const Input = ({
  value,
  onInputChange = () => {},
  type,
  className,
  labelContent,
  isLabelRequired = true,
}) => {
  return (
    <div>
      {isLabelRequired ? (
        <label className="inputLabel">{labelContent}</label>
      ) : (
        ""
      )}
      <input
        className={className}
        type={type}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default React.memo(Input);
