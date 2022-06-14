import React from "react";
import "./Input.css";

const Input = ({
  value,
  onInputChange = () => {},
  onKeyDown = () => {},
  type,
  className,
  labelContent,
  isLabelRequired = true,
  isChecked,
}) => {
  return (
    <div>
      {isLabelRequired && <label className="inputLabel">{labelContent}</label>}
      <input
        className={className}
        type={type}
        value={value}
        onKeyDown={onKeyDown}
        checked={isChecked}
        onChange={(e) =>
          type === "checkbox"
            ? onInputChange(e.target.checked)
            : onInputChange(e.target.value)
        }
      />
    </div>
  );
};

export default React.memo(Input);
