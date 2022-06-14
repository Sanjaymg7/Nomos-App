import React from "react";
import "./Image.css";

const Image = ({ src, alt, className, onClick }) => {
  return <img onClick={onClick} className={className} src={src} alt={alt} />;
};

export default React.memo(Image);
