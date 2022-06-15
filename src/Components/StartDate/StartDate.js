import React from "react";
import Label from "../Label/Label";

const StartDate = ({ dateValue, handleStartDate }) => {
  return (
    <div>
      <Label className="labelText" labelName="Start Date (optional)" />
      <input
        type="date"
        value={dateValue}
        onChange={(e) => handleStartDate(e.target.value)}
      ></input>
    </div>
  );
};

export default React.memo(StartDate);
