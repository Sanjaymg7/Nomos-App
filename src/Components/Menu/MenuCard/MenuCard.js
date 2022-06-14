import React from "react";
import Image from "../../../Components/Image/Image";
import "./MenuCard.css";

const MenuCard = ({ src, menuContent, onClick }) => {
  return (
    <div onClick={onClick} className="menu-item">
      <Image className="menu-image" src={src} alt="image" />
      <span>{menuContent}</span>
    </div>
  );
};

export default React.memo(MenuCard);
