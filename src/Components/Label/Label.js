import React from "react";
import "./Label.css";

const Label = ({ labelName, className }) => {
  return <label className={className}>{labelName}</label>;
};

export default React.memo(Label);
